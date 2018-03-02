const request =  require('request'),
    cheerio = require('cheerio'),
    express = require('express'),
    fs = require('fs');
    

var app = express();

/*var restaurants_url = [];
var json = [];
var names = [];
var prices = [];
var stars = [];
var streets = [];
var zipcodes = [];*/



app.get('/scrape', function (req, res) {
    base_url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
    var restaurants_url = [];
    console.log('before request');
    request(base_url, function(error, response, html){
        console.log('error');
        if(!error){
            var $ = cheerio.load(html);

            
        }
    })
    
    /*for(var i=1; i<36; i++){
        var url=base_url+'-${i}';
        //url='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-${i}'

       
        request(url, function(error, response, html) {
            if(!error){
                var $ = cheerio.load(html);
            
                $('.poi-card-link').filter(function(){
                    console.log($(this).attr('href'))
                    var rest_url = $(this).attr('href')
                    
                    restaurants_url.push(rest_url)
                
                })          
            }
        })
    }*/   
})

app.listen('8081');
console.log('Running server');
exports = module.exports = app;


