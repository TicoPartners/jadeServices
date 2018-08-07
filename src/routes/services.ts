/// <reference path='../typings/tsd.d.ts' />

"user strict";
import { CustomerDataAccess } from './../data/customer';
import { StudentDataAccess } from './../data/student';
import * as Express from "express";

module Route {
  export class ServiceRouting {
    all(req: Express.Request, res: Express.Response, next: Express.NextFunction){
      res.json("{title:'index', message:'All: Index'}");
    }

    list(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
      CustomerDataAccess.getAll().then((result : any) => {
        res.json(result);
      });
    }

    find(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
      console.log('start find');
      //res.json(StudentDataAccess.find());
      StudentDataAccess.find().then((result : any) => {
        res.json(result);
      });
    }

  }
}

export = Route;
