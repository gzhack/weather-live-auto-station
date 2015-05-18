var CronJob = require('cron').CronJob;
var request = require('request');
var _ = require('lodash');
var fs = require('fs');

var updateTime;

var isExist = function(str) {
  try{
    var fd = fs.openSync('./data/'+str, 'r');
    fs.closeSync(fd);
    return true;
  }catch(e) {
    return false;
  }
};

var job = new CronJob('0 '+ _.range(0, 60, 1).join(',') +' * * * *', function() {
  request.get({
    url: 'http://www.tqyb.com.cn/data/gzWeather/obtDatas.js',
  }, function(err, res, body) {
    var time = body.match(/\/\*@cdate\:(.*)\*\//)[1];

    if (!isExist(time)) {
      updateTime = time;

      fs.writeFile('./data/'+time, body, function(err) {
        request.post({
          url: 'https://hook.bearychat.com/=bw5Mw/incoming/9b00803217bbcc88077f2f2091da2b0d',
          json: true,
          body: {text:(err?('write file '+time+' failed'):(time+' saved'))}
        });
      })
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
