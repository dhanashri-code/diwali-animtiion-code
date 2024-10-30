/* Audio Play*/

var audio = new Audio("firework-song.mp3");

audio.oncanplaythrough = function(){
audio.play();
}

audio.loop = true;

audio.onended = function(){
audio.play();
}

/* FireCracker Animation */

const max_fireworks = 10,
  max_sparks = 30;
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let fireworks = [];
 
for (let i = 0; i < max_fireworks; i++) {
   let firework = {
    sparks: []
  };

for (let n = 0; n < max_sparks; n++) {
    let spark = {
      vx: Math.random() * 5 + .5,
      vy: Math.random() * 5 + .5,
      weight: Math.random() * .3 + .03,
      red: Math.floor(Math.random() * 30),
      green: Math.floor(Math.random() * 30),
      blue: Math.floor(Math.random() * 30)
    };

    if (Math.random() > .5) spark.vx = -spark.vx;
    if (Math.random() > .5) spark.vy = -spark.vy;
    firework.sparks.push(spark);
  }

  fireworks.push(firework);
  resetFirework(firework);
}

window.requestAnimationFrame(explode);
 
function resetFirework(firework) {
  firework.x = Math.floor(Math.random() * canvas.width);
  firework.y = canvas.height;
  firework.age = 0;
  firework.phase = 'fly';
}
 
function explode() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework,index) => {
    if (firework.phase == 'explode') {
        firework.sparks.forEach((spark) => {
        for (let i = 0; i < 10; i++) {
          let trailAge = firework.age + i;
          let x = firework.x + spark.vx * trailAge;
          let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
          let fade = i * 20 - firework.age * 2;
          let r = Math.floor(spark.red * fade);
          let g = Math.floor(spark.green * fade);
          let b = Math.floor(spark.blue * fade);
          context.beginPath();
          context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
          context.rect(x, y, 4, 4);
          context.fill();
        }
      });

      firework.age++;
      if (firework.age > 100 && Math.random() < .05) {
        resetFirework(firework);
      }
    } else {
      firework.y = firework.y - 10;
      for (let spark = 0; spark < 15; spark++) {
        context.beginPath();
        context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
        context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
        context.fill();
      }
      if (Math.random() < .001 || firework.y < 300) firework.phase = 'explode';
    }
  });
  window.requestAnimationFrame(explode);
}


/* Countdown for Diwali */
(function () {
  const sec = 1000,
        min = sec * 60,
        hr = min * 60,
        d = hr * 24;

let diwali = "Oct 31, 2024 12:00:00",
      countDown = new Date(diwali).getTime(),
      x = setInterval(function() {    

let now = new Date().getTime(),
          distance = countDown - now;

          document.getElementById("d").innerText = Math.floor(distance / (d)),
          document.getElementById("hr").innerText = Math.floor((distance % (d)) / (hr)),
          document.getElementById("min").innerText = Math.floor((distance % (hr)) / (min)),
          document.getElementById("sec").innerText = Math.floor((distance % (min)) / sec);

if (distance > 0) {
let diwaliTime = document.getElementById("diwaliTime"),
countdown = document.getElementById("countdown"),
fest = document.getElementById("fest");

          diwaliTime.innerText = "Happy Diwali!";
          countdown.style.display = "none";
          fest.style.display = "block";

          clearInterval(x);
        }
      }, 0)
  }());
