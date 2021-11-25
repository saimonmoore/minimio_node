import type { Record, RecordResponse } from './type';
// import { utcDate, parseJsonField } from '../../utils/presenterHelpers';

const presenter = (originalRecord: Record): RecordResponse => {
  return { id: originalRecord.id, title: originalRecord.title };
};

class CollectionPresenter {
  collection: Record[];
  total: number;

  constructor(records: Record[]) {
    this.collection = records.map((record: Record) =>
      presenter(record),
    );
    this.total = this.collection.length;
  }
  render() {
    const { total, collection } = this;

    return { total, collection };
  }
}

class Presenter {
  record: Record;

  constructor(record: Record) {
    this.record = record;
  }

  render() {
    const { record } = this;

    return { record: presenter(record) };
  }
}

export { CollectionPresenter, Presenter };
