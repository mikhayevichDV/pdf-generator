import { Logger } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

import { Config } from '@core/config';

class PrestartSQL {
  static logger: Logger = new Logger(PrestartSQL.name);
  private _client: DataSource;
  private readonly _dbConfig: DataSourceOptions = Config.get.typeORMOptions;

  async execute(): Promise<void> {
    await this._connection();
    await this._createDBIfNotExists();
    await this._disconnect(0);
  }

  private async _createDBIfNotExists(): Promise<void> {
    try {
      await this._client.query(
        `CREATE DATABASE IF NOT EXISTS ${this._dbConfig.database}`,
      );

      PrestartSQL.logger.log('Project DB already exists.');
    } catch (e) {
      PrestartSQL.logger.error(`QUERY FAILED: ${e}`);
      await this._disconnect(1);
    }
  }

  private async _disconnect(code: number): Promise<void> {
    await this._client.destroy();
    process.exit(code);
  }

  private async _connection(): Promise<void> {
    this._client = new DataSource(this._dbConfig);

    try {
      await this._client.initialize();
      PrestartSQL.logger.log('Connected');
    } catch (e) {
      PrestartSQL.logger.error(
        `CONNECTION ERROR: ${e}`.replace(' error: ', ' '),
      );
      await this._disconnect(1);
    }
  }
}

new PrestartSQL().execute();
