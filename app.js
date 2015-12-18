var cheerio = require('cheerio'),
    request = require('request'),
    fs = require('fs');
var stock = process.env.STOCK || '2330';

request.get('http://www.cnyes.com/twstock/ps_pv_time/' + stock + '.htm', function(err, respond, chunck){
  var $ = cheerio.load(chunck);
  var result = [];

  $('div.scroll > table > tr').each(function(){
    var subArray = [];
    $(this).children().each(function(){
      subArray.push($(this).text());
    });
    result.push(subArray);
  });

  fs.writeFile('./result.txt',JSON.stringify(result),function(){
    console.log('Done');
  });
});