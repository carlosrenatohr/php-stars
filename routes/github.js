/**
 * Created by carlosrenato on 01-19-17.
 */
var express = require('express');
var githubApi = require('github');
var http = require('http');
var request = require('request');
var router = express.Router();

var options = {
    baseUrl: 'https://api.github.com/',
    qs: {'per_page': 100, page: 1, q: 'language:php', 'sort': 'stars', 'order': 'desc'},
    // qs: {},
    method: 'get',
    // uri: '/users/honchkrow1995/repos',
    uri: '/search/repositories',
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Awesome-Octocat-App'
    }
};
router.get('/repos', function (req, res) {
    request(options, function(err, response, body) {
        if (err) {
            res.send(err);
        } else {
            var nrepos = [];
            var repos = JSON.parse(body);
            repos = repos.items;
            for(var i in repos) {
                var me = repos[i];
                nrepos.push({'name': me.full_name, 'stars': me.stargazers_count, 'id': me.id});
            }
            res.send(nrepos);
            // res.send('total is:' + info.length);
        }
    });
});

var github = new githubApi({
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    },
    // Promise: require('bluebird'),
    // followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    // timeout: 5000
});

router.get('/', function(req, res, next) {

    github.authenticate({
        type: "basic",
        username: 'honchkrow1995',
        password: 'angmamoswine1995'
    });
    var repos = github.repos.getAll({
        visibility: 'all'
    });
    res.send(repos);
    // res.send('done');
    // github.authorization.create({
    //     scopes: ["user", "public_repo", "repo", "repo:status", "gist"],
    //     note: "what this auth is for",
    //     note_url: "http://url-to-this-auth-app",
    //     headers: {
    //         "X-GitHub-OTP": "two-factor-code"
    //     }
    // }, function(err, resp) {
    //     if (resp.token) {
    //         //save and use res.token as in the Oauth process above from now on
    //         res.send(resp);
    //     } else {
    //         res.send(err);
    //     }
    // });
    // res.send('yaa');
    // res.render()
});

module.exports = router;
