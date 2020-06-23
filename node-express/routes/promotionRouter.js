const express = require('express')
const bodyParser = require('body-parser')

const promotionRouter = express.Router()

promotionRouter.use(bodyParser.json())

promotionRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next()
})

.get((req, res, next) => {
    res.end("Will send all promotions to you.");
})

.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403
    res.end("PUT operation is not supported !");
})

.delete((req, res, next) => {
    res.end("Will delete all promotions.")
});

promotionRouter.route('/:promotionId')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next()
})

.get((req, res, next) => {
    res.end("Will send all details of promotion with id: "+ req.params.promotionId);
})

.post((req, res, next) => {
    res.statusCode = 403
    res.end("POST operation is not supported !");
})

.put((req, res, next) => {
    res.write("Updating the promotion: "+ req.params.promotionId + '\n');
    res.end("Will change the promotion: "+req.body.name +' with details: '+ req.body.description)
})

.delete((req, res, next) => {
    res.end("Will delete promotion with id: "+ req.params.promotionId)
});

module.exports = promotionRouter;