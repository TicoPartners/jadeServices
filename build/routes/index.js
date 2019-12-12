/// <reference path='../typings/tsd.d.ts' />
"use strict";
var Route;
(function (Route) {
    var Index = /** @class */ (function () {
        function Index() {
        }
        Index.prototype.all = function (req, res, next) {
            res.json("{title:'index', message:'All: Index'}");
        };
        Index.prototype.get = function (req, res, next) {
            res.json("{title:'index', message:'GET: Index'}");
        };
        Index.prototype.post = function (req, res, next) {
            res.json("{title:'index', message:'POST: Index'}");
        };
        Index.prototype.put = function (req, res, next) {
            res.json("{title:'index', message:'PUT: Index'}");
        };
        Index.prototype.delete = function (req, res, next) {
            res.json("{title:'index', message:'DELETE: Index'}");
        };
        Index.prototype.patch = function (req, res, next) {
            res.json("{title:'index', message:'PATCH: Index'}");
        };
        Index.prototype.options = function (req, res, next) {
            res.json("{title:'index', message:'OPTIONS: Index'}");
        };
        Index.prototype.head = function (req, res, next) {
            res.json("{title:'index', message:'HEAD: Index'}");
        };
        return Index;
    }());
    Route.Index = Index;
})(Route || (Route = {}));
module.exports = Route;
