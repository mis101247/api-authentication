import express from 'express';
import morgan from 'morgan';
import { router } from './router';
import mongoose from 'mongoose';

const app: express.Application = express();

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, { useNewUrlParser: true })
    .then(() => {
        console.log('mongodb is connected');
    }).catch(error => {
        console.log('請先確保mongodb環境完成');
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
