const request =  require('request-promise'),
    cheerio = require('cheerio'),
    express = require('express'),
    fs = require('fs');

var app = express();

var restaurants_url = [];
var json = [{ name: "", price: "" }];
var names = [];
var prices = [];
var stars = [];
var streets = [];
var zipcodes = [];

for(var i=1; i<36; i++){
    url='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-${i}'

 
    request(url, function(error, response, html) {
        if(!error){
            var $ = cheerio.load(html);

            $('.poi-card-link').each(function(){
                var rest_url = $(this).attr('href');
                restaurants_url.push(rest_url);
                
            })           
        }
    })
}

restaurants_url.forEach(u =>{
    console.log(u);
    link='https://restaurant.michelin.fr'+u;
    console.log(link);
    request(link, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            //scraping the names
            $('.poi_intro-display-title op-upper-var2__title').filter(function(){
                var data = $(this);
                console.log($(this));
                names.push(data.text());
                console.log(data.text());
            })

            //scraping the prices
            $('.node_poi-price').filter(function(){
                var data = $(this).attr('span');
                console.log($(this).attr('span'));
                prices.push(data.text());
                console.log(data.text());

            })

            //scraping the stars (by making a request on the class name)
           

            //scraping the locations
            //the adress 
            $('.thoroughfare').filter(function(){
                var data = $(this);
                console.log($(this));
                streets.push(data.text());
                console.log(data.text());
            })
            //the zipcode
            $('.postal-code').filter(function(){
                var data = $(this);
                console.log($(this));
                zipcodes.push(data.text());
                console.log(data.text());
            })

            //adding names to the json
            names.forEach(n =>{
                var restaurant = {
                    name: n,
                    price: "",
                    stars: "",
                    adress: "",
                    zipcode: ""

                }
                json.push(restaurant);
            })

            //adding prices
            prices.forEach(element =>{
                json.forEach(r =>{
                    r.price = element;
                })
            })

            //adding stars

            //adding adresses
            streets.forEach(element =>{
                json.forEach(r =>{
                    r.adress = element; 
                })
            })

            //adding zipcodes
            zipcodes.forEach(element =>{
                json.forEach(r =>{
                    r.zipcode = element;
                })

                fs.writeFile('starred_restaurants.json', JSON.stringify(json, null, 4), function(err){
                   console.log('Json file successfully written');
                   res.send('Check your console'); 
                })
            })


        }
    })

});