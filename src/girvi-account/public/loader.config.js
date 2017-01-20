'use strict';

window.onload = function () {
	var systemLocate, hashData, replaceAll, loadJSON;
	// Store original definition reference
	systemLocate = System.locate;

    replaceAll = function(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    };

    loadJSON = function(path, successCallback, errorCallback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (successCallback) {
                        successCallback(JSON.parse(xhr.responseText));
                    }
                } else {
                    if (errorCallback) {
                        errorCallback(xhr);
                    }
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    };

    loadJSON('scripts/cacheBusters.json', function (response) {
        hashData = response;

        System.locate = function(load) {
            var System = this,
                bust, hash;
            return Promise.resolve(systemLocate.call(this, load)).then(function(address) {

                if (hashData) {
                    hash = hashData[replaceAll(address.slice(address.indexOf('static')), '/', '\\')] ? 
                        hashData[replaceAll(address.slice(address.indexOf('static')), '/', '\\')] : 
                        hashData[address.slice(address.indexOf('static'))];
                    bust = hash ? '?bust=' + hash : undefined;
                }

                if (address.indexOf('.css.js') > -1) {
                    address = address.slice(0, address.indexOf('.js'));
                }

                if (address.indexOf('bust') > -1 ||
                    address.indexOf('json') > -1) {
                    return address;
                }
                return bust ? address + bust : address;
            });
        };
        System.import('scripts/main');
    }, function (xhr) {
        console.log('Unable to load cachebuster json file : ' + xhr.err);
    });
};