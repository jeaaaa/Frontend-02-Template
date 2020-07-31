const http = require('http');

http.createServer((request, response)=>{
    let body = [];
    request.on('error', (err)=>{
        console.error(err);
    }).on('data', (chunk)=>{
        body.push(chunk);
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();
        // console.log("body:", body);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(
`<html>
    <head>
        <style>
            .text{color: red;}
            body div #myid{
                width: 100px;
                background-color: #777777;
            }
            body div img{
                width: 40px;
                background-color: red;
            }
        </style>
    </head>
    <body>
        <div>
            <img id="myid"/>
            <img />
        </div>
        <div class="text">Hello World!!!!!</div>
    </body>
</html>`
        );
    })
}).listen(8087);

console.log("server started434");