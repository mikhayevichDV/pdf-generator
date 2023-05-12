import type { DeepPartial, EntityManager, Repository } from 'typeorm';
import { Logger, Type } from '@nestjs/common';

import type { AbstractClassType, ClassType } from '@models/types';
import { Config } from '@core/config';
import { EnvironmentType } from '@models/enum';

export interface IRelationsOptions<T = any, K = any> {
  relativeEntity: ClassType<T> | AbstractClassType<T>;
  relationKey: keyof K;
}

interface IRelationEntity {
  relationKey: string;
  relativeEntities: any;
}

export abstract class AbstractLoader<T extends object> {
  protected entityManager: EntityManager;

  private readonly _currentEnv: EnvironmentType = Config.get.environment;

  private _logger: Logger;

  setEntityManager(entityManager: EntityManager): this {
    this.entityManager = entityManager;

    return this;
  }

  abstract get entity(): Type<T>;

  abstract get data(): Array<T | Partial<T> | DeepPartial<T>>;

  abstract get environments(): EnvironmentType[];

  abstract get relations(): IRelationsOptions[];

  async execute(): Promise<void> {
    if (!this.environments.includes(this._currentEnv)) {
      return;
    }

    this._logger = new Logger(this.entity.name);

    const repository = this.entityManager.getRepository(this.entity);

    if (!repository) {
      throw Error(`Not found repository for '${this.entity.name}' entity.`);
    }

    const [, , update] = process.argv;

    await (this.relations.length
      ? this.executeWithRelations(repository, !!update)
      : this.defaultExecute(repository, !!update));

    this._logger.verbose('Successfully loaded.');
  }

  protected async filterExistRecords(repository: Repository<T>): Promise<(T | Partial<T> | DeepPartial<T>)[]> {
    const { DBValues } = await repository
      .createQueryBuilder('repository')
      .select('array_agg(repository.id)', 'DBValues')
      .getRawOne();

    return this.data.filter((v: T) => !DBValues?.includes(v?.['id']));
  }

  protected async defaultExecute(repository: Repository<T>, isUpdate: boolean): Promise<void> {
    const data = isUpdate ? await this.filterExistRecords(repository) : this.data;

    for (const item of data) {
      try {
        await repository.insert(item as T);
      } catch (e) {
        throw e;
      }
    }
  }

  protected async executeWithRelations(repository: Repository<T>, isUpdate: boolean): Promise<void> {
    const data = isUpdate ? await this.filterExistRecords(repository) : this.data;

    for (const item of data) {
      const createdRelativeEntities: IRelationEntity[] = [];

      for (const { relativeEntity, relationKey } of this.relations) {
        const relativeRepository = this.entityManager.getRepository(relativeEntity);

        const relativeEntities = Array.isArray(item[relationKey])
          ? item[relationKey].map((r: DeepPartial<any>) => relativeRepository.create(r))
          : relativeRepository.create(item[relationKey]);

        createdRelativeEntities.push({
          relationKey: relationKey as string,
          relativeEntities,
        });
        await relativeRepository.save(relativeEntities);
      }

      const data = { ...(item as T) } as DeepPartial<T>;

      createdRelativeEntities.forEach((e: IRelationEntity) => (data[e.relationKey] = e.relativeEntities));

      const createdMainEntity = repository.create(data);

      await repository.save(createdMainEntity as DeepPartial<T>);
    }
  }
}
