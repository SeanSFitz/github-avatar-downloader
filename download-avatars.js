var request = require('request');
var fs = require('fs');

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


function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log("Avatar downloaded")
    })
    .pipe(fs.createWriteStream(filePath));
};

var GITHUB_USER = "SeanSFitz";
var GITHUB_TOKEN = "7880bc40d0ea572eb4fd38f5a85d8fa0e142e858";

console.log(`Welcome to the GitHub Avatar Downloader!`);

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (let contributor of result) {
    console.log(`${contributor.avatar_url}`);
  }
});

downloadImageByURL("https://avatars3.githubusercontent.com/u/1615?v=3", "test");