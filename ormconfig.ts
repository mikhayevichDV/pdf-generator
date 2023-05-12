import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { DataSource } from 'typeorm';

import { Config } from '@core/config';

const folder = join(__dirname, 'migrations');

if (!existsSync(folder)) {
  mkdirSync(folder);
}

const migrations = readdirSync(folder).reduce((acc: FunctionConstructor[], migration: string) => {
  acc.push(
    ...Object.values(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(join(folder, migration)) as FunctionConstructor[],
    ),
  );

  return acc;
}, []);

export default new DataSource({
  ...Config.get.typeORMOptions,
  migrations,
});
