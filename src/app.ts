import express from 'express';
import morgan from 'morgan';
import { router } from './router';
import mongoose from 'mongoose';

const app: express.Application = express();

mongoose.connect('mongodb://172.20.0.1:27017/keyo', { useNewUrlParser: true })
    .then(() => {
        console.log('mongodb is connected');
    }).catch(error => {
        console.error(error);
    });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// load router
for (const route of router) {
    app.use(route.getPrefix(), route.getRouter());
}

module.exports = app;
