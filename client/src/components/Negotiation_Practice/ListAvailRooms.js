const accountSid = 'ACc35fecfd7876bfcda3873d9061a6bd23';
const authToken = '1c8e043755ef254db0a89e8847ce777a';
const client = require('twilio')(accountSid, authToken);

client.video.rooms.each({
  status: 'completed',
},
rooms => console.log(rooms.sid));
