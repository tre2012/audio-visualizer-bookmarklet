var source = document.getElementsByTagName("video")[0];
if (!source) throw new Error("Audio Visualizer Bookmarklet: No audio source currently present on webpage.")

const audioCtx = new(window.AudioContext || window.webkitAudioContext)()
const analyser = audioCtx.createAnalyser()
source = audioCtx.createMediaElementSource(source)
analyser.connect(audioCtx.destination)
source.connect(analyser)

const canvas = document.createElement("canvas");
(canvas.resize = function() {
    [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
})();
window.addEventListener('resize', canvas.resize, false);

const ctx = canvas.getContext('2d');

Object.assign(canvas.style, {
    position: "absolute",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    left: 0,
    top: 0,
    zIndex: 16777271,
    pointerEvents: "none"
})

document.body.appendChild(canvas);

analyser.fftSize = 512
var bufferLength = analyser.frequencyBinCount
var data = new Uint8Array(bufferLength)

// ctx.lineWidth = 0.5
// var cap = data.length * 5 / 9
// var start = parseInt(cap / 10, 10)
// cap -= start
// var lines_per = 5
// var last_timestamp = Date.now()
// var dots = []
// for (var i = 0; i < cap; i++) dots.push(new Dot((i / cap) * 360))


// function Dot(hue) {
//     this.max_vol = 127
//     this.hue = hue
//     this.radius = 0
//     this.theta = 0
//     this.x = 0
//     this.y = 0
//     this.rect = function() {
//         this.x = this.radius * Math.cos(this.theta)
//         this.y = this.radius * Math.sin(this.theta)
//     }
// }

// function ellipse(theta, a, b) {
//     return ((a / 2) * (b / 2)) / Math.sqrt(Math.pow((b / 2) * Math.sin(theta), 2) + Math.pow((a / 2) * Math.cos(theta), 2))
// }

function spectrum(canvas, ctx, width, scale) {
    const halfWidth = Math.floor(canvas.width / 2)
    const halfHeight = Math.floor(canvas.height / 2)
    ctx.beginPath()
    for (let horizontal = 1; horizontal > -2; horizontal -= 2) {
        for (let vertical = 1; vertical > -2; vertical -= 2) {
            ctx.moveTo(halfWidth, halfHeight)
            for (let i = 0; i < bufferLength; i++) {
                let rawHeight = data[i] / 256
                rawHeight = Math.pow(rawHeight, 5)
                const height = (halfHeight * rawHeight) * vertical
                ctx.lineTo(halfWidth + (width / 2 * i) * horizontal, halfHeight - height * scale)
            }
        }
    }
    ctx.closePath()
    ctx.fill()
}

(canvas.draw = function() {
    var timestamp = Date.now()
        // ctx.save();
        // ctx.clearRect(0, 0, canvas.width, canvas.height);


    // ctx.translate(canvas.width/2, canvas.height/2);
    // ctx.rotate((Date.now()%1000)/500*Math.PI)
    // ctx.fillRect(-100,-100,200,200)
    /*              Fade BG
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    */


    analyser.getByteFrequencyData(data)
        // draw previous frame
    ctx.drawImage(canvas, -10, 0, canvas.width + 20, canvas.height)
        // darken it
    ctx.globalCompositeOperation = 'multiply'
    // ctx.fillStyle = '#EEE'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    const width = parseInt(bufferLength * 5 / 6, 10)
    const scaledWidth = ((canvas.width - width) / width)
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'hsl(' + timestamp / 60 + ',100%,50%)'
    spectrum(canvas, ctx, scaledWidth, 1)
    ctx.fillStyle = '#000'
    spectrum(canvas, ctx, scaledWidth, 0.6)


    // analyser.getByteFrequencyData(data)
    //     // ctx.drawImage(canvas, -10, 0, canvas.width + 20, canvas.height)
    // ctx.translate(canvas.width / 2, canvas.height / 2)
    // ctx.rotate(Math.PI * 3 / 2)
    // const minrad = Math.min(canvas.height, canvas.width) / 6
    // for (var i = 0; i < cap - 1; i++) {
    //     if (data[i + start] > dots[i].max_vol) dots[i].max_vol = data[i + start]
    //     else if (timestamp - last_timestamp >= 50 && dots[i].max_vol > 1) {
    //         dots[i].max_vol *= 0.999
    //         last_timestamp = timestamp
    //     }
    //     dots[i].theta = ((i + 1) / (cap)) * Math.PI * 2 + timestamp / 8000
    //         // const minrad = ellipse(dots[i].theta, canvas.width / 2, canvas.height / 2)
    //     const maxrad = ellipse(dots[i].theta, canvas.width, canvas.height) - minrad
    //     dots[i].radius = minrad + (data[i + start] / dots[i].max_vol) * maxrad
    //     dots[i].rect()
    //     dots[i].hue += 0.25
    // }
    // for (var i = 0; i < cap - 1; i++) {
    //     for (var j = 1; j < lines_per; j++) {
    //         const index = parseInt((j * cap / lines_per + i) % cap, 10)
    //         ctx.beginPath()
    //             // ctx.arc(dots[i].x, dots[i].y, 2, 0, 2 * Math.PI)
    //         ctx.moveTo(dots[i].x, dots[i].y)
    //         ctx.quadraticCurveTo(0, 0, dots[index].x, dots[index].y)
    //         const grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[index].x, dots[index].y)
    //         grd.addColorStop(0, 'hsl(' + dots[i].hue + ', 100%,50%)')
    //         grd.addColorStop(1, 'hsl(' + dots[index].hue + ', 100%,50%)')

    //         ctx.strokeStyle = grd
    //             // ctx.strokeText(i, dots[i].x, dots[i].y)

    //         ctx.stroke()
    //         ctx.closePath()
    //     }
    // }



    // ctx.restore();
    // window.requestAnimationFrame(canvas.draw);
})();



console.log("Audio Visualizer Bookmarklet successfully loaded!")