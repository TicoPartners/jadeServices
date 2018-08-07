"use strict";
var Utilities = (function () {
    function Utilities() {
    }
    Utilities.isValidCallBack = function (callback) {
        return ((callback !== undefined) && (callback !== null) && (callback instanceof Function));
    };
    Utilities.isValidObject = function (value) {
        return ((value !== undefined) && (value !== null) && (Utilities.isEmptyJson(value)));
    };
    Utilities.isValidCollection = function (value) {
        return ((value !== undefined) && (value !== null) && (value.length > 0));
    };
    ;
    Utilities.isEmptyJson = function (value) {
        return JSON.stringify(value) !== JSON.stringify({});
    };
    return Utilities;
}());
exports.Utilities = Utilities;
