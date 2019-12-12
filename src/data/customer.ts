"use strict"
import {DataAccess} from './dataaccess';
import { Utilities } from './../helpers/utilities';

var collection:string = 'customer';
var assert = require('assert');
var q = require('q');
var deferred:any = null;

class CustomerDataAccess {
  public result:any = null;

  public static insert(customer:any): any {
    deferred = q.defer();
    DataAccess.OpenConnection(function(conn:any) {
      console.log(conn);
      conn.collection(collection).insertOne(customer, function(err:any, result:any) {
        DataAccess.CloseConnection();
        assert.equal(null,err);
        if(err) {
          deferred.reject(new Error(JSON.stringify(err)));
        } else {
          deferred.resolve(result);
        }
      })
    });
    return deferred.promise;
  }

  public static getAll(): any {
    deferred = q.defer();
    DataAccess.OpenConnection(function(conn:any) {
      conn.collection(collection).find({}).toArray(function(err:any, result:any) {
        DataAccess.CloseConnection();
        assert.equal(null, err);
        if(err) {
          deferred.reject(new Error(JSON.stringify(err)));
        } else {
          deferred.resolve(result);
        }
      });
    });
    return deferred.promise;
  }
}

export {CustomerDataAccess as CustomerDataAccess}
