# users

### An Intro to GraphQL backends using [Express](http://expressjs.com) and [json-server](https://github.com/typicode/json-server).

This is a starter project using [GraphQL](http://graphql.org/), a query language that allows for surgical precision. GraphQL language simplifies some intracacies of REST conventions relating to deeply nested data, protects against overserving data and minimizes the necessary client side requests.


This small project is my first exposure to GraphQL, coded along with [StephenGrider's](https://github.com/StephenGrider/) fantastic [GraphQL course](https://www.udemy.com/graphql-with-react-course/learn/v4/content). It covers the basics of queries and mutations using GraphQL with an Express backend. In this app, we have full CRUD functionality relating to users and companies.

Though this is my first time using this tool, I could definately see myself using it as a middleware in the future. At first thought, in a denormalized NoSql database where data needs to be flat as possible, GraphQL could be implemented as a middleware to get the entire DB flatter without overexposing sensitive data. At the same time, I could also see it making more complex relationships much more practical and possible than they would be using standard REST patterns.