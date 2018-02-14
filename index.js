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

ctx.fillStyle = "#F42";
ctx.fillRect(0,0,200,200)

console.log("Audio Visualizer Bookmarklet successfully loaded!")