const http = require("http");
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process')
const querystring = require('querystring')

// 打开登录授权页

child_process.exec(`open https://github.com/login/oauth/authorize`)

// 创建server 接收鉴权后的token 执行发布程序
http.createServer(function (request, response) {
    const query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1])
    publish(query.token)
}).listen(7777)

function publish(token) {    // 鉴权后发布
    // fs.stat("./sample.html", (err, stats) => {   //单文件处理
    let request = http.request({
        hostname: "127.0.0.1",
        port: 8082,
        path: `/publish?token=${token}`,
        method: "POST",
        headers: {
            'Content-Type': 'application/octet-stream',
            // 'Content-Length': stats.size
        }
    }, response => {
        console.log(response)
    })

    let file = fs.createReadStream("./sample.html");

    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.directory('./sample/', false);
    archive.finalize();

    archive.pipe(request);


    // file.pipe(request);  //单文件处理

    // file.on('end', () => request.end())  //单文件处理
    // })
}


