
/**
 * Self-contained short-life ID generating module
 *
 * Not guarenteed to be unique outside of a single instance of the module.
 */

var sechash = require('sechash');

var current = 0;
var storage = { };
var config = {
	length: 6,
	algorithm: 'sha1',
	salt: Math.random
};

exports.configure = function(conf) {
	Object.keys(conf).forEach(function(key) {
		config[key] = conf[key];
	});
};

exports.generate = function() {
	var key;
	var salt = config.salt;
	if (typeof salt === 'function') {
		salt = salt();
	}
	do {
		key = sechash.basicHash(config.algorithm, String(current++) + salt).slice(0, config.length);
	} while (storage.hasOwnProperty(key));
	storage[key] = null;
	return key;
};

exports.invalidate = function(key) {
	delete storage[key];
};

exports.store = function(value) {
	var key = exports.generate();
	storage[key] = value;
	return key;
};

exports.fetch = function(key) {
	return storage[key];
};

exports.fetchAndInvalidate = function(key) {
	var value = exports.fetch(key);
	exports.invalidate(key);
	return value;
};

