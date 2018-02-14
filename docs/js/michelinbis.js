const request =  require('request-promise'),
    cheerio = require('cheerio'),
    express = require('express'),
    fs = require('fs');

var app = express();

var restaurants_url = [];

for(var i=1; i<36; i++){
    url='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-${i}'

 
    request(url, function(error, response, html) {
        if(!error){
            var $ = cheerio.load(html);

            $('.poi-card-link').each(function(){
                var rest_url = $(this).attr('href');
                restaurants_url.push(rest_url);
                console.log(rest_url);
            })
            

            
        }
    })

}
