interface User {
    name: string
    googleId: string
    password: string
}

export default {
    Query: {
        userById(_: any, args: {id: string} ): User {
        return {
            name: `Hello ${args.id}`,
            googleId: "",
            password: ""
        }
      }
    }
  }