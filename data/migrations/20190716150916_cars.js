exports.up = function(knex) {
	return knex.schema.createTable("cars", tbl => {
		// add a primary key named id, integer, auto-increment
		tbl.increments("CarID");
		// other columns
		tbl
			.string("VIN", 17)
			.unique()
			.notNullable();
		tbl.string("Make").notNullable();
		tbl.string("Model").notNullable();
		tbl.integer("Mileage").notNullable();
		tbl.string("Transmission Type").defaultTo("unknown");
		tbl.string("Title Status").defaultTo("unknown");
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("cars");
};
