import graphql_ from 'graphql/index.js'

import Books from './models/books'
import Authors from './models/authors'

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql_

// mock data -- start
// import {
//     books
// } from './mocks'
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
        },

        author: {
            type: AuthorType,
            async resolve(parent, args, context) {
                let ret = await Authors.findByPk(parseInt(parent.author))
                return ret
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {}
        }
    })
})

const BookPaginationType = new GraphQLObjectType({
    name: 'BookPagination',
    fields: () => ({
        datas: {
            type: new GraphQLList(BookType)
        },
        total: {
            type: GraphQLInt
        },
        current: {
            type: GraphQLInt
        },
        pageSize: {
            type: GraphQLInt
        },
        totalPage: {
            type: GraphQLInt
        }
    })
})

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
                let ret = await Books.findByPk(parseInt(args.id));
                return ret;
            }
        },
        books: {
            type: BookPaginationType,
            args: {
                page: {
                    type: GraphQLInt,
                    defaultValue: 1
                },
                pageSize: {
                    type: GraphQLInt,
                    defaultValue: 10
                }
            },
            async resolve(parent, args, context) {
                let ret = await Books.findAndCountAll({
                    limit: args.pageSize,
                    offset: (args.page - 1) * args.pageSize
                })

                return {
                    datas: ret["rows"],
                    total: ret["count"],
                    current: args.page,
                    pageSize: args.pageSize,
                    totalPage: Math.ceil(ret["count"] / args.pageSize)
                };
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {

            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                pic: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent, args, context) {
                let ret = await Books.create({
                    author: args.authorId,
                    name: args.name,
                    picture: args.pic,
                    create_time: new Date()
                })

                return ret
            }
        }
    }
});


export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});