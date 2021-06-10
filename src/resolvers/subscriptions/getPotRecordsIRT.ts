import { PubSub } from 'graphql-subscriptions'
import PotRecord from '../pot-record.dto'
import { NEW_INCOMING_MEASUREMENT } from './constants/events'
import pubsub from '../../server/pubsub'
import getPotRecordsIRT from './handlers/getPotRecordsIRT'

export default {
    Subscription: {
      getPotRecordsIRT: {
          subscribe: (_: any, args: {id: String}, { pubsub }: { pubsub: PubSub}) => {
            getPotRecordsIRT(args.id);
            return pubsub.asyncIterator(NEW_INCOMING_MEASUREMENT)
          }
      }
    }
  }