const axios = require('axios');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql');

//First type
const UnivType = new GraphQLObjectType({
    name: 'univ',
    fields: ()=> ({
        country: { type: GraphQLString },
        alpha_two_code: {type:GraphQLString },
        name: { type: GraphQLString },
        web_pages: { type: new GraphQLList(GraphQLString) },
        domains: { type: new GraphQLList(GraphQLString) }
    })
});



//root query

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        univ: {
            type: new GraphQLList(UnivType),
            resolve(parent, args){
                return axios.get('http://universities.hipolabs.com/search?country=Morocco')
                .then(res => res.data);
            }
        }
        ,
        univByCountry: {
            type: new GraphQLList(UnivType),
             args: {
                 country: {type: GraphQLString}
             },
            resolve(parent, args){
                if (args.country)
                 return axios.get('http://universities.hipolabs.com/search?country='+args.country)
                 .then(res => res.data);
                return axios.get('http://universities.hipolabs.com/search?country=Morocco')
                .then(res => res.data);

            }


        },
        univByName: {
            type: UnivType,
             args: {
                 name: {type: GraphQLString}
             },
            resolve(parent, args){
                if (args.name)
                 return axios.get('http://universities.hipolabs.com/search?name='+args.name)
                 .then(res => res.data);
                return axios.get('http://universities.hipolabs.com/search?name=""')
                .then(res => res.data);

            }

        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});