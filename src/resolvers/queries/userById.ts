import axios from 'axios';
import { AccountService } from '../../services.registry';
interface User {
  id: string
  login: string
  googleId: string
  password: string
}

export default {
    Query: {
        userById: async (_: any, args: {id: string} ): Promise<User> => {

          const res = await axios.get<User>( `${AccountService.url}/account/${args.id}`);
          if(!res.data) throw Error("404 Not found");

          return res.data;
      }
    }
  }