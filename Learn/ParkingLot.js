class ParkingLot {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    parkVehicle(vehicleNumber) {
        // Check if parking lot is full
        if (this.vehicles.length >= this.capacity) {
            console.log("Parking Lot is Full!");
            return;
        }

        // Check for duplicate vehicle
        if (this.vehicles.includes(vehicleNumber)) {
            console.log(`Vehicle ${vehicleNumber} is already parked.`);
            return;
        }

        this.vehicles.push(vehicleNumber);
        console.log(`Vehicle ${vehicleNumber} parked successfully.`);
    }

    removeVehicle(vehicleNumber) {
        const index = this.vehicles.indexOf(vehicleNumber);

        if (index === -1) {
            console.log(`Vehicle ${vehicleNumber} not found.`);
            return;
        }

        this.vehicles.splice(index, 1);
        console.log(`Vehicle ${vehicleNumber} removed successfully.`);
    }

    availableSpots() {
        const available = this.capacity - this.vehicles.length;

        console.log(`Available Spots: ${available}`);
        return available;
    }

    occupiedSpots() {
        console.log(
            `Occupied Spots: ${this.vehicles.length}/${this.capacity}`
        );
    }

    displayVehicles() {
        if (this.vehicles.length === 0) {
            console.log("Parking Lot is Empty.");
            return;
        }

        console.log("Parked Vehicles:");

        this.vehicles.forEach((vehicle, index) => {
            console.log(`${index + 1}. ${vehicle}`);
        });
    }

    status() {
        console.log("\n===== Parking Lot Status =====");
        console.log(`Capacity: ${this.capacity}`);
        console.log(`Occupied: ${this.vehicles.length}`);
        console.log(`Available: ${this.capacity - this.vehicles.length}`);
        console.log("Vehicles:", this.vehicles);
        console.log("==============================\n");
    }
}


const parkingLot = new ParkingLot(3);

parkingLot.parkVehicle("MH01AB1234");
parkingLot.parkVehicle("MH02CD5678");
parkingLot.parkVehicle("MH03EF9999");

parkingLot.displayVehicles();

parkingLot.parkVehicle("MH04GH1111");

parkingLot.availableSpots();

parkingLot.removeVehicle("MH02CD5678");

parkingLot.availableSpots();

parkingLot.displayVehicles();

parkingLot.status();