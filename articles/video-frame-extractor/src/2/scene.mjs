export class Scene {
    assets = [];

    currentTime = 0;

    animationFrameRequestId = null;

    constructor(ctx) {
        this.ctx = ctx;
    }

    play() {
        let startTime;

        const drawFrame = (timestamp) => {
            if (startTime === undefined) {
                startTime = timestamp;
            }
            const elapsed = timestamp - startTime;
            this.currentTime = elapsed;
            this.assets.forEach(
                (asset) => (asset.currentTime = this.currentTime)
            );
            this.assets.forEach((asset) => asset.draw(this.ctx));
            this.animationFrameRequestId = requestAnimationFrame(drawFrame);
        };
        requestAnimationFrame(drawFrame);
    }

    stop() {
        cancelAnimationFrame(this.animationFrameRequestId);
    }

    draw(ctx) {
        this.assets.forEach((asset) => asset.draw(ctx));
    }

    async waitWhenResourceReady() {
        return Promise.all(
            this.assets.map((asset) => asset.waitWhenResourceReady())
        );
    }
}
