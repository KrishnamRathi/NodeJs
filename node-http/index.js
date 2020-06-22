const http = require('http')
const path = require('path')
const fs = require('fs')

const port = "3000"
const hostname = "localhost"

const server = http.createServer((req, res) => {

    if (req.method == 'GET') {
        var fileUrl = req.url;
        if (req.url == '/') fileUrl = '/index.html'

        var filePath = path.resolve('./public' + fileUrl)
        var extName = path.extname(filePath)
        if (extName == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
                    res.end('<html><body><h1>Error 404: ' + fileUrl +
                        ' not found</h1></body></html>')
                } else {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/html')
                    fs.createReadStream(filePath).pipe(res);
                }
            })
        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            res.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not found</h1></body></html>')
        }


    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('<html><body><h1>Error 404: ' + req.method + 
                    ' not supported </h1></body></html>')
    }

})

server.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}/`)
})