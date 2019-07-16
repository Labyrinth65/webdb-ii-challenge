const db = require("../dbConfig.js");

module.exports = {
	getAll: function() {
		return db("cars");
	},
	getById: function(id) {
		return db("cars")
			.where("id", id)
			.first();
	},
	insert: function(car) {
		return db("cars")
			.insert(car)
			.then(ids => {
				return this.getById(ids[0]);
			});
	},
	update: function(id, changes) {
		return db("cars")
			.where("id", id)
			.update(changes)
			.then(count => (count > 0 ? this.getById(id) : null));
	},

	remove: function(id) {
		return db("cars")
			.where("id", id)
			.del();
	}
};
