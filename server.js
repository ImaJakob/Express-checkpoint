const express = require('express');
const path = require('path');
const app = express();


function workingHoursMiddleware( req, res, next){
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if(day >= 1 && day <= 5 && hour >= 9 && hour < 17){
        next();
    }else{
        res.send(`
            <h1>Access Denied</h1>
            <p>The website is only available on weekdays, from 9:00 AM to 5:00 PM.</p>
       `);
    }
}

//applying middleWware globally
app.use(workingHoursMiddleware);

//ejs for html file template engine
app.set('view engine', 'ejs');

//css
app.use(express.static(path.join(__dirname, 'public')));

//app.get
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.get('/services', (req, res) => {
    res.render('services', {title: 'Our Services'});
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact Us'});
});


//listen port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});