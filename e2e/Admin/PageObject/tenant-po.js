var constants = require('./constants');
var request = require('request');
const config = constants.dict;

var commentCount = 0;
var typeACount = 0;
var typeBCount = 0;
var typeCCount = 0;
const commentArray = [];

const server = process.argv[6];
const sinceDateTime = process.argv[7];
const accessToken = process.argv[8];

function _getOptions(pageNumber) {
    var url = "https://api.github.com/repos/" + config.repoAuthor + "/" + server +
        "/pulls/comments?page=" + pageNumber + "&since='" + sinceDateTime + "'";

    return {
        url: url,

        headers: {
            'User-Agent': 'request',
            Authorization: "token " + accessToken
        },
        method: 'GET',
    };
};

function createTenant() {

        if (!error && response.statusCode === 200) {
            var currentPageJson = JSON.parse(body);

            for (var key in currentPageJson) {
                var commentBody = currentPageJson[key]['body'];
                if (commentBody.startsWith(config.typeAComment)) {
                    typeACount++;
                }
                else if (commentBody.startsWith(config.typeBComment)) {
                    typeBCount++;

                }
                else if (commentBody.startsWith(config.typeCComment)) {
                    typeCCount++;

                }
            }

            var joinedRepos = incomingJson.concat(currentPageJson);
            commentCount += Object.keys(currentPageJson).length;

            if (response.headers.link) {
                var linkData = response.headers.link;
                if (!(linkData.includes('rel="next"'))) {
                    commentArray.push(commentCount, typeACount, typeBCount, typeCCount);
                    console.log("GITHUB metric 1 in order is: " + commentArray);
                    resolve(commentArray);
                    //return;
                } else {
                    pageNumber++;
                    placeRequest(pageNumber, joinedRepos, resolve);
                }
            }
            else {
                commentArray.push(commentCount, typeACount, typeBCount, typeCCount);
                console.log("GITHUB metric in order is: " + commentArray);
                resolve(commentArray);
            }
        }
        else {
            console.log('Some error occurred!');
        }

}

/**
 * This places a request to the GITHUB GET comments REST API.
 * getOptions() forms the URL and its required headers.
 * The access token is a persona access token generated from https://github.com/settings/tokens
 * @param pageNumber<number> This accepts and denoted what page number in API is to be called.
 * @param incomingJson<JSON> This accepts a JSON of the previous API page.
 */
function getGitHubMetric(pageNumber, incomingJson) {
    return new Promise(function(resolve, reject) {
        placeRequest(pageNumber, incomingJson, resolve);
    });
}

module.exports.getGitHubMetric = getGitHubMetric;
