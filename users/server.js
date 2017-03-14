const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true //only intended for dev servers
}));

app.listen(4000, () => {
  console.log("listening");
});