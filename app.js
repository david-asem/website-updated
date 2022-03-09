const express = require('express')
const mustacheExpress = require('mustache-express');
const {engine} = require('express-handlebars');

const app = express()
const port = 5000


app.engine("hbs",engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'))
app.use(express.static('files'))

app.get('/', (req, res) => {
    res.render('index', {});
})

app.get('/solutions/consumer', (req, res) => {
    res.render('consumer', {});
})

app.get('/solutions/business', (req, res) => {
    res.render('business', {});
})

app.get('/solutions/government', (req, res) => {
    res.render('government', {});
})

app.get('/about-us', (req, res) => {
    res.render('about-us', {});
})

app.get('/password/forgot/:token', (req, res) => {
    res.render('forgot-password',{});
})

app.get("/password/forgot",(req,res) => {
    res.render('forgot-password',{
        layout: false,
        params: JSON.stringify(req.query)
    });
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

