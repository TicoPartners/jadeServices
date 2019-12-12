"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataaccess_1 = require("./dataaccess");
var collection = 'customer';
var assert = require('assert');
var q = require('q');
var deferred = null;
var CustomerDataAccess = /** @class */ (function () {
    function CustomerDataAccess() {
        this.result = null;
    }
    CustomerDataAccess.insert = function (customer) {
        deferred = q.defer();
        dataaccess_1.DataAccess.OpenConnection(function (conn) {
            console.log(conn);
            conn.collection(collection).insertOne(customer, function (err, result) {
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
    CustomerDataAccess.getAll = function () {
        deferred = q.defer();
        dataaccess_1.DataAccess.OpenConnection(function (conn) {
            conn.collection(collection).find({}).toArray(function (err, result) {
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
    return CustomerDataAccess;
}());
exports.CustomerDataAccess = CustomerDataAccess;
