const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3030;

// Defined paths for Express Config
const publicURL = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views locations
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicURL));


app.get('/',(req,res) => {
    res.render('index',{
        title : 'weather',
        name : 'Uttam'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name : 'Uttam'
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'help',
        message : 'Here is the message',
        name : 'Uttam'
    });
});


app.get('/weather',(req,res) => {
    if ( !req.query.address) {
        return res.send({
            error : 'You must provide address'
        })
    }

    geocode(req.query.address, (error,{latitude , longitude, location} = {}) => {
        if ( error ) {
            return res.send({error});
        }
        forecast ( latitude,longitude,(error, foreacastData) => {
            if ( error ) {
                return res.send({error});
            }
            res.send({
                forecast: foreacastData,
                location,
                address : req.query.address
            })
        })
    })

    // res.send({
    //     foreacast: 'Weather',
    //     location : 'location',
    //     address : req.query.address,
    // });
});

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : 'weather App About page',
        errorMessage : 'No help page found',
        name : 'Uttam'
    })
});
app.get('*',(req,res) => {
    res.render('404',{
        title : 'weather App About page',
        errorMessage : 'No page found',
        name : 'Uttam'
    })
});

app.listen(port,() => {
    console.log("Server is up on "+port);
})