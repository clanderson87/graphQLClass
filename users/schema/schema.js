const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString }, //triple check the captialization on these type declarations
    age: { type: GraphQLInt }
  }
}); // this is not the schema itself, but the GraphQL schema blueprint.

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: { // this reads, IF looking for a user, PROVIDED an id, WILL RETURN a UserType
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {

      } //resolve's job is to go out and grab REAL data. parentValue will almost never be used. More info later.
        //args represents the args object above. the args argument in this case will be expected to have an id prop.
    }
  }
});