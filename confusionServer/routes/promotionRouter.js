const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate')
const cors = require('./cors')

const Promotions = require('../models/Promotions');
const promotionRouter = express.Router()

promotionRouter.use(bodyParser.json())

promotionRouter.route('/')

.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

.get(cors.cors, (req, res, next) => {
    Promotions.find({})
        .then( promo => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, err=>next(err))
        .catch((err)=>next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.create(req.body)
        .then(promo => {
            console.log('Promo created !');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, err=> next(err))
        .catch((err) => next(err));
})

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403
    res.end("PUT operation is not supported !");
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.remove({})
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err=> next(err))
    .catch((err) => next(err));
});

promotionRouter.route('/:promotionId')

.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

.get(cors.cors, (req, res, next) => {
    Promotions.findById(req.params.promotionId)
    .then(promo => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403
    res.end("POST operation is not supported !");
})

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then(promo => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promotionRouter;
