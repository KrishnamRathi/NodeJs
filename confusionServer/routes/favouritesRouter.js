const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
var authenticate = require('../authenticate');
const cors = require('./cors');

const Favourites = require('../models/Favourites');

const favouritesRouter = express.Router()

favouritesRouter.use(bodyParser.json())

favouritesRouter.route('/')

.get(authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then(fav => {
        if(!fav){
            Favourites.create({user: req.user._id, dishes: []})
            .then(fav => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
            .catch(err => next(err));
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(fav);
        }
    })
    .catch(err => next(err))
    
})

.post(authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id}, (err, fav) => {
        if(err){
            return next(err);
        }else if(!fav){
            Favourites.create({user: req.user._id, dishes: req.body})
            .then(fav => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
            .catch(err => next(err));
        }else{
            for(var i=0;i<req.body.length;i++){
                if(fav.dishes.indexOf(req.body[i])===-1){
                    fav.dishes.push(req.body[i]);
                }
            }
            fav.save()
            .then(fav => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
            .catch(err => next(err));
        }
    })
})

.put(authenticate.verifyUser, (req, res) => {
    res.end("PUT method is not supported !!")
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Favourites.remove({})
    .then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end("All favourites deleted successfully!");
    })
    .catch(err => next(err));
})

favouritesRouter.route('/:dishId')

.post(authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((fav) => {
        if(!fav){
            Favourites.create({user: req.user._id, dishes: req.body})
            .then(fav => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
            .catch(err => next(err));
        }
        else if(fav.dishes.indexOf(req.params.dishId)===-1) {
            fav.dishes.push(req.params.dishId);
            fav.save()
            .then(fav => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
            .catch(err => next(err));
        }
            
    })
    .catch(err => next(err));
})


.delete(authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((fav) => {
        if(fav.dishes.indexOf(req.params.dishId)!==-1) 
            fav.dishes.splice(fav.dishes.indexOf(req.params.dishId), 1);
        fav.save()
        .then(fav => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(fav);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
})




module.exports = favouritesRouter;
