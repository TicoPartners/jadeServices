"use strict"
import {DataAccess} from './dataaccess';
import { Utilities } from './../helpers/utilities';

var collection:string = 'default';
var assert = require('assert');
var q = require('q');
var mongodb = require('mongodb');
var deferred:any = null;

class BaseAccess {
  public static setCollection(value: string): any{
    collection = value;
  }

  public static insert(value:any): any {
    value.createDate = new Date();
    deferred = q.defer();
    DataAccess.OpenConnection(function(conn:any) {
      conn.collection(collection).insertOne(value, function(err:any, result:any) {
        DataAccess.CloseConnection();
        assert.equal(null, err);
        if(err) {
          deferred.reject(new Error(JSON.stringify(err)));
        } else {
          deferred.resolve(result);
        }
      })
    });
    return deferred.promise;
  }

  public static find(): any {
    deferred = q.defer();
    DataAccess.OpenConnection(function(conn:any) {
      conn.collection(collection).find({}, function(err:any, result:any) {
        DataAccess.CloseConnection();
        assert.equal(null, err);
        if(err) {
          deferred.reject(new Error(JSON.stringify(err)));
        } else {
          deferred.resolve(result);
        }
      })
    });
    return deferred.promise;
  }

  public static findById(id:number): any {
    deferred = q.defer();
    DataAccess.OpenConnection(function(conn:any) {
      conn.collection(collection).findOne({_id: new mongodb.ObjectID(id)}, function(err:any, result:any) {
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

  public static update(id:number, value: any): any {
    delete value._id;
    deferred = q.defer();
    DataAccess.OpenConnection(function(conn:any) {
      conn.collection(collection).updateOne({_id : new mongodb.ObjectID(id)}, value, function(err:any, result:any) {
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

  public static delete(id: number): any {
    deferred = q.defer();
    DataAccess.OpenConnection(function(conn:any) {
      conn.collection(collection).deleteOne({_id : new mongodb.ObjectID(id)}, function(err:any, result:any) {
        DataAccess.CloseConnection();
        assert.equal(null, err);
        if(err) {
          deferred.reject(new Error(JSON.stringify(err)));
        } else {
          deferred.resolve(result);
        }
      })
    });
  }
}

export {BaseAccess as BaseDataAccess};
