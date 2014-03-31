var mongoose = require('mongoose'), 
    Oracle = require('../src/models/oracle'),
    stream = Oracle.synchronize(),
    count = 0;

mongoose.connect('mongodb://localhost/mtgio');

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
