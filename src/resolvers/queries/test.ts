export default {
    Query: {
      hello(_: any, args: {name: string} ): String {
        return `Hello ${args.name}`;
      }
    }
  }