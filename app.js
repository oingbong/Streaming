const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');

const music = require('./moduleMusic.js');

app.get('/', (req, res) => {
	res.send('Hello World!\n');
});

app.get('/top100/:genre', (req, res) => {
	var genre = req.params.genre;
	//console.log('genre : ' , genre);
	music.top100(genre);

});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

