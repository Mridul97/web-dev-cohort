const express = require('express');
const fs = require('fs');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello!");    
});

app.get("/files", (req, res) => {
    fs.readdir("./files", (err, files) => {
        if(err){
          res.sendStatus(500);
        } else { 
          res.status(200).json(files);
        }
    })
});

app.get("/file/:filename", (req, res) => {
    const fileName = req.params["filename"];
    fs.readFile("./files/" + fileName, (err, data) => {
        // console.log("data", data);
        // console.log("err", err);
        if(data) {
            res.status(200).send(data.toString());
        } else {
            res.status(404).send("File not found");
        }
    });
});

app.use((req, res, next) => {
    res.status(404).send("Route not found");
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
})
