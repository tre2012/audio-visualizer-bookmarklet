var bufferLength
var data
var ctx
var canvas
var cap
var start
var last_timestamp
var dots
var lines_per
module.exports = {
    init({ analyser, canvas }) {
        analyser.fftSize = 256
        var bufferLength = analyser.frequencyBinCount
        var data = new Uint8Array(bufferLength)
        ctx = canvas.getContext('2d')
            // ctx.lineWidth = 0.5
        var cap = data.length * 5 / 9
        var start = parseInt(cap / 10, 10)
        var cap -= start
        var lines_per = 5
        var last_timestamp = Date.now()
        var dots = []
        for (var i = 0; i < cap; i++) dots.push(new Dot((i / cap) * 360))
    },
    draw(timestamp, { analyser }) {
        analyser.getByteFrequencyData(data)
            // ctx.drawImage(canvas, -10, 0, canvas.width + 20, canvas.height)
        ctx.fillStyle = '#222'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(Math.PI * 3 / 2)
        const minrad = Math.min(canvas.height, canvas.width) / 6
        for (var i = 0; i < cap - 1; i++) {
            if (data[i + start] > dots[i].max_vol) dots[i].max_vol = data[i + start]
            else if (Date.now() - last_timestamp >= 50 && dots[i].max_vol > 1) {
                dots[i].max_vol *= 0.999
                last_timestamp = Date.now()
            }
            dots[i].theta = ((i + 1) / (cap)) * Math.PI * 2 + timestamp / 8000
                // const minrad = ellipse(dots[i].theta, canvas.width / 2, canvas.height / 2)
            const maxrad = ellipse(dots[i].theta, canvas.width, canvas.height) - minrad
            dots[i].radius = minrad + (data[i + start] / dots[i].max_vol) * maxrad
            dots[i].rect()
            dots[i].hue += 0.25
        }
        for (var i = 0; i < cap - 1; i++) {
            for (var j = 1; j < lines_per; j++) {
                const index = parseInt((j * cap / lines_per + i) % cap, 10)
                ctx.beginPath()
                    // ctx.arc(dots[i].x, dots[i].y, 2, 0, 2 * Math.PI)
                ctx.moveTo(dots[i].x, dots[i].y)
                ctx.quadraticCurveTo(0, 0, dots[index].x, dots[index].y)
                const grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[index].x, dots[index].y)
                grd.addColorStop(0, 'hsl(' + dots[i].hue + ', 100%,50%)')
                grd.addColorStop(1, 'hsl(' + dots[index].hue + ', 100%,50%)')

                ctx.strokeStyle = grd
                    // ctx.strokeText(i, dots[i].x, dots[i].y)

                ctx.stroke()
                ctx.closePath()
            }
        }
        ctx.restore()
    }
}

function Dot(hue) {
    this.max_vol = 127
    this.hue = hue
    this.radius = 0
    this.theta = 0
    this.x = 0
    this.y = 0
    this.rect = function() {
        this.x = this.radius * Math.cos(this.theta)
        this.y = this.radius * Math.sin(this.theta)
    }
}

function ellipse(theta, a, b) {
    return ((a / 2) * (b / 2)) / Math.sqrt(Math.pow((b / 2) * Math.sin(theta), 2) + Math.pow((a / 2) * Math.cos(theta), 2))
}