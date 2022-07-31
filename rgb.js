var colors;
var score = 0;
var hex = false;
var clickable = true;

function rgb2hex(rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function highlight(color, correct) {
  var el = document.getElementById("color" + color);
  if (correct) {
    el.style.border = "8px #00AA00 outset";
  } else {
    el.style.border = "8px red outset";
  }
  setTimeout(function () {
    el.style.border = "none";
    clickable = true;
  }, 800);
}

function pickColor() {
  var i = Math.floor(Math.random() * colors.length);

  if (hex) {
    document.getElementById("color").innerHTML = rgb2hex(colors[i]);
  } else {
    document.getElementById("color").innerHTML = colors[i];
  }

  return i;
}

function generateColorList(numberOfColors) {
  var r, g, b, d;
  var colorList = [];
  var red = [];
  var green = [];
  var blue = [];
  for (var i = 0; i < numberOfColors; i++) {
    var distance = 0;
    while (distance < 120) {
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
      distance = 100000;
      for (var j = 0; j < i; j++) {
        d = Math.sqrt(
          Math.pow(r - red[j], 2) +
            Math.pow(g - green[j], 2) +
            Math.pow(b - blue[j], 2)
        );
        if (d < distance) distance = d;
      }
    }
    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    red.push(r);
    green.push(g);
    blue.push(b);

    colorList.push(color);
    document.getElementById("color" + i).style.backgroundColor = color;
  }
  return colorList;
}

colors = generateColorList(4);
var correctAnswer = pickColor();

function checkColor(color) {
  if (clickable) {
    clickable = false;
    if (color == correctAnswer) {
      highlight(color, true);
      setTimeout(function () {
        colors = generateColorList(4);
        correctAnswer = pickColor();
        score += 5;
        document.getElementById("score").innerHTML = "Score: " + score;
      }, 800);
    } else {
      highlight(color, false);
      score -= 2;
      document.getElementById("score").innerHTML = "Score: " + score;
    }
  }
}

function newColor() {
  colors = generateColorList(4);
  correctAnswer = pickColor();
}

function restart() {
  score = 0;
  newColor();
  document.getElementById("score").innerHTML = "Score: " + score;
}

function switchMode() {
  hex = !hex;
  if (hex) {
    document.getElementById("mode").innerHTML = "Switch to decimal";
    document.getElementById("color").innerHTML = rgb2hex(colors[correctAnswer]);
  } else {
    document.getElementById("mode").innerHTML = "Switch to hexadecimal";
    document.getElementById("color").innerHTML = colors[correctAnswer];
  }
}
