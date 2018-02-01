const request = require('request-promise'),
     cheerio = require('cheerio'),
     express = require('express'),
     fs = require('fs');

var app = express();

app.get('/scrape', function(req, res){
    //All the web scraping
    url= 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';

    //the callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){
        //check first if no errors occurred

        if(!error){
           var $ = cheerio.load(html);
           
           var name, stars, details, price_interval;
           var json = {name : " ", stars : " ", details = " ", price_interval = " "};

           //using the unique div class as a starting point
           $('.poi_card-display-title').filter(function(){

            var data = $(this);
            name = data.children().first().text();

            json.name = name;



           })
        }

        fs.writeFile('starred_restaurants.json', JSON.stringify(json, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the starred_restaurants.json file');   
        })
        
        res.send('Check your console');


    });

    


    
})



app.listen('8081');

exports = module.exports = app;


