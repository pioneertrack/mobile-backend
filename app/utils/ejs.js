var Promise = require('bluebird');
var fs = require('fs');
var ejs = require('ejs');

function toHTML(ejsTemplateURL, data) {
    return new Promise(function (resolve, reject) {
        fs.readFile(ejsTemplateURL, 'utf8', function (error, response) {
            if (error) {
                console.log("ddd");
                reject(error);
            } else {
                var html = ejs.render(response, data);
                resolve(html);
            }
        });
    });
}

module.exports = {
    toHTML: toHTML
};