import { Record } from './type';
import { AppError } from '../../errors';

class Service {
  static createRecord = (params: any) => new Service().create(params);

  create(_params: any) {
    try {
      console.log(_params);
      return { id: 1 } as Record;
    } catch (exception) {
      throw new AppError(exception);
    }
  }
}

export default Service;
