import { Controller } from '@nestjs/common';

export const createPrefixController =
  (prefix: string) =>
  (path?: string): ClassDecorator =>
    Controller(path ? [prefix, path].join('/') : prefix);
