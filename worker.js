var CronJob = require('cron').CronJob;
var request = require('request');

var job = new CronJob('00 * * * * 1-5', function() {
  request.post({
    url: 'https://hook.bearychat.com/=bw5Mw/incoming/9b00803217bbcc88077f2f2091da2b0d',
    json: true,
    body: {text:new Date()}
  });
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
  }, function () {
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */
);