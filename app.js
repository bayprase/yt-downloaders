const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', function(request, response){
	response.sendFile(__dirname = "public/index.html");
});


app.get('/videoInfo', async function(request, response) {
	const videoURL = request.query.videoURL;
	const info = await ytdl.getInfo(videoURL);
	response.status(200).json(info);
});

app.get("/download", function(request, response){
	const videoURL = request.query.videoURL;
	const itag = request.query.itag;
	response.header("content-Disposition", 'attachment;\ filename="video.mp4"');
	ytdl(videoURL, {
		filter: format => format.itag == itag
	}).pipe(response);
})

app.get("/downloadMusic", function(request, response){
	const videoURL = request.query.videoURL;
	const itag = request.query.itag;
	let randomKey = Math.floor((Math.random() * 100) + 1);
	response.header("content-Disposition", 'attachment;\ filename="musicYtDownloader"' + randomKey + '".mp3"');
	ytdl(videoURL, {
		filter: format => format.itag == itag
	}).pipe(response);
})

app.listen(5000);