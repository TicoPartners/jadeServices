"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var logDir = 'logs';
var env = process.env.NODE_ENV || 'development';
var date = moment(new Date()).format("MMDDYYYY");
var tsFormat = function () { return (new Date()).toLocaleTimeString(); };
console.log(date);
console.log(tsFormat);
