import { PubSub } from 'graphql-subscriptions'
import PotRecord from '../pot-record.dto'
import { NEW_INCOMING_MEASUREMENT } from './events'
import mockMeasurement from './pot-measurement.mock'
import pubsub from '../../server/pubsub'

function delay(i: number) {
    setTimeout(() => {
        pubsub.publish(NEW_INCOMING_MEASUREMENT, {
          getPotRecordsIRT: mockMeasurement()
        });
    }, 1000 * i);
}

export default {
    Subscription: {
      getPotRecordsIRT: {
          subscribe: (_: any, args: {id: String}, { pubsub }: { pubsub: PubSub}) => {
            for (let i=0; i<10; i++) {
                delay(i);
             }
            return pubsub.asyncIterator(NEW_INCOMING_MEASUREMENT)
          }
      }
    }
  }