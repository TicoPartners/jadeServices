/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
/// <reference path="typings/morgan/morgan.d.ts" />
/// <reference path="typings/cors/cors.d.ts" />
"use strict";
//Let's import express and other necessary middleware
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var morgan = require('morgan');
//Let's import your router files
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var serviceRouter = require('./routes/services');
var HttpServer = (function () {
    function HttpServer() {
        this.app = express();
        //configure express and logging stuff
        this.ExpressConfiguration();
        //configure routes
        //this.IndexRoutes();
        //this.UsersRoutes();
        this.MainRouting();
    }
    HttpServer.bootstrap = function () {
        return new HttpServer();
    };
    HttpServer.prototype.ExpressConfiguration = function () {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        //cors settings
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
            next();
        });
        this.app.use(cors());
        // morgan settings
        this.app.use(morgan('dev'));
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    };
    HttpServer.prototype.MainRouting = function () {
        this.router = express.Router();
        var index = new indexRouter.Index();
        var service = new serviceRouter.ServiceRouting();
        this.router.get("/", index.get.bind(index.get));
        this.router.get("/all", index.all.bind(index.all));
        this.router.get('/customer/list', service.list.bind(service.list));
        this.router.get('/student/find', service.find.bind(service.find));
        this.app.use("/api", this.router);
    };
    HttpServer.prototype.IndexRoutes = function () {
        this.router = express.Router();
        var index = new indexRouter.Index();
        var service = new serviceRouter.ServiceRouting();
        this.router.get("/all", index.all.bind(index.all));
        this.router.get("/", index.get.bind(index.get));
        this.router.post("/", index.post.bind(index.post));
        //this.router.put("/", index.put.bind(index.put));
        this.router.delete("/", index.delete.bind(index.delete));
        this.router.get('/api/customer/list', service.list.bind(service.list));
        this.app.use("/api/index", this.router);
    };
    HttpServer.prototype.UsersRoutes = function () {
        this.router = express.Router();
        var users = new usersRouter.Users();
        this.router.get("/all", users.all.bind(users.all));
        this.router.get("/", users.get.bind(users.get));
        this.router.post("/", users.post.bind(users.post));
        //this.router.put("/", users.put.bind(users.put));
        this.router.delete("/", users.delete.bind(users.delete));
        this.app.use("/api/users", this.router);
    };
    return HttpServer;
}());
//Now initialize app based on HttpServer Class,we defined.
var port = process.env.PORT || 8080;
var httpserver = HttpServer.bootstrap();
var app = httpserver.app;
app.set("port", port);
//Now initialize server from App
var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
// ********************************************************
// DONOT TOUCH FOLLOWING FUNCTIONS. THEY ARE HERE FOR HELP
// ********************************************************
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    console.log("Listening on " + bind);
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
