const http = require("http");

const html = `
<html at='a'>
  <body>
    <div id="root">
      <h1>Hello World!</h1>
      <p>This is a Toy Browser~</p>
    </div>
  </body>
</html>
`;

http
  .createServer((request, response) => {
    let body = [];
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        // // body.push(chunk.toString();
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        console.log("body", body);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(html);
      });
  })
  .listen(8080);

console.log("server started");
