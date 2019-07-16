exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("cars")
		.truncate() // deletes data and resets the primary key back to 1
		.then(function() {
			// Inserts seed entries
			return knex("cars").insert([
				{
					VIN: "WBAKF9C52BE619303",
					Make: "BMW",
					Model: "3 Series",
					Mileage: 80000
				},
				{ VIN: "WAUDGAFL6DA095049", Make: "Audi", Model: "S4", Mileage: 60000 },
				{
					VIN: "5FNRL38679B039269",
					Make: "Honda",
					Model: "Odyssey",
					Mileage: 90000
				},
				{
					VIN: "JH4KA4531JC024340",
					Make: "Acura",
					Model: "Legend",
					Mileage: 210000
				}
			]);
		});
};
