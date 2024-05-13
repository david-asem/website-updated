const express = require('express')
const mustacheExpress = require('mustache-express');
const {engine} = require('express-handlebars');

const app = express()
const port = process.env.PORT || 5005;

const svgIcons = {
    rightArrow: () => {
        return `<div @click="nextSlide"
            style="position: absolute; right: 0px; transform: translateX(200%) translateY(-50%); top: 30%; z-index: 20; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="#6CC24A">
                <g filter="url(#filter0_d_4264_4406)">
                    <circle cx="34" cy="34" r="22" fill="white" />
                    <circle cx="34" cy="34" r="21.5" stroke="#6CC24A" />
                </g>
                <path transform="translate(24, 24)"
                    d="M14.1923 10.4422L7.94229 16.6922C7.88422 16.7502 7.81528 16.7963 7.73941 16.8277C7.66354 16.8592 7.58223 16.8753 7.5001 16.8753C7.41798 16.8753 7.33666 16.8592 7.26079 16.8277C7.18492 16.7963 7.11598 16.7502 7.05792 16.6922C6.99985 16.6341 6.95378 16.5652 6.92236 16.4893C6.89093 16.4134 6.87476 16.3321 6.87476 16.25C6.87476 16.1679 6.89093 16.0865 6.92236 16.0107C6.95378 15.9348 6.99985 15.8659 7.05792 15.8078L12.8665 9.99998L7.05792 4.19217C6.94064 4.07489 6.87476 3.91583 6.87476 3.74998C6.87476 3.58413 6.94064 3.42507 7.05792 3.30779C7.17519 3.19052 7.33425 3.12463 7.5001 3.12463C7.66596 3.12463 7.82502 3.19052 7.94229 3.30779L14.1923 9.55779C14.2504 9.61584 14.2965 9.68477 14.328 9.76064C14.3594 9.83652 14.3756 9.91785 14.3756 9.99998C14.3756 10.0821 14.3594 10.1634 14.328 10.2393C14.2965 10.3152 14.2504 10.3841 14.1923 10.4422Z"
                    fill="white" />
            </svg>
        </div>`;
    },

    leftArrow: () => {
        return `<div @click="previousSlide"
            style="position: absolute; left: 0px; transform: translateX(-160%) translateY(-50%); top: 30%; z-index: 20; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="#6CC24A">
                <g filter="url(#filter0_d_4264_4406)">
                    <circle cx="34" cy="34" r="22" fill="white" />
                    <circle cx="34" cy="34" r="21.5" stroke="#6CC24A" />
                </g>
                <path transform="translate(24, 24)"
                    d="M5.80783 10.4422L12.0578 16.6922C12.1159 16.7502 12.1848 16.7963 12.2607 16.8277C12.3366 16.8592 12.4179 16.8753 12.5 16.8753C12.5821 16.8753 12.6635 16.8592 12.7393 16.8277C12.8152 16.7963 12.8841 16.7502 12.9422 16.6922C13.0003 16.6341 13.0463 16.5652 13.0778 16.4893C13.1092 16.4134 13.1254 16.3321 13.1254 16.25C13.1254 16.1679 13.1092 16.0865 13.0778 16.0107C13.0463 15.9348 13.0003 15.8659 12.9422 15.8078L7.13361 9.99998L12.9422 4.19217C13.0595 4.07489 13.1254 3.91583 13.1254 3.74998C13.1254 3.58413 13.0595 3.42507 12.9422 3.30779C12.8249 3.19052 12.6659 3.12463 12.5 3.12463C12.3342 3.12463 12.1751 3.19052 12.0578 3.30779L5.80783 9.55779C5.74972 9.61584 5.70362 9.68477 5.67217 9.76064C5.64072 9.83652 5.62453 9.91785 5.62453 9.99998C5.62453 10.0821 5.64072 10.1634 5.67217 10.2393C5.70362 10.3152 5.74972 10.3841 5.80783 10.4422Z"
                    fill="white" />
            </svg>
        </div>`;
    },

    activeCardArrow: () => {
        return `<template x-if="slide.active">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="19" cy="19" r="19" fill="#E0EAFF" />
                            <path
                                d="M24.6204 19.4001L19.5311 24.4893C19.425 24.5955 19.2811 24.6551 19.131 24.6551C18.981 24.6551 18.8371 24.5955 18.7309 24.4893C18.6248 24.3832 18.5652 24.2393 18.5652 24.0893C18.5652 23.9392 18.6248 23.7953 18.7309 23.6892L22.8554 19.5655H11.7798C11.6299 19.5655 11.486 19.5059 11.38 19.3998C11.2739 19.2938 11.2144 19.15 11.2144 18.9999C11.2144 18.85 11.2739 18.7062 11.38 18.6001C11.486 18.4941 11.6299 18.4345 11.7798 18.4345H22.8554L18.7309 14.3108C18.6248 14.2047 18.5652 14.0608 18.5652 13.9107C18.5652 13.7606 18.6248 13.6167 18.7309 13.5106C18.8371 13.4045 18.981 13.3449 19.131 13.3449C19.2811 13.3449 19.425 13.4045 19.5311 13.5106L24.6204 18.5999C24.673 18.6524 24.7147 18.7148 24.7431 18.7834C24.7716 18.8521 24.7862 18.9257 24.7862 18.9999C24.7862 19.0742 24.7716 19.1478 24.7431 19.2165C24.7147 19.2851 24.673 19.3475 24.6204 19.4001Z"
                                fill="#0032A0" />
                        </svg>
                    </template>`;
    },

    nonActiveCardArrow: () => {
        return `<template x-if="!slide.active">
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="#E0EAFF" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="19" cy="19" r="19" fill="#E0EAFF" />
                                <path
                                    d="M24.6204 19.4001L19.5311 24.4893C19.425 24.5955 19.2811 24.6551 19.131 24.6551C18.981 24.6551 18.8371 24.5955 18.7309 24.4893C18.6248 24.3832 18.5652 24.2393 18.5652 24.0893C18.5652 23.9392 18.6248 23.7953 18.7309 23.6892L22.8554 19.5655H11.7798C11.6299 19.5655 11.486 19.5059 11.38 19.3998C11.2739 19.2938 11.2144 19.15 11.2144 18.9999C11.2144 18.85 11.2739 18.7062 11.38 18.6001C11.486 18.4941 11.6299 18.4345 11.7798 18.4345H22.8554L18.7309 14.3108C18.6248 14.2047 18.5652 14.0608 18.5652 13.9107C18.5652 13.7606 18.6248 13.6167 18.7309 13.5106C18.8371 13.4045 18.981 13.3449 19.131 13.3449C19.2811 13.3449 19.425 13.4045 19.5311 13.5106L24.6204 18.5999C24.673 18.6524 24.7147 18.7148 24.7431 18.7834C24.7716 18.8521 24.7862 18.9257 24.7862 18.9999C24.7862 19.0742 24.7716 19.1478 24.7431 19.2165C24.7147 19.2851 24.673 19.3475 24.6204 19.4001Z"
                                    fill="#0032A0" /> 
                            </svg>
                        </template>`;
    }

};



app.engine("hbs", engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        rightArrowSVG: svgIcons.rightArrow,
        leftArrowSVG: svgIcons.leftArrow,
        activeCardArrowSVG: svgIcons.activeCardArrow,
        nonActiveCardArrowSVG: svgIcons.nonActiveCardArrow
    }
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'))
app.use(express.static('files'))

app.get('/', (req, res) => {
    res.render('index', {});
})


 /* app.get('/solutions/consumer', (req, res) => {
    res.render('consumer', {});
})
*/
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

app.get("/blog/developing-fintech-in-africa-with-carl-powell",(req,res) => {
    res.render("developing-fintech-in-africa-with-carl-powell",{
    })
 });

 app.get("/solutions/foreign-exchange",(req,res) => {
    res.render("foreignexchange",{
    })
 });

  app.get("/solutions/agri-commodities",(req,res) => {
    res.render("digitalpayments",{
    })
  });
 
   app.get("/solutions/remittance",(req,res) => {
    res.render("Digital-infrastructure",{
    })
   });
 
   app.get("/solutions/collections",(req,res) => {
    res.render("collections",{
    })
 });

app.get("/blog/javolin-set-to-launch-on-april-6-2022",(req,res) => {
    res.render("javolin-set-to-launch-on-april-6-2022",{

    })
});

app.get("/about/company",(req,res) => {
    res.render("company",{
    })
});

app.get("/about/clients",(req,res) => {
    res.render("clients",{
    })
});


app.get("/blog/javolin-opens-new-office-in-dakar-senegal",(req,res) => {
    res.render("javolin-opens-new-office-in-dakar-senegal",{
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

app.get("/privacy",(req,res) => {
    res.render("privacy",{
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




