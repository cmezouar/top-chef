
const request =  require('request-promise'),
    cheerio = require('cheerio'),
    express = require('express'),
    fs = require('fs'),
    timers = require('timers');

var app = express();

var links = [];
var json = [];
var names = [];
var prices = [];
var stars = [];
var streets = [];                                     
var zipcodes = [];

url='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page';

var scrape_names_prices = function(url, callback){
    var restaurants_url = [];
    for(var i=1; i<36;i++){
        request(url+'-'+i, function(error, response, html) {
            if(!error){
                let $ = cheerio.load(html);
                
                //scraping the names
                $('.poi_card-display-title').filter(function(){
                    let data = $(this);
                    names.push(data.text());
                    //console.log(data.text());
                })
                
                //scraping the prices
                $('.poi_card-display-price').filter(function(){
                    let data = $(this);
                    prices.push(data.text());
                    //console.log(data.text());
        
                })
    
                $('.poi-card-link').filter(function(){
                    let data = $(this);
                    //console.log(data.attr('href'));
                    var rest_url = data.attr('href');
                    restaurants_url.push(rest_url);
    
                })
            }       
        })
    

    }
   
    
    
}

var scrape_url = function(restaurants_url, callback){
    var base_url='https://restaurant.michelin.fr';
    restaurants_url.forEach(element => {
        url = base_url+element;
        
        request(url, function(error, response, html){
            if(!error){
                //console.log('heyhey');
                let $ = cheerio.load(html);

                //zipcode
                $('.postal-code').filter(function(){
                    let data = $(this);
                    console.log(data.text());
                    var zipcode = data.text();
                    zipcodes.push(zipcode);
                })


                //adress


                //stars
            } 
            else console.log('ERROR : ', error);
        })

        
    })

}

var fill_json = function(json){
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


app.get('/scrape/', function (req, res) {
    scrape_names_prices(url,function(restaurants_url){
        console.log('salut');
        var base_url='https://restaurant.michelin.fr';
        restaurants_url.forEach(element => {
            var url2 = base_url+element;
        
            request(url2, function(error, response, html){
            if(!error){
                //console.log('heyhey');
                let $ = cheerio.load(html);

                //zipcode
                $('.postal-code').filter(function(){
                    let data = $(this);
                    console.log(data.text());
                    var zipcode = data.text();
                    zipcodes.push(zipcode);
                })
            } 
            else console.log('ERROR : ', error);
        }) 
    })
})


app.listen('8081', () => {
    console.log('Running server')
});

exports = module.exports = app;

