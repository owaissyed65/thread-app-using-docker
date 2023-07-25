const queries = {
    user : ()=>{return {firstName:'hello'}}
};
const mutation = {
     createUser: async (_:any,{}:{})=>{
        return "HEllo Created"
     }
};
export const resolvers = { queries, mutation };
