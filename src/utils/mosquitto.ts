import * as fs from "fs";

const KEY = fs.readFileSync('/etc/keys/client.key');
const CERT = fs.readFileSync('/etc/keys/client.crt');
const CAfile = [fs.readFileSync('/etc/keys/ca.crt')];

const options = {
  host: 'almondhydroponics.com',
  port: 8883,
  protocol: 'mqtts',
  protocolId: 'MQIsdp',
  ca: CAfile,
  key: KEY,
  cert: CERT,
  secureProtocol: 'TLSv1_method',
  protocolVersion: 3
};
