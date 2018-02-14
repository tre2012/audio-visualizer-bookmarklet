const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
(canvas.resize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})()
Object.assign(canvas.style, 
    {
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        left: 0
    }
)

window.addEventListener('resize', canvas.resize, false);
document.body.appendChild(canvas)

(function draw() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rotate(Date.now())
    ctx.fillStyle = "#F42";
    ctx.fillRect(0,0,200,200)
    /*              Fade BG
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    */


    ctx.restore();
    window.requestAnimationFrame(draw);
})();



console.log("Audio Visualizer Bookmarklet successfully loaded!")