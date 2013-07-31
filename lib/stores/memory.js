
var Store = require('./_base');

var MemoryStore = module.exports = function(config) {
	Store.apply(this, arguments);

	this.storage = { };
};

MemoryStore.prototype = new Store();

// --------------------------------------------------------

MemoryStore.prototype._return = function(value) {
	if (this.config.syncMode) {
		return value;
	}

	var promise = new oath();
	process.nextTick(function() {
		promise.resolve(value);
	});
	return promise;
};

// --------------------------------------------------------

MemoryStore.prototype.get = function(key) {
	return this._return(this.storage[key]);
};

MemoryStore.prototype.set = function(key, value) {
	return this._return(this.storage[key] = value);
}
