"use strict";
var base_1 = require('./base');
var collection = 'student';
var StudentDataAccess = (function () {
    function StudentDataAccess() {
    }
    StudentDataAccess.find = function () {
        console.log('starting studentDataAccess');
        base_1.BaseDataAccess.setCollection(collection);
        base_1.BaseDataAccess.find().then(function (result) {
            console.log(result);
            return result;
        });
    };
    return StudentDataAccess;
}());
exports.StudentDataAccess = StudentDataAccess;
