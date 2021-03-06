// import
const fs = require("fs")

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write("</html>");
        return res.end();
    }
    if (url === '/message' && method === "POST" ) {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        // async listeners!!!
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const userMessage = parsedBody.split('=')[1];
            // Blocked writeFile synched code!!!
            // fs.writeFileSync('message.txt', userMessage);
            // unBlocked writeFile async code!!!
            fs.writeFile('message_async.txt', userMessage, (err) => {
                // DoStaff after we are done with the writing the file
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
                //ToDo --> error handling goes here, catch err
            });
        });
        // console.log(req.url, req.method, req.headers);
        // process.exit();
        res.setHeader("Content-Type", "text/html");
        res.end();
    }
}

// export model versions
module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     dummyText: "Dummy",
// };

// exports.handler = requestHandler;
// exports.dummyText = "Some Dummy Text";