import { RepositoryBase, RepositoryBaseMethods, QueryOptions } from '../../repository/baseRepository';
import type { Record } from './type';

type PartialEntity = Partial<Record>;

export interface HyperCoreRepository<T> {
  create(item: T): T | Promise<T>;
  update(criteria: Partial<T>, fields: Partial<T>): void;
  delete(criteria: QueryOptions): boolean | Promise<boolean>;
  createOrUpdate(item: T): Promise<T | null | undefined>;
  find(criteria: QueryOptions): Promise<T[]>;
  findByIds(
    ids: unknown[],
    criteria?: QueryOptions,
  ): Promise<T[] | null | undefined>;
  findOne(
    criteria: QueryOptions,
  ): Promise<T | null | undefined>;
  findById(id: number): Promise<T | null | undefined>;
}

const getRepository = <EntityType>(): RepositoryBaseMethods<EntityType> => {
  // get Hyperbee for entity
  return {
    findOne: async (criteria: QueryOptions): Promise<EntityType | null | undefined> => {
      console.log(criteria);
      return undefined;
    },
    create(item: EntityType): EntityType | Promise<EntityType> {
      console.log(item);
      return {} as any;
    },
    delete(criteria: EntityType): boolean | Promise<boolean> {
      console.log(criteria);
      return false;
    },
    find(criteria: QueryOptions): Promise<EntityType[]> {
      console.log(criteria);
      return {} as any;
    },
    findByIds(
      ids: unknown[],
      criteria?: QueryOptions,
    ): Promise<EntityType[] | null | undefined> {
      console.log(ids, criteria);
      return {} as any
    },
    findById(id: number): Promise<EntityType | null | undefined> {
      console.log(id);
      return {} as any
    },
    update(
      criteria: Partial<EntityType>,
      fields: Partial<EntityType>,
    ): Promise<EntityType | null | undefined> {
      console.log(fields, criteria);
      return {} as any;
    },
    createOrUpdate(item: EntityType): Promise<EntityType | null | undefined> {
      console.log(item);
      return {} as any;
    }
  }
}

export class RecordRepository extends RepositoryBase<
  Record,
  HyperCoreRepository<Record>
> {
  constructor() {
    super(getRepository<Record>());
  }

  override findOne(
    options: QueryOptions,
  ): Promise<Record | null | undefined> {
    return this.repository.findOne(options) as Promise<
      Record | null | undefined
    >;
  }

  override find(options: QueryOptions): Promise<Record[]> {
    return this.repository.find(options);
  }

  override findByIds(
    ids: unknown[],
    criteria?: QueryOptions,
  ): Promise<Record[]> {
    return this.repository.findByIds(ids, criteria) as Promise<Record[]>;
  }

  override async update(
    criteria: PartialEntity,
    fields: PartialEntity,
  ): Promise<Record | null | undefined> {
    this.repository.update(criteria, fields);

    return this.repository.findOne({
      where: {
        id: criteria.id,
      }
    }) as Promise<Record | null | undefined>;
  }

  override create(
    item: PartialEntity,
  ): Record | Promise<Record> {
    return this.repository.create(item);
  }
}
