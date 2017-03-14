const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema
} = graphql;

const users = [
  { id: '23', firstName: 'Bob', age: 23 },
  { id: '24', firstName: 'Bill', age: 24 },
  { id: '25', firstName: 'Buck', age: 25 },
  { id: '26', firstName: 'Biff', age: 26 },
  { id: '27', firstName: 'Benny', age: 73 },
  { id: '28', firstName: 'Berry', age: 83 }
]

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
        return _.find(users, {id: args.id});
      } //resolve's job is to go out and grab REAL data. parentValue will almost never be used. More info later.
        //args represents the args object above. the args argument in this case will be expected to have an id prop.
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})