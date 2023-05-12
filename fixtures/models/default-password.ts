import { Config } from '@core/config';

import * as bcrypt from 'bcrypt';

export const DEFAULT_PASSWORD = bcrypt.hashSync('defaultPass', Config.get.hashSalt);
