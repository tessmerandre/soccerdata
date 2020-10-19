import { taskTypeDefs } from './TaskTypeDef';
import { taskResolver } from './TaskResolver';

const task = {
  typeDefs: [taskTypeDefs],
  resolvers: [taskResolver],
};

export { task };