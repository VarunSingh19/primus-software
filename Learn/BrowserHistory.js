class BrowserHistory {
    constructor() {
        this.currentPage = null;
        this.backStack = [];
        this.forwardStack = [];
    }

    visit(page) {
        if (this.currentPage !== null) {
            this.backStack.push(this.currentPage);
        }

        this.currentPage = page;
        this.forwardStack = [];

        console.log(`Visited: ${page}`);
    }

    back() {
        if (this.backStack.length === 0) {
            console.log("No previous page");
            return;
        }

        this.forwardStack.push(this.currentPage);
        this.currentPage = this.backStack.pop();

        console.log(`Moved back to: ${this.currentPage}`);
    }

    forward() {
        if (this.forwardStack.length === 0) {
            console.log("No next page");
            return;
        }

        this.backStack.push(this.currentPage);
        this.currentPage = this.forwardStack.pop();

        console.log(`Moved forward to: ${this.currentPage}`);
    }

    current() {
        if (!this.currentPage) {
            console.log("No page opened");
            return;
        }

        console.log(`Current Page: ${this.currentPage}`);
    }

    history() {
        console.log("Back Stack:", this.backStack);
        console.log("Current:", this.currentPage);
        console.log("Forward Stack:", this.forwardStack);
    }
}

const browser = new BrowserHistory();

browser.visit("google.com");
browser.visit("youtube.com");
browser.visit("github.com");

browser.current();

browser.back();
browser.current();

browser.back();
browser.current();

browser.forward();
browser.current();

browser.history();