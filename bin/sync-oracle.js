var mongoose = require('mongoose'), 
    Oracle = require('../src/models/oracle'),
    stream = Oracle.synchronize(),
    count = 0;

var mongoConnection = process.env.MONGODB_CONNECTIONSTRING || 'mongodb://localhost/mtgio';
mongoose.connect(mongoConnection);

stream.on('data', function(err, doc) {
  process.stdout.write(count + '\r');
  count++;
});

stream.on('close', function() {
  console.log('indexed ' + count + ' documents!');
});

stream.on('error', function(err) {
  console.log(err);
});
