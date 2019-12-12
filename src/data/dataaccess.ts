"use strict";
import { Utilities } from './../helpers/utilities';

var config = require('config');
var _current= config.get('DataAccess.conn.cs');
var _database = config.get('DataAccess.dbname');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

class DataAccessBase {
  static _conn:any = null;
  static _db:any = null;
  static _cs: string = process.env.MONGO_CONNECTION || _current;

  public static getConn(): any {
    return DataAccessBase._conn;
  }

  public static OpenConnection(callback:Function): void {
      if(DataAccessBase._conn == null) {
          MongoClient.connect(DataAccessBase._cs, (err:any, db:any) =>{
            assert.equal(null, err);
            DataAccessBase._conn= db;
            DataAccessBase._db = db.db(_database);
            if(Utilities.isValidCallBack(callback)) {
              callback(DataAccessBase._db)
            }
            console.log('Begin connection');
          });
      }
  }

  public static CloseConnection(): void {
      if(DataAccessBase._conn != null) {
        console.log(DataAccessBase._conn);
        console.log(DataAccessBase._db);
        DataAccessBase._conn.close();
        DataAccessBase._db = null;
        DataAccessBase._conn = null;
        console.log('End connection');
      }
  }
}

export {DataAccessBase as DataAccess};
