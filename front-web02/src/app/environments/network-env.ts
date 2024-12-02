import { projName } from "./project-env"
import { IMqttServiceOptions } from "ngx-mqtt";

export const MqttWsConfig = {
    connection: <IMqttServiceOptions>{
        hostname: 'broker.emqx.io',
        port: 8083, // emqx 8083 for ws, 8084 for wss
        path: '/mqtt', // not a part of the topic 
        protocol: 'ws',
        clean: true, // Retain session
        connectTimeout: 4000, // Timeout period
        reconnectPeriod: 4000, // Reconnect period
        // Authentication information
        // clientId: 'mqttx_597046f4',
        // username: 'emqx_test',
        // password: 'emqx_test',
    },
    pubTopic: `api/v1/Respect/report`,
    subBackendTopic: `mqtt/v1/${projName}/backend/dbUpdated`,
    commandTopic: `mqtt/v1/${projName}/command/devices/`
};

export const ApiConfig = {
    url: `http://localhost:3000/api/v1/${projName}`,
}