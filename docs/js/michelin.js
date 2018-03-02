const request = require('request-promise'),
    cheerio = require('cheerio'),
    express = require('express'),
    fs = require('fs');

var app = express();
//faire une boucle for pour boucler sur toutes les pages 

app.get('/scrape', function (req, res) {
    //All the web scraping
    url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';

    //the callback function takes 3 parameters, an error, response status code and the html

    request(url, function (error, response, html) {
        //check first if no errors occurred

        if (!error) {
            var $ = cheerio.load(html);

            //var name, stars, details, price_interval;
            var json = [{ name: "", price: "" }];
            var names = [];
            var prices = [];
            var stars = [];
            var locations = [];




            //using the unique div class as a starting point
            //scraping the names
            $('.poi_card-display-title ').filter(function () {

                //console.log($(this));

                var data = $(this);

                //console.log(data.text());


                names.push(data.text());
            })

            //scraping the prices
            $('.poi_card-display-price').filter(function () {
                var data = $(this);

                prices.push(data.text());

            })

            //scraping the stars

            //scraping


            names.forEach(n => {
                var restaurant = {
                    name: n,
                    price: ""
                };

                json.push(restaurant);
            });

            prices.forEach(element => {
                json.forEach(p => {
                    p.price = element;
                });

                fs.writeFile('starred_restaurants.json', JSON.stringify(json, null, 4), function (err) {
                    console.log('File successfully written! - Check your project directory for the starred_restaurants.json file');
                    res.send('Check your console');
                });


            });

        }




    });





});



app.listen('8081', () => {
    console.log('Running server')
})

exports = module.exports = app;


