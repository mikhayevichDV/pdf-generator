import { UserEntity } from '@entities/user';
import { DEFAULT_PASSWORD } from '@fixtures/models';

export const USERS_FIXTURES: Partial<UserEntity>[] = [
  {
    id: 'ec0b9119-e2fb-43b5-9ad3-6b085fd11886',
    email: 'dima.mikhayevich@mail.ru',
    firstName: 'Dzmitry',
    lastName: 'Mikhayevich',
    password: DEFAULT_PASSWORD,
    image: '',
    pdf: '',
  },
];
