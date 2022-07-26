const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
const fileName = 'responses.json';

// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);


app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', (request, response) => {
    response.render('home');
});

// This is a RESTful GET web service
app.get('/responses', (request, response) => {
    response.send(data);
});

//This is a RESTful POST web service

app.post('/responses', jsonParser, (request, response) => {

    data[0].technologies+=request.body[0].technologies
    data[0].skills+=request.body[0].skills
    data[0].food+=request.body[0].food
    data[0].accommodation+=request.body[0].accommodation
    data[0].trainers+=request.body[0].trainers
    data[0].fellow_students+=request.body[0].fellow_students
    data[0].nothing+=request.body[0].nothing 
    data[0].students+=1
   fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    response.end();
    
});

app.listen(port);
console.log('server listening on port ${port}');