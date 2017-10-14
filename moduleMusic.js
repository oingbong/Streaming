const request = require('request');
const cheerio = require('cheerio');

module.exports = {
	top100: function(genre){

		/*
			키워드별 코드
			
			종합
			장르종합 			: GN0000
			국내종합 			: DM0000
			해외종합 			: AB0000

			한국대중음악
			발라드 			: GN0100
			댄스 				: GN0200
			랩/힙합 			: GN0300
			R&B/Soul 		: GN0400
			인디음악 			: GN0500
			록/메탈 			: GN0600
			트로트 			: GN0700
			포크/블루스		: GN0800

			해외POP음악
			POP 			: GN0900
			록/메탈 			: GN1000
			일렉트로니카 		: GN1100
			랩/힙합 			: GN1200
			R&B/Soul 		: GN1300
			포크/블루스/컨트리 	: GN1400

			그외인기장르
			OST 			: GN1500
			재즈 				: GN1700
			뉴에이지 			: GN1800
			J-pop 			: GN1900
			월드뮤직 			: GN2000
			CCM 			: GN2100
			어린이/태교 		: GN2200
			종교음악 			: GN2300
			국악 				: GN2400
		*/

		console.log('genre : ' , genre);
		// GN 이 포함되지 않는 경우 -1 을 리턴하며 기본값을 줍니다.
		if(genre.indexOf('GN') == -1){
			genre = 'GN0000';
		}

		var options = {
			url: 'http://www.melon.com/chart/day/index.htm?classCd=' + genre
		};

		var list = [];

		request(options, callback);

		function callback(error, response, body){
			var $ = cheerio.load(body);
			$('tbody > tr').each(function(){
				var photo = $(this).find('td:nth-child(4) > .wrap > a > img').attr('src');
				var title = $(this).find('td:nth-child(6) > .wrap > .wrap_song_info > .rank01 > span > a').text();
				var singer = $(this).find('td:nth-child(6) > .wrap > .wrap_song_info > .rank02 > span > a').text();
				var album = $(this).find('td:nth-child(7) > .wrap > .wrap_song_info > .rank03 > a').text();
				
				var obj = {
					photo : photo,
					title : title,
					singer : singer,
					album : album
				};

				list.push(obj);
				// console.log('-------------------------------------');
				// console.log('photo : ' , photo);
				// console.log('title : ' , title);
				// console.log('singer : ' , singer);
				// console.log('album : ' , album);
			});
		}

		return list;
	}
}