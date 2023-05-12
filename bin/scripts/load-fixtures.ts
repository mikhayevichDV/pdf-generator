import { Logger } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import type { AbstractLoader } from '@fixtures/abstract-loader';
import type { ClassType } from '@models/types';
import { Config } from '@core/config';
import { COMMON_LOADERS } from '@fixtures/common/loaders';
import { DEV_LOADERS } from '@fixtures/dev/loaders';
import { PROD_LOADERS } from '@fixtures/prod/loaders';

class FixtureLoader {
  readonly #loaders: ClassType<AbstractLoader<any>>[] = [
    ...COMMON_LOADERS,
    ...DEV_LOADERS,
    ...PROD_LOADERS,
  ];

  readonly #logger: Logger = new Logger(FixtureLoader.name);

  async execute(): Promise<void> {
    try {
      this.#logger.verbose('Run fixtures');

      const connection = await FixtureLoader.#createConnections();

      await connection.transaction(async (entityManager: EntityManager) => {
        for (const constructor of this.#loaders) {
          const loader = new constructor();

          await loader.setEntityManager(entityManager).execute();
        }
      });

      this.#logger.verbose('Fixtures successfully loaded.');

      process.exit(0);
    } catch (e) {
      console.log(e);

      this.#logger.error(
        `Failed loading fixtures. Error: message - ${
          e.message
        }, parameters - ${e.parameters?.join(', ')}.`,
      );

      process.exit(1);
    }
  }

  static async #createConnections(): Promise<DataSource> {
    const dataSource = new DataSource(Config.get.typeORMOptions);

    return dataSource.initialize();
  }
}

new FixtureLoader().execute();
