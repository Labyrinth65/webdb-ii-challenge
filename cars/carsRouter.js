const express = require("express");

const carsDB = require("./carsModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const cars = await carsDB.getAll(req.query);
		res.status(200).json(cars);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The listing of cars could not be retrieved."
		});
	}
});

router.get("/:id", checkCarId, async (req, res) => {
	try {
		res.status(200).json(req.car);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The information for the car specified could not be retrieved."
		});
	}
});

router.post("/", checkCar, async (req, res) => {
	try {
		const car = await carsDB.insert(req.body);
		// const newcar = await carsDB.get(car.id);
		res.status(201).json(car);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "There was an error while adding the car to the database"
		});
	}
});

router.delete("/:id", checkCarId, async (req, res) => {
	try {
		const count = await carsDB.remove(req.params.id);
		if (count > 0) {
			res.status(200).json(req.car);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The car could not be removed from the database"
		});
	}
});

router.put("/:id", checkCarId, checkCar, async (req, res) => {
	try {
		const car = await carsDB.update(req.params.id, req.body);
		res.status(200).json(car);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The car requested could not be modified."
		});
	}
});

// custom middleware

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

module.exports = router;
