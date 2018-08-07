"use strict";
import { Utilities } from './../helpers/utilities';

var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

class DataAccessBase {
  static _conn:any = null;
  static _cs: string = process.env.MONGO_CONNECTION || "mongodb://localhost:27017/jade";

  public static getConn(): any {
    return DataAccessBase._conn;
  }

  public static OpenConnection(callback:Function): void {
      if(DataAccessBase._conn == null) {
          mongoClient.connect(DataAccessBase._cs, (err:any, db:any) =>{
            assert.equal(null, err);
            DataAccessBase._conn = db;
            if(Utilities.isValidCallBack(callback)) {
              callback(DataAccessBase._conn)
            }
            console.log('Begin connection');
          });
      }
  }

  public static CloseConnection(): void {
      if(DataAccessBase._conn != null) {
        DataAccessBase._conn.close();
        DataAccessBase._conn = null;
        console.log('End connection');
      }
  }
}

export {DataAccessBase as DataAccess};
