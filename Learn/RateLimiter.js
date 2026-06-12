class RateLimiter {
    constructor(limit, windowSizeInSeconds) {
        this.limit = limit;
        this.windowSize = windowSizeInSeconds * 1000; // ms

        // userId => [timestamps]
        this.users = new Map();
    }

    allowRequest(userId) {
        const currentTime = Date.now();

        if (!this.users.has(userId)) {
            this.users.set(userId, []);
        }

        const timestamps = this.users.get(userId);

        // Remove expired requests
        while (
            timestamps.length > 0 &&
            currentTime - timestamps[0] >= this.windowSize
        ) {
            timestamps.shift();
        }

        // Check limit
        if (timestamps.length >= this.limit) {
            console.log(
                `❌ Request Rejected for ${userId}`
            );
            return false;
        }

        timestamps.push(currentTime);

        console.log(
            `✅ Request Allowed for ${userId}`
        );

        return true;
    }

    getUserRequests(userId) {
        if (!this.users.has(userId)) {
            console.log("User not found");
            return;
        }

        console.log(
            `${userId} has ${
                this.users.get(userId).length
            } active requests`
        );
    }

    print() {
        console.log("\n===== RATE LIMITER =====");

        for (const [userId, timestamps] of this.users) {
            console.log(
                `${userId}: ${timestamps.length} requests`
            );
        }

        console.log("========================\n");
    }
}

const limiter = new RateLimiter(5, 60);

limiter.allowRequest("varun");
limiter.allowRequest("varun");
limiter.allowRequest("varun");
limiter.allowRequest("varun");
limiter.allowRequest("varun");

limiter.allowRequest("varun"); // Rejected

limiter.getUserRequests("varun");

limiter.print();