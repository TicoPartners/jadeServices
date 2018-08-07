"use strict";
var utilities_1 = require('./../helpers/utilities');
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var DataAccessBase = (function () {
    function DataAccessBase() {
    }
    DataAccessBase.getConn = function () {
        return DataAccessBase._conn;
    };
    DataAccessBase.OpenConnection = function (callback) {
        if (DataAccessBase._conn == null) {
            mongoClient.connect(DataAccessBase._cs, function (err, db) {
                assert.equal(null, err);
                DataAccessBase._conn = db;
                if (utilities_1.Utilities.isValidCallBack(callback)) {
                    callback(DataAccessBase._conn);
                }
                console.log('Begin connection');
            });
        }
    };
    DataAccessBase.CloseConnection = function () {
        if (DataAccessBase._conn != null) {
            DataAccessBase._conn.close();
            DataAccessBase._conn = null;
            console.log('End connection');
        }
    };
    DataAccessBase._conn = null;
    DataAccessBase._cs = process.env.MONGO_CONNECTION || "mongodb://localhost:27017/jade";
    return DataAccessBase;
}());
exports.DataAccess = DataAccessBase;
