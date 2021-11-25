/* eslint-disable @typescript-eslint/no-unused-vars */
export interface QueryOptions {
  where?: any;
  select?: any;
  include?: any;
  order?: any;
  groupBy?: any;
}

export interface RepositoryBaseMethods<T> {
  create(item: T): T | Promise<T>;
  update(criteria: Partial<T>, fields: Partial<T>): void;
  delete(criteria: QueryOptions): boolean | Promise<boolean>;
  createOrUpdate(item: T): Promise<T | null | undefined>;
  find(criteria: QueryOptions): Promise<T[]>;
  findByIds(
    ids: unknown[],
    criteria: QueryOptions,
  ): Promise<T[] | null | undefined>;
  findOne(
    criteria: QueryOptions,
  ): Promise<T | null | undefined>;
  findById(id: number): Promise<T | null | undefined>;
}

export abstract class RepositoryBase<T, R> implements RepositoryBaseMethods<T> {
  constructor(protected repository: R) {
    this.repository = repository;
  }

  /**
   * Creates a new entity instance.
   */
  create(_item: T): T | Promise<T> {
    throw new Error('Method `create` not implemented.');
  }

  /**
   * Deletes entities by a given criteria.
   */
  delete(_criteria: T): boolean | Promise<boolean> {
    throw new Error('Method `delete` not implemented.');
  }

  /**
   * Finds entities that match given options.
   */
  find(_criteria: QueryOptions): Promise<T[]> {
    throw new Error('Method `find` not implemented.');
  }

  /**
   * Finds entities by ids.
   * Optionally find options can be applied.
   */
  findByIds(
    _ids: unknown[],
    _criteria?: QueryOptions,
  ): Promise<T[] | null | undefined> {
    throw new Error('Method `findByIds` not implemented.');
  }

  /**
   * Finds first entity that matches given options.
   */
  findOne(
    _criteria: QueryOptions,
  ): Promise<T | null | undefined> {
    throw new Error('Method `findOne` not implemented.');
  }

  /**
   * Finds first entity by the id.
   */
  findById(_id: number): Promise<T | null | undefined> {
    throw new Error('Method `findById` not implemented.');
  }

  /**
   * Updates entity partially. Entity can be found by a given conditions.
   */
  update(
    _criteria: Partial<T>,
    _fields: Partial<T>,
  ): Promise<T | null | undefined> {
    throw new Error('Method `update` not implemented.');
  }

  /**
   * Creates or updates entity. Entity can be found by a given conditions.
   */
  createOrUpdate(_item: T): Promise<T | null | undefined> {
    throw new Error('Method `createOrUpdate` not implemented.');
  }
}
