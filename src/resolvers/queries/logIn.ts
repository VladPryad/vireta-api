import axios from 'axios';
import { AccountService } from '../../services.registry';
interface  AuthInfo {
    isLoggedIn: Boolean,
    token: String,
    login: String,
    id: String
}

export default {
    Query: {
        logIn: async (_: any, args: {username: string, password: string} ): Promise<AuthInfo> => {

          const res = await axios.get<AuthInfo>( `${AccountService.url}/account`, {
              params: {
                username: args.username,
                password: args.password
              }
          });
          if(!res.data) throw Error("404 Not found");

          return res.data;
      }
    }
  }