const http = require("http");
const https = require('https')
const fs = require('fs')
const unzipper = require('unzipper')
const querystring = require('querystring')

// auth 路由： 接收code，用code+client_id + client_secret 换token
function auth(request, response) {
    // 获取code
    const query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])
    // 使用code 换token
    getToken(query.code, function (info) {
        console.log(info)
        response.write(`<a href="http://localhost:7777/?token=${info.access_token}">publish</a>`)
        response.end()
    })
}
function getToken(code, callback) {
    let request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}`,
        port: 443,
        method: 'POST'
    }, function (response) {
        let body = ''
        response.on('data', chunk => {
            console.log(chunk.toString())
            body += chunk.toString()
        })
        response.on('end', () => {
            callback(querystring.parse(body))
        })
    })
    request.end();
}
// publish路由： 用token 获取用户信息，检查权限，接受发布
function publish(request, response) {
    const query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])
    getUser(query.token, info => {
        if (info.login === '') {
            request.pipe(unzipper.Extract({ path: '../server/public/sample' }))
            request.on('end', function () {
                response.end('yes')
            })

        } else {
            alert('please login')
        }
    })
}

function getUser(token, callback) {
    let request = https.request({
        hostname: 'api.github.com',
        path: `/user`,
        port: 443,
        method: 'GET',
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": 'test-publish'
        }
    }, function (response) {
        let body = ''
        response.on('data', chunk => {
            console.log(chunk.toString())
            body += chunk.toString()
        })
        response.on('end', () => {
            callback(querystring.parse(body))
        })
    })
    request.end();
}

http.createServer(function (request, response) {
    if (request.url.match(/^\/auth\?/)) {
        return auth(request, response)
    }
    if (request.url.match(/^\/publish\?/)) {
        return publish(request, response)
    }


    console.log(request.headers);

    // let outFile = fs.createWriteStream("../server/public/tmp.zip");  //单文件
    // request.pipe(outFile);   //单文件

    // request.pipe(unzipper.Extract({ path: '../server/public/sample' }))
}).listen(8082)