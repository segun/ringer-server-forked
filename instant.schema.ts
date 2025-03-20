// Docs: https://www.instantdb.com/docs/modeling-data

import { i, id } from '@instantdb/admin';

const _schema = i.schema({
  entities: {
    user: i.entity({
      id: i.string().unique().indexed(),
      emailOrPhone: i.string().unique().indexed(),
      passcode: i.string(),
      location: i.string(),
      manualLocation: i.boolean()
    }),
  },
  links: {},
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema { }
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
