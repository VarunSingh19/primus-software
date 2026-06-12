class ATM {
    constructor(initialBalance = 0) {
        this.balance = initialBalance;
        this.transactions = [];
        this.undoStack = [];
    }

    deposit(amount) {
        if (amount <= 0) {
            console.log("Invalid deposit amount");
            return;
        }

        this.balance += amount;

        this.transactions.push({
            type: "DEPOSIT",
            amount
        });

        this.undoStack.push({
            type: "DEPOSIT",
            amount
        });

        console.log(`₹${amount} deposited successfully`);
    }

    withdraw(amount) {
        if (amount <= 0) {
            console.log("Invalid withdrawal amount");
            return;
        }

        if (amount > this.balance) {
            console.log("Insufficient balance");
            return;
        }

        this.balance -= amount;

        this.transactions.push({
            type: "WITHDRAW",
            amount
        });

        this.undoStack.push({
            type: "WITHDRAW",
            amount
        });

        console.log(`₹${amount} withdrawn successfully`);
    }

    checkBalance() {
        console.log(`Current Balance: ₹${this.balance}`);
    }

    showTransactions() {
        if (this.transactions.length === 0) {
            console.log("No transactions found");
            return;
        }

        console.log("\nTransaction History:");

        this.transactions.forEach((transaction, index) => {
            console.log(
                `${index + 1}. ${transaction.type} - ₹${transaction.amount}`
            );
        });
    }

    undo() {
        if (this.undoStack.length === 0) {
            console.log("Nothing to undo");
            return;
        }

        const lastTransaction = this.undoStack.pop();

        if (lastTransaction.type === "DEPOSIT") {
            this.balance -= lastTransaction.amount;
        } else {
            this.balance += lastTransaction.amount;
        }

        this.transactions.pop();

        console.log(
            `Undo successful: ${lastTransaction.type} ₹${lastTransaction.amount}`
        );
    }
}


const atm = new ATM(1000);

atm.checkBalance();

atm.deposit(500);

atm.withdraw(300);

atm.checkBalance();

atm.showTransactions();

atm.undo();

atm.checkBalance();

atm.showTransactions();