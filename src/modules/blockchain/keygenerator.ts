import { ec } from 'elliptic';

const elliptic = new ec('secp256k1');

const key = elliptic.genKeyPair();

const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');


