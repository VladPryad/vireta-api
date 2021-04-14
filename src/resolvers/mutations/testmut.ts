export default {
    Mutation: {
      helloMut(_: any, args: {name: string} ): String {
        return `Hello Mutation ${args.name}`;
      }
    }
  }