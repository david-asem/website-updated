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

app.get('/about-us', (req, res) => {
    res.render('about-us', {});
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

