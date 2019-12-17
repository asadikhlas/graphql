exports = module.exports = function (app, mongoose) {

    const UserModel = app.db.models.User;

    const resolvers = {
        Query: {
            getAllUsers: async (root, userObj, context) => {
                try {
                    const users = await UserModel.find({})
                    if (!users.length) {
                        throw new Error("NO user Found")
                    }
                    return users
                }
                catch (error) {
                    return Error(error.message)
                }
            }
        },

        Mutation: {
            addUser: async (root, userObj, context) => {
                const { username, password, email } = userObj
                try {
                    const newUser = await UserModel({ username, password, email }).save()
                    if (!newUser) {
                        throw new Error("Cannot save User")
                    }

                    return newUser
                } catch (error) {
                    throw Error(error.message)
                }
            }
        }
    }
    app.graphql.resolvers.push([resolvers])
}