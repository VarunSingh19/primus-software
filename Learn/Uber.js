class User {
    constructor(id, name, location) {
        this.id = id;
        this.name = name;
        this.location = location;
    }
}

class Driver extends User {
    constructor(id, name, location) {
        super(id, name, location);

        this.available = true;
        this.totalEarnings = 0;
        this.completedRides = 0;
    }
}

class Passenger extends User {
    constructor(id, name, location) {
        super(id, name, location);

        this.totalRides = 0;
    }
}

class Ride {
    constructor(id, passenger, driver, pickup, destination) {
        this.id = id;
        this.passenger = passenger;
        this.driver = driver;

        this.pickup = pickup;
        this.destination = destination;

        this.status = "REQUESTED";

        this.distance = Math.abs(destination - pickup);

        this.fare = 0;
    }

    calculateFare() {
        const baseFare = 50;
        const perKm = 12;

        return baseFare + this.distance * perKm;
    }
}

class RideManager {
    constructor() {
        this.drivers = [];
        this.passengers = [];
        this.rides = [];

        this.rideId = 1;
    }

    registerDriver(driver) {
        this.drivers.push(driver);

        console.log(
            `Driver Registered: ${driver.name}`
        );
    }

    registerPassenger(passenger) {
        this.passengers.push(passenger);

        console.log(
            `Passenger Registered: ${passenger.name}`
        );
    }

    findNearestDriver(location) {
        let nearestDriver = null;
        let minDistance = Infinity;

        for (const driver of this.drivers) {
            if (!driver.available) continue;

            const distance = Math.abs(
                driver.location - location
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearestDriver = driver;
            }
        }

        return nearestDriver;
    }

    requestRide(passengerId, pickup, destination) {
        const passenger = this.passengers.find(
            p => p.id === passengerId
        );

        if (!passenger) {
            console.log("Passenger not found");
            return;
        }

        const driver =
            this.findNearestDriver(pickup);

        if (!driver) {
            console.log(
                "No drivers available"
            );
            return;
        }

        driver.available = false;

        const ride = new Ride(
            this.rideId++,
            passenger,
            driver,
            pickup,
            destination
        );

        this.rides.push(ride);

        console.log(
            `Ride Assigned:
Passenger: ${passenger.name}
Driver: ${driver.name}`
        );

        return ride.id;
    }

    startRide(rideId) {
        const ride = this.rides.find(
            r => r.id === rideId
        );

        if (!ride) {
            console.log("Ride not found");
            return;
        }

        ride.status = "STARTED";

        console.log(
            `Ride ${ride.id} started`
        );
    }

    completeRide(rideId) {
        const ride = this.rides.find(
            r => r.id === rideId
        );

        if (!ride) {
            console.log("Ride not found");
            return;
        }

        ride.status = "COMPLETED";

        ride.fare =
            ride.calculateFare();

        ride.driver.available = true;

        ride.driver.location =
            ride.destination;

        ride.driver.totalEarnings +=
            ride.fare;

        ride.driver.completedRides++;

        ride.passenger.totalRides++;

        console.log(`
Ride Completed

Passenger: ${ride.passenger.name}
Driver: ${ride.driver.name}
Distance: ${ride.distance} km
Fare: ₹${ride.fare}
`);
    }

    showDrivers() {
        console.log("\nDrivers:");

        for (const driver of this.drivers) {
            console.log({
                name: driver.name,
                location: driver.location,
                available: driver.available,
                earnings:
                    driver.totalEarnings
            });
        }
    }

    showRides() {
        console.log("\nRide History:");

        for (const ride of this.rides) {
            console.log({
                rideId: ride.id,
                passenger:
                    ride.passenger.name,
                driver:
                    ride.driver.name,
                status: ride.status,
                fare: ride.fare
            });
        }
    }
}



const manager = new RideManager();

manager.registerDriver(
    new Driver(
        1,
        "Raj",
        10
    )
);

manager.registerDriver(
    new Driver(
        2,
        "Aman",
        20
    )
);

manager.registerDriver(
    new Driver(
        3,
        "Vikram",
        5
    )
);

manager.registerPassenger(
    new Passenger(
        101,
        "Varun",
        8
    )
);

manager.registerPassenger(
    new Passenger(
        102,
        "Rohit",
        15
    )
);

const rideId =
    manager.requestRide(
        101,
        8,
        25
    );

manager.startRide(rideId);

manager.completeRide(rideId);

manager.showDrivers();

manager.showRides();