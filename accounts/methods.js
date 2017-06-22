import { AsyncStorage } from 'react-native';
import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';
import io from 'socket.io-client';

let socket = io('http://192.168.5.118:3030', { transports: ['websocket'] });
let app = feathers();
app.configure(hooks());
app.configure(socketio(socket, {timeout: 10000}));
app.configure(authentication({ storage: AsyncStorage }));

module.exports = {
  accounts: {
    signup: function(accInfo) {
      app.io.emit('signup', accInfo);
    }
  },
  subscribe(val, callback) {
    if(val === 'signup') {
      app.io.on(val, (res)=>{
        callback(res)
      });
    }
  },
}
