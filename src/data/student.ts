import {BaseDataAccess} from './base';
import { Utilities } from './../helpers/utilities';

var collection:string = 'student';

class StudentDataAccess {

  public static find():any {
    console.log('starting studentDataAccess');
    BaseDataAccess.setCollection(collection);
    BaseDataAccess.find().then((result:any) => {
      console.log(result);
      return result;
    });
  }

}

export {StudentDataAccess as StudentDataAccess}
