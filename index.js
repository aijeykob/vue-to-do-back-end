const express = require("express");
const asyncHandler = require('express-async-handler')
const app = express();
const path = require('path');
ABSPATH = __dirname + path.sep;
require(ABSPATH + 'config/config');
const router = express.Router();
const routes = require('./routes')
const controllers = require('./controllers')
Object.entries(routes).forEach(([name, func])=> {
    const obj = {
        doRegisterRoute: function (method,routeSegment,authenticationFunction,validationFunction,controllerFunction   ) {
            const functions = []
            if(authenticationFunction) functions.push(asyncHandler(authenticationFunction))
            if(validationFunction) functions.push(asyncHandler(validationFunction))
            const fn = new controllers[name]
            functions.push(asyncHandler(fn[controllerFunction]))
            router[method](
                '/' + routeSegment,
                [...functions]
            )
        }
    }
    func(obj)
})

//CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //set access control max age to prevent duplicate options request
        res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    }
    next();
});
app.use(router)
app.get("/", function(request, response){
    response.send("<h2>Привет Express!</h2>");
});
// начинаем прослушивать подключения на 3000 порту
app.listen(CONFIG.PORT, ()=> {
    console.log('Server listening on 3000 port')
});
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://${CONFIG.DB_USER}:${CONFIG.DB_PASSWORD}@${CONFIG.DB_CLUSTER}?retryWrites=true&writeConcern=majority`;
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db('todo');
        const users = database.collection('users');
        // Query for a movie that has the title 'Back to the Future'
        const query = { name: 'Andrey' };
        const user = await users.findOne(query);
        console.log(user);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
