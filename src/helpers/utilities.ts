"use strict"

class Utilities {
  public static isValidCallBack(callback:Function): boolean {
    return ((callback !== undefined) && (callback !== null) && (callback instanceof Function));
  }

  public static isValidObject(value:any): boolean {
    return ((value !== undefined) && (value !== null) && (Utilities.isEmptyJson(value)));
  }

  public static isValidCollection(value:any): boolean {
    return ((value !== undefined) && (value !== null) && (value.length > 0));
  };

  private static isEmptyJson(value:any): boolean {
    return JSON.stringify(value) !== JSON.stringify({});
  }
}

export {Utilities as Utilities};
