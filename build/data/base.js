"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataaccess_1 = require("./dataaccess");
var collection = 'default';
var assert = require('assert');
var q = require('q');
var mongodb = require('mongodb');
var deferred = null;
var BaseAccess = /** @class */ (function () {
    function BaseAccess() {
    }
    BaseAccess.setCollection = function (value) {
        collection = value;
    };
    BaseAccess.insert = function (value) {
        value.createDate = new Date();
        deferred = q.defer();
        dataaccess_1.DataAccess.OpenConnection(function (conn) {
            conn.collection(collection).insertOne(value, function (err, result) {
                dataaccess_1.DataAccess.CloseConnection();
                assert.equal(null, err);
                if (err) {
                    deferred.reject(new Error(JSON.stringify(err)));
                }
                else {
                    deferred.resolve(result);
                }
            });
        });
        return deferred.promise;
    };
    BaseAccess.find = function () {
        deferred = q.defer();
        dataaccess_1.DataAccess.OpenConnection(function (conn) {
            conn.collection(collection).find({}, function (err, result) {
                dataaccess_1.DataAccess.CloseConnection();
                assert.equal(null, err);
                if (err) {
                    deferred.reject(new Error(JSON.stringify(err)));
                }
                else {
                    deferred.resolve(result);
                }
            });
        });
        return deferred.promise;
    };
    BaseAccess.findById = function (id) {
        deferred = q.defer();
        dataaccess_1.DataAccess.OpenConnection(function (conn) {
            conn.collection(collection).findOne({ _id: new mongodb.ObjectID(id) }, function (err, result) {
                dataaccess_1.DataAccess.CloseConnection();
                assert.equal(null, err);
                if (err) {
                    deferred.reject(new Error(JSON.stringify(err)));
                }
                else {
                    deferred.resolve(result);
                }
            });
        });
        return deferred.promise;
    };
    BaseAccess.update = function (id, value) {
        delete value._id;
        deferred = q.defer();
        dataaccess_1.DataAccess.OpenConnection(function (conn) {
            conn.collection(collection).updateOne({ _id: new mongodb.ObjectID(id) }, value, function (err, result) {
                dataaccess_1.DataAccess.CloseConnection();
                assert.equal(null, err);
                if (err) {
                    deferred.reject(new Error(JSON.stringify(err)));
                }
                else {
                    deferred.resolve(result);
                }
            });
        });
        return deferred.promise;
    };
    BaseAccess.delete = function (id) {
        deferred = q.defer();
        dataaccess_1.DataAccess.OpenConnection(function (conn) {
            conn.collection(collection).deleteOne({ _id: new mongodb.ObjectID(id) }, function (err, result) {
                dataaccess_1.DataAccess.CloseConnection();
                assert.equal(null, err);
                if (err) {
                    deferred.reject(new Error(JSON.stringify(err)));
                }
                else {
                    deferred.resolve(result);
                }
            });
        });
    };
    return BaseAccess;
}());
exports.BaseDataAccess = BaseAccess;
