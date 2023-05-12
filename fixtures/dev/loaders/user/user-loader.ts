import { UserEntity } from '@entities/user';
import { AbstractLoader, IRelationsOptions } from '@fixtures/abstract-loader';
import { USERS_FIXTURES } from '@fixtures/dev/data/user';
import { EnvironmentType } from '@models/enum';

export class UsersLoader extends AbstractLoader<UserEntity> {
  entity: new () => UserEntity = UserEntity;

  data: Partial<UserEntity>[] = USERS_FIXTURES;

  environments: EnvironmentType[] = [EnvironmentType.Development];

  relations: IRelationsOptions[] = [];
}
