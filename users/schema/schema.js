const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList, 
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    products: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString }, //triple check the captialization on these type declarations
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
    }
  })
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
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => resp.data); //trimming the {data:}
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }  
      },
      resolve(parentValue, { firstName, age }){
        return axios.post(`http://localhost:3000/users`, { firstName, age })
          .then(resp => resp.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});

//Below is a example query. Strings provided to the query as args on the RootQuery need to be "" not ''!!
/*
{
  user(id: "25") { 
    id,
    firstName,
    age,
    company {
      name,
      products
    }
  }
}

notice how this matches up to the fields object of RootQuery, with the args object provided to user().
*/