import graphql_ from 'graphql/index.js'

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql_

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                // code to get data from db / other source

            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});