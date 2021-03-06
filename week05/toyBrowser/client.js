const net = require('net');
const images = require('images');
const parser = require('./parser.js');
const render = require('./render.js');

class Request {
    constructor(options) {
        // const { method = 'GET', host, port = '80', path = '/',body = {}, headers = {} } = options
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};

        if(!this.headers['Content-Type']){
            this.headers['Content-Type'] = "application/x-www-form-urlencoded";
        }
        //body编码
        if(this.headers['Content-Type'] === 'application/json'){
            this.bodyText = JSON.stringify(this.body);
        }else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded'){
            this.bodyText = Object.keys(this.body).map(k => `${k}=${encodeURIComponent(this.body[k])}`).join('&');
        }
        //补全Content-Length
        this.headers['Content-Length'] = this.bodyText.length;
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            //逐步接收response
            const parser = new ResponseParse();
            if(connection){
                connection.write(this.toString());
            }else{
                connection = net.createConnection({ //建立连接
                    host: this.host,
                    port: this.port,
                }, () => {
                    console.log(this.toString());
                    connection.write(this.toString());  //成功后写入
                });
            }

            connection.on('data', (data) => {
                console.log(data.toString());   //转成字符串给状态机处理
                parser.receive(data.toString());
                if (parser.isFinished) {
                    resolve(parser.response);
                    connection.end();
                }
            });
            connection.on('error', (err) => {
                reject(err);
                connection.end();
            })
        });
    }
}

class ResponseParse{
    constructor(){
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }
    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }
    receive(string){
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char){    //状态机
        if(this.current === this.WAITING_STATUS_LINE){
            if(char === '\r'){   //传进来的char等于\r说明结束了，就替换状态
                this.current = this.WAITING_STATUS_LINE_END;
            }else{
                this.statusLine += char;
            }
        }else if(this.current === this.WAITING_STATUS_LINE_END){
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }
        }else if(this.current === this.WAITING_HEADER_NAME){
            if(char === ':'){    // : 说明是HEADER里的分隔符
                this.current = this.WAITING_HEADER_SPACE;
            }else if(char === '\r'){    // \r 说明header结束后的回车换行
                this.current = this.WAITING_HEADER_BLOCK_END;
                if(this.headers['Transfer-Encoding'] === 'chunked'){
                    this.bodyParser = new TrunkedBodyParser();
                }
            }else{
                this.headerName += char;
            }
        }else if(this.current === this.WAITING_HEADER_SPACE){
            if(char === ' '){
                this.current = this.WAITING_HEADER_VALUE;
            }
        }else if(this.current === this.WAITING_HEADER_VALUE){
            if (char === '\r') {
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = '';
                this.headerValue = '';
            }else{
                this.headerValue += char
            }
        }else if(this.current === this.WAITING_HEADER_LINE_END){
            if(char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        }else if(this.current === this.WAITING_HEADER_BLOCK_END){
            if(char === '\n'){
                this.current = this.WAITING_BODY;
            }
        }else if(this.current === this.WAITING_BODY){
            this.bodyParser.receiveChar(char);
        }
    }
}

class TrunkedBodyParser {
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;

        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }

    receiveChar(char) {
        if(this.current === this.WAITING_LENGTH){
            if(char === '\r'){
                if(this.length === 0){
                    this.isFinished = true
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            }else{
                this.length *= 16;
                this.length += parseInt(char, 16);
            }
        }else if(this.current === this.WAITING_LENGTH_LINE_END){
            if(char === '\n') {
                this.current = this.READING_TRUNK;
            }
        }else if(this.current === this.READING_TRUNK){
            this.content.push(c);
            this.length--;
            if(this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        }else if(this.current === this.WAITING_NEW_LINE){
            if(char === '\r') {
                this.current = this.WAITING_NEW_LINE_END;
            }
        }else if(this.current === this.WAITING_NEW_LINE_END){
            if(char === '\n') {
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}

void async function(){
    let request = new Request({
        method: 'POST',
        host: 'localhost',
        port: '9090',
        path: '/',
        headers: {
            ["X-Foo2"]: 'customed',
        },
        body: {
            name: 'jea'
        },
    });

    let response = await request.send();
    let dom = parser.parseHTML(response.body);
    console.log(dom);
    let viewport = images(800, 600);

    render(viewport, dom);

    viewport.save('viewport.jpg');
}();