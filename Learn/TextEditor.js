class TextEditor {
    constructor() {
        this.text = "";
        this.clipboard = "";

        this.undoStack = [];
        this.redoStack = [];
    }

    // Save current state before making changes
    saveState() {
        this.undoStack.push(this.text);
        this.redoStack = [];
    }

    // Write text
    write(content) {
        this.saveState();

        this.text += content;

        console.log(`Added: "${content}"`);
    }

    // Delete last N characters
    delete(chars) {
        if (this.text.length === 0) {
            console.log("Nothing to delete");
            return;
        }

        this.saveState();

        const deletedText = this.text.slice(-chars);

        this.text = this.text.slice(0, this.text.length - chars);

        console.log(`Deleted: "${deletedText}"`);
    }

    // Replace first occurrence
    replace(oldText, newText) {
        const index = this.text.indexOf(oldText);

        if (index === -1) {
            console.log(`"${oldText}" not found`);
            return;
        }

        this.saveState();

        this.text =
            this.text.slice(0, index) +
            newText +
            this.text.slice(index + oldText.length);

        console.log(
            `Replaced "${oldText}" with "${newText}"`
        );
    }

    // Copy entire text
    copy() {
        if (!this.text.length) {
            console.log("Nothing to copy");
            return;
        }

        this.clipboard = this.text;

        console.log("Text copied to clipboard");
    }

    // Copy specific range
    copyRange(start, end) {
        if (
            start < 0 ||
            end > this.text.length ||
            start >= end
        ) {
            console.log("Invalid range");
            return;
        }

        this.clipboard = this.text.slice(start, end);

        console.log(
            `Copied: "${this.clipboard}"`
        );
    }

    // Paste clipboard content
    paste() {
        if (!this.clipboard.length) {
            console.log("Clipboard is empty");
            return;
        }

        this.saveState();

        this.text += this.clipboard;

        console.log(
            `Pasted: "${this.clipboard}"`
        );
    }

    // Find text
    find(word) {
        const index = this.text.indexOf(word);

        if (index === -1) {
            console.log(
                `"${word}" not found`
            );
            return;
        }

        console.log(
            `"${word}" found at position ${index}`
        );
    }

    // Count words
    wordCount() {
        const count = this.text.trim()
            ? this.text.trim().split(/\s+/).length
            : 0;

        console.log(`Words: ${count}`);
    }

    // Count characters
    charCount() {
        console.log(
            `Characters: ${this.text.length}`
        );
    }

    // Clear editor
    clear() {
        if (this.text.length === 0) {
            console.log("Editor already empty");
            return;
        }

        this.saveState();

        this.text = "";

        console.log("Editor cleared");
    }

    // Undo
    undo() {
        if (this.undoStack.length === 0) {
            console.log("Nothing to undo");
            return;
        }

        this.redoStack.push(this.text);

        this.text = this.undoStack.pop();

        console.log("Undo successful");
    }

    // Redo
    redo() {
        if (this.redoStack.length === 0) {
            console.log("Nothing to redo");
            return;
        }

        this.undoStack.push(this.text);

        this.text = this.redoStack.pop();

        console.log("Redo successful");
    }

    // Show current text
    print() {
        console.log(
            `Current Text: "${this.text}"`
        );
    }

    // Debug history
    history() {
        console.log("\n===== HISTORY =====");

        console.log(
            "Undo Stack:",
            this.undoStack
        );

        console.log(
            "Current Text:",
            this.text
        );

        console.log(
            "Redo Stack:",
            this.redoStack
        );

        console.log(
            "Clipboard:",
            this.clipboard
        );

        console.log("===================\n");
    }
}


const editor = new TextEditor();

editor.write("Hello");
editor.write(" World");

editor.print();

editor.wordCount();
editor.charCount();

editor.find("World");

editor.replace("World", "JavaScript");

editor.print();

editor.copy();

editor.paste();

editor.print();

editor.delete(10);

editor.print();

editor.undo();

editor.print();

editor.redo();

editor.print();

editor.copyRange(0, 5);

editor.paste();

editor.print();

editor.clear();

editor.print();

editor.undo();

editor.print();

editor.history();
