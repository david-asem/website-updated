const express = require('express')
const mustacheExpress = require('mustache-express');
const {engine} = require('express-handlebars');

const app = express()
const port = 3000


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

app.get('/solutions/bank', (req, res) => {
    res.render('bank', {});
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

app.get("/blog/javolin-partners-with-ecobank",(req,res) => {
   res.render("javolin-partners-with-ecobank",{

   })
});

app.get("/blog/javolin-set-to-launch-on-april-6-2022",(req,res) => {
    res.render("javolin-set-to-launch-on-april-6-2022",{

    })
});

app.get("/blog/javolin-secure-card",(req,res) => {
    res.render("javolin-secure-card",{

    })
});


app.get("/terms",(req,res) => {
    res.render("terms",{
    })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

