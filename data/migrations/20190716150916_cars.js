exports.up = function(knex) {
	return knex.schema.createTable("cars", tbl => {
		// add a primary key named id, integer, auto-increment
		tbl.increments();
		// other columns
		tbl
			.string("VIN", 17)
			.unique()
			.notNullable();
		tbl.string("Make");
		tbl.string("Model");
		tbl.integer("Mileage");
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("cars");
};
