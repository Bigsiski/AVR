//import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';

import {setUpConnection} from "./database/database";

import users from './routes/users';
import collections from './routes/collections';
import models from './routes/models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(path.join(__dirname, '../client/build/')));

app.get('/bundle.js', function (req, res) {
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/build/bundle.js'), function(err) {
    if (err) {
      res.status(500).send(err)
    }});
 // res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/build/bundle.js'));
});

app.get('/manifest.json', function (req, res) {
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/public/manifest.json'));
});

app.get('/style', function (req, res) {
  res.sendFile(path.join('C:/Users/Vitaliy/Desktop/WebstormProjects/server/client/build/style.css'));
});

app.use('/api/users', users);
app.use('/api/models', models);
app.use('/api/collections', collections);


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname+'/../client/public/index.html') , function(err) {
    if (err) {
      res.status(500).send(err)
    }})
});

async function start() {
  setUpConnection()
  app.listen(process.env.PORT, () => console.log("started at" + process.env.PORT));
}

start();

module.exports = app;


