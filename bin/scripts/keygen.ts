import { execSync } from 'child_process';
import * as fs from 'fs';

const DIRECTORY = './keys';
const exist = fs.existsSync(DIRECTORY);

const generate = (): void => {
  execSync(
    `openssl genpkey -algorithm RSA -out keys/key.pem -pkeyopt rsa_keygen_bits:3072`,
  );
  execSync(`openssl rsa -in keys/key.pem -pubout -out keys/key.pub`);
};

if (!exist) {
  fs.mkdirSync(DIRECTORY);
}

generate();
