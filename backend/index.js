const express = require('express');
const fs = require('fs');

const app = express();

const videosMap = {
    'video1': 'videos/video1.mp4',
    'video2': 'videos/video2.mp4',
}

app.get('/video/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = videosMap[filename];
    if(!filepath){
        return res.status(404).send('File not found');
    }
    const stat = fs.statSync(filepath);
    const filesize = stat.size;
    const range = req.headers.range;

    if(range){
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10): filesize-1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filepath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${filesize}`,
            'Accept-Ranges': `bytes`,
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'        
        };
        res.writeHead(206, head);
        file.pipe(res);
    }
    else{
        const head = {
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'        
        };
        res.writeHead(200, head);
        fs.createReadStream(filepath).pipe(res);
    }
})

app.listen(4000, () => {
    console.log("Listening to 4000")
});