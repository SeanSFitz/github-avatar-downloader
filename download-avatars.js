var request = require('request');

console.log(`Welcome to the GitHub Avatar Downloader!`);

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    "url": requestURL,
    "method": "GET",
    "headers": {
      'User-Agent': 'GitHub Avatar Download - Student Project'
    }
  };

  request(options, function (err, res, body) {
    var contibutors = JSON.parse(body);
    cb(err, contibutors);
  });
};

var GITHUB_USER = "SeanSFitz";
var GITHUB_TOKEN = "7880bc40d0ea572eb4fd38f5a85d8fa0e142e858";



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (let contributor of result) {
    console.log(`${contributor.avatar_url}`);
  }
});
