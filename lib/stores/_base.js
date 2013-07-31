


var Store = module.exports = function(config) {
	this.config = config;
};

Store.prototype.generate = function(conf) {
	conf = merge({ }, config, conf || { });
	
	var key;
	var salt = config.salt;
	
	if (typeof salt === 'function') {
		salt = salt();
	}
	
	do {
		key = sechash.basicHash(config.algorithm, String(current++) + salt).slice(0, config.length);
	} while (storage.hasOwnProperty(key));
	
	storage[key] = null;
	
	if (conf.useObjects) {
		key = new exports.Id(key);
	}
	
	return key;
};

Store.prototype.get = function(key) {
	console.error('short-id: Store::get - This method must be overriden by an inheriting class');
};

Store.prototype.set = function(key, value) {
	console.error('short-id: Store::set - This method must be overriden by an inheriting class');
};

Store.prototype.del = function(key) {
	console.error('short-id: Store::del - This method must be overriden by an inheriting class');
};

Store.prototype.exists = function(key) {
	console.error('short-id: Store::exists - This method must be overriden by an inheriting class');
}
