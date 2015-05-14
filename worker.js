var CronJob = require('cron').CronJob;
var request = require('request');

var updateTime;

var job = new CronJob('0 0,10,20,30,40,50 * * * *', function() {
  request.get({
    url: 'http://www.tqyb.com.cn/data/gzWeather/obtDatas.js',
  }, function(err, res, body) {
    var time = body.match(/\/\*@cdate\:(.*)\*\//)[1];
    if (time===updateTime) return console.log('not updated yet');
    else {
      updateTime = time;
      request.post({
        url: 'https://hook.bearychat.com/=bw5Mw/incoming/9b00803217bbcc88077f2f2091da2b0d',
        json: true,
        body: {text:body}
      });
    }
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
