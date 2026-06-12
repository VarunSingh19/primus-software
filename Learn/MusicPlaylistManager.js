class MusicPlaylistManager {
    constructor() {
        this.playlist = [];
        this.currentIndex = -1;
        this.repeat = false;
        this.shuffle = false;
    }

    addSong(song) {
        this.playlist.push(song);

        if (this.currentIndex === -1) {
            this.currentIndex = 0;
        }

        console.log(`${song} added to playlist`);
    }

    removeSong(song) {
        const index = this.playlist.indexOf(song);

        if (index === -1) {
            console.log("Song not found");
            return;
        }

        this.playlist.splice(index, 1);

        if (this.playlist.length === 0) {
            this.currentIndex = -1;
        } else if (this.currentIndex >= this.playlist.length) {
            this.currentIndex = this.playlist.length - 1;
        }

        console.log(`${song} removed from playlist`);
    }

    playCurrentSong() {
        if (this.playlist.length === 0) {
            console.log("Playlist is empty");
            return;
        }

        console.log(`Now Playing: ${this.playlist[this.currentIndex]}`);
    }

    nextSong() {
        if (this.playlist.length === 0) {
            console.log("Playlist is empty");
            return;
        }

        if (this.shuffle) {
            this.currentIndex = Math.floor(
                Math.random() * this.playlist.length
            );
        } else {
            if (this.currentIndex === this.playlist.length - 1) {
                if (this.repeat) {
                    this.currentIndex = 0;
                } else {
                    console.log("End of playlist");
                    return;
                }
            } else {
                this.currentIndex++;
            }
        }

        this.playCurrentSong();
    }

    previousSong() {
        if (this.playlist.length === 0) {
            console.log("Playlist is empty");
            return;
        }

        if (this.currentIndex === 0) {
            if (this.repeat) {
                this.currentIndex = this.playlist.length - 1;
            } else {
                console.log("Beginning of playlist");
                return;
            }
        } else {
            this.currentIndex--;
        }

        this.playCurrentSong();
    }

    toggleRepeat() {
        this.repeat = !this.repeat;
        console.log(`Repeat Mode: ${this.repeat}`);
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        console.log(`Shuffle Mode: ${this.shuffle}`);
    }

    showPlaylist() {
        if (this.playlist.length === 0) {
            console.log("Playlist is empty");
            return;
        }

        console.log("\nPlaylist:");

        this.playlist.forEach((song, index) => {
            const marker =
                index === this.currentIndex ? " <-- Playing" : "";

            console.log(`${index + 1}. ${song}${marker}`);
        });
    }
}




const player = new MusicPlaylistManager();

player.addSong("Believer");
player.addSong("Shape Of You");
player.addSong("Perfect");
player.addSong("Closer");

player.showPlaylist();

player.playCurrentSong();

player.nextSong();
player.nextSong();

player.previousSong();

player.toggleRepeat();

player.nextSong();
player.nextSong();
player.nextSong();

player.toggleShuffle();

player.nextSong();
player.nextSong();

player.removeSong("Perfect");

player.showPlaylist();