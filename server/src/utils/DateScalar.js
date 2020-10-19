import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const dateScalarResolver = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type -- the date will be returned in this specific format: yyyy-MM-dd',
    parseValue(value) {
      return formatDate(value);
    },
    serialize(value) {
      return formatDate(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
        return formatDate(ast.value);
      }
      return null;
    },
  }),
};

function formatDate(value) {
  return new Date(value).toISOString().split('T')[0];
}

export const dateScalar = {
  resolvers: [dateScalarResolver]
}