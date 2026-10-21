let http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    if (req.url == '/') {

        fs.readFile('formValue.txt', (err, data)=>{
            let savedMessage ="";

            if(!err && data){
                savedMessage = `<h3> Saved Name: ${data.toString()}</h3>`
            }
             res.end(
            `
        ${savedMessage}
        <form action="/message" method="POST" >
        <label for="username">Name:</label>
        <input type="text" id="username" name="username">
        <button type="submit">Add</button>
        </form>
            `
        );
        });
       
    }else{
        if(req.url=='/message'){
            let dataChunks = [];

            req.on('data', (chunks)=>{
                dataChunks.push(chunks);
            })

            req.on('end', ()=>{
                let combinedBuffer = Buffer.concat(dataChunks);
                let value = combinedBuffer.toString().split("=")[1];

                fs.writeFile('formValue.txt', value, (err)=>{
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                });
            });
        }else{
            res.statusCode = 404;
            res.end("<h1>404 NOT FOUND</h1>");
        }
    }
});

server.listen(3000, () => {
    console.log("server is running");
})