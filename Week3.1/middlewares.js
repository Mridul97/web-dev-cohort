const express = require('express');
const app = express();

let requests = 0;

// middleware
function validateUserId(req, res, next){
    const id = req.params["id"];
    if(id > 10){
        next();
    } else {
        res.status(401).send("Id should be greater than 10");
    }
}

// count requests middleware
function countRequests(req, res, next){
    requests++;
    console.log(requests);
    next();
}

app.use(countRequests);

app.get("/", function(req, res){
    res.send("Hello World!");
});

app.get("/users/:id", validateUserId, function(req, res){
    res.json({
        "userId": req.params.id
    })
})

app.listen(3000, () => {
    console.log("listening");
});
