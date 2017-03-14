const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString },
    firstName: {type: GraphQLString}, //triple check the captialization on these type declarations
    age: {type: GraphQLInt}
  }
}); // this is not the schema itself, but this is the GraphQL schema blueprint.