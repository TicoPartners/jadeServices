"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("./../helpers/utilities");
var config = require('config');
var _current = config.get('DataAccess.conn.cs');
var _database = config.get('DataAccess.dbname');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var DataAccessBase = /** @class */ (function () {
    function DataAccessBase() {
    }
    DataAccessBase.getConn = function () {
        return DataAccessBase._conn;
    };
    DataAccessBase.OpenConnection = function (callback) {
        if (DataAccessBase._conn == null) {
            MongoClient.connect(DataAccessBase._cs, function (err, db) {
                assert.equal(null, err);
                DataAccessBase._conn = db;
                DataAccessBase._db = db.db(_database);
                if (utilities_1.Utilities.isValidCallBack(callback)) {
                    callback(DataAccessBase._db);
                }
                console.log('Begin connection');
            });
        }
    };
    DataAccessBase.CloseConnection = function () {
        if (DataAccessBase._conn != null) {
            console.log(DataAccessBase._conn);
            console.log(DataAccessBase._db);
            DataAccessBase._conn.close();
            DataAccessBase._db = null;
            DataAccessBase._conn = null;
            console.log('End connection');
        }
    };
    DataAccessBase._conn = null;
    DataAccessBase._db = null;
    DataAccessBase._cs = process.env.MONGO_CONNECTION || _current;
    return DataAccessBase;
}());
exports.DataAccess = DataAccessBase;
