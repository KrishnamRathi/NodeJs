const express = require('express')
const bodyParser = require('body-parser')

const dishRouter = express.Router()

dishRouter.use(bodyParser.json())

dishRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next()
})

.get((req, res, next) => {
    res.end("Will send all dishes to you.");
})

.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403
    res.end("PUT operation is not supported !");
})

.delete((req, res, next) => {
    res.end("Will delete all dishes")
});

dishRouter.route('/:dishId')

.all( (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next()
})

.get((req, res, next) => {
    res.end("Will send all details of dish with id: "+ req.params.dishId);
})

.post((req, res, next) => {
    res.statusCode = 403
    res.end("POST operation is not supported !");
})

.put((req, res, next) => {
    res.write("Updating the dish: "+ req.params.dishId + '\n');
    res.end("Will change the dish: "+req.body.name +' with details: '+ req.body.description)
})

.delete((req, res, next) => {
    res.end("Will delete dish with id: "+ req.params.dishId)
});

module.exports = dishRouter;
