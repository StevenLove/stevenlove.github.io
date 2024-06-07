declare global {
    interface MediaStream {
        stop(): void;
    }
}

MediaStream.prototype.stop = function() {
    this.getTracks().forEach(function(track) {
        track.stop();
    });
};


export {}