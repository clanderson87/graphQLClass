const express = require('express');
const expressGraphQL = require('express-graphql');


const app = express();

app.use('/graphql', expressGraphQL({
  graphiql: true //only intended for dev servers
}));

app.listen(4000, () => {
  console.log("listening");
});