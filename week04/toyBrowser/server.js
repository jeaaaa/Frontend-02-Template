const http = require('http');

http.createServer((request, response)=>{
    let body = {};
    request.on('error', (err)=>{
        console.error(err);
    }).on('data', (chunk)=>{
        body.push(chunk);
    }).on('end', ()=>{
        body = Buffer.concat(body);
        // console.log("body:", body);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(
`<html>
    <head>
        <style>
        .text{color: red;}
        </style>
    </head>
    <body>
        <div class="text">Hello World!!!!!</div>
    </body>
</html>`
        );
    })
}).listen(8087);

console.log("server started434");