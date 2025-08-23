const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart(x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-2, -2, -3, 1, 0, 3);
  ctx.bezierCurveTo(3, 1, 2, -2, 0, 0);
  ctx.fill();
  ctx.restore();
}

function HeartParticle(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 4 + 0.4;
  this.color = "red";
  this.speedY = Math.random() * -1 - 0.5;
  this.speedX = (Math.random() - 0.5) * 1;
}

HeartParticle.prototype.update = function () {
  this.x += this.speedX;
  this.y += this.speedY;
  this.size *= 0.98;
};

HeartParticle.prototype.draw = function () {
  createHeart(this.x, this.y, this.size, this.color);
};

let angle = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let x = canvas.width / 2 + 200 * Math.sin(angle) ** 3;
  let y = canvas.height / 2 - (150 * (Math.cos(angle) - Math.cos(2 * angle) / 2 - Math.cos(3 * angle) / 3 - Math.cos(4 * angle) / 4));

  hearts.push(new HeartParticle(x, y));

  for (let i = 0; i < hearts.length; i++) {
    hearts[i].update();
    hearts[i].draw();
    if (hearts[i].size < 0.1) {
      hearts.splice(i, 1);
      i--;
    }
  }

  angle += 0.05;
  requestAnimationFrame(animate);
}

animate();
