import axios from 'axios';
import { PotService } from '../../services.registry';
import { rawRecordsToStandardMeasurement} from '../../utils/converter';
import RawRecordDTO from '../database-raw-record.dto'
import RecordDTO from '../pot-record.dto'


export default {
    Query: {
        recordsByPot: async (_: any, args: {id: String} ): Promise<RecordDTO> => {

          const res = await axios.get<[RawRecordDTO]>( `${PotService.url}/record/${args.id}`);
          if(!res.data) throw Error("404 Not found");

          return rawRecordsToStandardMeasurement(res.data);
      }
    }
  }