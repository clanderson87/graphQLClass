const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema
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
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data); //trimming the {data:}
      } //resolve's job is to go out and grab REAL data. parentValue will almost never be used. More info later.
        //args represents the args object above. the args argument in this case will be expected to have an id prop.
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

//Below is a example query. Strings provided to the query (like on ln 49) need to be "" not ''!!
/*
{
  user(id: "25") { 
    id,
    firstName,
    age
  }
}

notice how this matches up to the fields object of RootQuery, with the args object provided to user() on ln 49.
*/