import pubsub from '../../../server/pubsub';
import WebSocket, { OpenEvent, MessageEvent } from 'ws';
import { NEW_INCOMING_MEASUREMENT } from '../constants/events';
import { PotService } from '../../../services.registry';
import { MSG } from '../constants/serverEvents';

export default (): void => {

    const ws = new WebSocket(PotService.uriWS!);

    ws.onopen = (event: OpenEvent) => {
        ws.send("Pot Id From Client");
    }

    ws.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data.toString());

        console.log(message.event);

        if(message.event == MSG) {
            pubsub.publish(NEW_INCOMING_MEASUREMENT, {
                getPotRecordsIRT: message.payload
            });
        }
    }
}