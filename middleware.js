const carsDB = require("./cars/carsModel.js");

module.exports = {
	checkCar,
	checkCarId
};

async function checkCarId(req, res, next) {
	try {
		const car = await carsDB.getById(req.params.id);
		if (car) {
			req.car = car;
			next();
		} else {
			res.status(404).json({ message: "Car ID Could Not Be Found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The car information could not be retrieved."
		});
	}
}

function checkCar(req, res, next) {
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({ message: "Missing Car Data" });
	const { VIN, Make, Model, Mileage } = req.body;
	if (!VIN || !Make || !Model || !Mileage)
		return res.status(400).json({
			message:
				"Please ensure information for VIN, Make, Model, and Mileage are included"
		});
	next();
}
