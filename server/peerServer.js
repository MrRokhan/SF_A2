// peerServer.js
const { PeerServer } = require('peer');

const peerServer = PeerServer({
  port: 9000,
  path: '/peerjs'
});

console.log('PeerJS server running on port 9000');
