import graphql_ from 'graphql/index.js'

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql_

// mock data -- start
import {
    books
} from './mocks'
// mock data -- end

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args, context) {
                let rets = await context.database.query("select * from books where id=" + parseInt(args.id));
                return rets;
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});