/// <reference path='../typings/tsd.d.ts' />
"user strict";
"use strict";
var customer_1 = require('./../data/customer');
var student_1 = require('./../data/student');
var Route;
(function (Route) {
    var ServiceRouting = (function () {
        function ServiceRouting() {
        }
        ServiceRouting.prototype.all = function (req, res, next) {
            res.json("{title:'index', message:'All: Index'}");
        };
        ServiceRouting.prototype.list = function (req, res, next) {
            customer_1.CustomerDataAccess.getAll().then(function (result) {
                res.json(result);
            });
        };
        ServiceRouting.prototype.find = function (req, res, next) {
            console.log('start find');
            //res.json(StudentDataAccess.find());
            student_1.StudentDataAccess.find().then(function (result) {
                res.json(result);
            });
        };
        return ServiceRouting;
    }());
    Route.ServiceRouting = ServiceRouting;
})(Route || (Route = {}));
module.exports = Route;
