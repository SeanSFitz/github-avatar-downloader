require('dotenv').config();
var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;

var args = process.argv.slice(2);
var repo = '';
var owner = '';

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


function downloadImageByURL(url, filePath, login) {

  mkdirp(getDirName(filePath), function (err) {
    if (err) throw err;

    request.get(url)
      .on('error', function (err) {
        throw err;
      })
      .on('response', function (response) {
        console.log(`Avatar downloaded for ${login}.`)
      })
      .pipe(fs.createWriteStream(filePath));

  });

};

function loopThroughResults (err, result) {
  console.log("Errors:", err);
  for (let contributor of result) {
    downloadImageByURL(contributor.avatar_url, './avatars/' + repo + '/' + contributor.login + '.jpg', contributor.login);
  }
};

function startProgram (args) {
  if (args.length !== 2) {
    console.log('Invalid number of arguments.');
    console.log("Required arguments are: <owner> <repo>");
    return;
  }

  owner = args[1];
  repo = args[0];

  getRepoContributors(owner, repo, loopThroughResults);

};

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

console.log(`Welcome to the GitHub Avatar Downloader!`);

startProgram(args);
