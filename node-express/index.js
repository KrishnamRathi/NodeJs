const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dishRouter = require('./routes/dishRouter')

const port = 3000
const hostname = 'localhost'

const app=express()

app.use(morgan('dev'))
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json())
app.use('/dishes', dishRouter)

app.all('/dishes:dishId', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next()
})

app.get('/dishes:dishId', (req, res, next) => {
    res.end("Will send all details of dish with id: "+ req.params.dishId);
})

app.post('/dishes:dishId', (req, res, next) => {
    res.statusCode = 403
    res.end("POST operation is not supported !");
   });

app.put('/dishes:dishId', (req, res, next) => {
    res.write("Updating the dish: "+ req.params.dishid);
    res.end("Will change the dish: "+req.body.name +'with details: '+ req.body.description)
})

app.delete('/dishes:dishId', (req, res, next) => {
    res.end("Will delete dish with id: "+ req.params.dishId)
})






app.use((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
})


const server = http.createServer(app)

server.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}/`);
})


