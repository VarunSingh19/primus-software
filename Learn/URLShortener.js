class URLShortener {
    constructor() {
        this.urlDatabase = new Map();
        this.reverseLookup = new Map();

        this.baseUrl = "https://tiny.ly/";
        this.characters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }

    generateCode(length = 6) {
        let code = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(
                Math.random() * this.characters.length
            );

            code += this.characters[randomIndex];
        }

        return code;
    }

    createShortUrl(originalUrl, customAlias = null) {
        if (!originalUrl) {
            console.log("Invalid URL");
            return;
        }

        // Return existing short URL if already shortened
        if (this.reverseLookup.has(originalUrl)) {
            const existingCode =
                this.reverseLookup.get(originalUrl);

            return this.baseUrl + existingCode;
        }

        let shortCode;

        if (customAlias) {
            if (this.urlDatabase.has(customAlias)) {
                console.log("Alias already exists");
                return;
            }

            shortCode = customAlias;
        } else {
            do {
                shortCode = this.generateCode();
            } while (this.urlDatabase.has(shortCode));
        }

        this.urlDatabase.set(shortCode, {
            originalUrl,
            clicks: 0,
            createdAt: new Date(),
        });

        this.reverseLookup.set(
            originalUrl,
            shortCode
        );

        return this.baseUrl + shortCode;
    }

    expandUrl(shortUrl) {
        const shortCode =
            shortUrl.replace(this.baseUrl, "");

        if (!this.urlDatabase.has(shortCode)) {
            console.log("Short URL not found");
            return null;
        }

        const record =
            this.urlDatabase.get(shortCode);

        record.clicks++;

        return record.originalUrl;
    }

    getStats(shortUrl) {
        const shortCode =
            shortUrl.replace(this.baseUrl, "");

        if (!this.urlDatabase.has(shortCode)) {
            console.log("URL not found");
            return;
        }

        const data =
            this.urlDatabase.get(shortCode);

        console.log({
            shortUrl,
            originalUrl: data.originalUrl,
            clicks: data.clicks,
            createdAt: data.createdAt,
        });
    }

    deleteUrl(shortUrl) {
        const shortCode =
            shortUrl.replace(this.baseUrl, "");

        if (!this.urlDatabase.has(shortCode)) {
            console.log("URL not found");
            return;
        }

        const data =
            this.urlDatabase.get(shortCode);

        this.reverseLookup.delete(
            data.originalUrl
        );

        this.urlDatabase.delete(shortCode);

        console.log("URL deleted successfully");
    }

    listUrls() {
        console.log("\n===== URL DATABASE =====");

        if (this.urlDatabase.size === 0) {
            console.log("No URLs found");
            return;
        }

        for (const [code, data] of this.urlDatabase) {
            console.log({
                shortUrl: this.baseUrl + code,
                originalUrl: data.originalUrl,
                clicks: data.clicks,
            });
        }

        console.log("========================\n");
    }
}


// Test
const shortener = new URLShortener();

const google = shortener.createShortUrl(
    "https://www.google.com"
);

const github = shortener.createShortUrl(
    "https://github.com"
);

const youtube = shortener.createShortUrl(
    "https://youtube.com",
    "yt"
);

console.log(google);
console.log(github);
console.log(youtube);

console.log(
    shortener.expandUrl(google)
);

console.log(
    shortener.expandUrl(google)
);

shortener.getStats(google);

shortener.listUrls();

shortener.deleteUrl(github);

shortener.listUrls();