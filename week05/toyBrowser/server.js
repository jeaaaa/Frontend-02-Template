const http = require('http');

http.createServer((request, response) => {
    let body = [];
    request.on('error', (e) => {
        console.error(e);
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        body = body.toString();
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(
`<html maaa="a">
    <head>
    <style>
        #container {
            width:800px;
            height:500px;
            display:flex;
            background-color:rgb(255,255,255);
        }
        #container #myid {
            width:200px;
            height:100px;
            background-color:rgb(255,0,0);
        }

        #container .c1 {
            height:300px;
            flex:1;
            background-color:rgb(0,255,255);
        }
    </style>
    </head>
    <body>
        <div id="container">
            <div id="myid"></div>
            <div class="c1"></div> 
        </div> 
    </body>
</html>`);
    });
}).listen(9090);

console.log('server start778');