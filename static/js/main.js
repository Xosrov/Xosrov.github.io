"use strict"
let cssVariables = [
    "--main_bg_1",
    "--main_bg_2",
    "--text_1",
    "--text_2",
    "--other",
]
let nightColors = [
  "#2a1e1d",
  "#77615f",
  "#F3D9DC",
  "#b17a3f",
  "#c67b5b",
];
let dayColors = [
  "#cbf3f0",
  "#ffffff",
  "#2ec4b6",
  "#ffbf69",
  "#ff9f1c",
];
let animating = false;

function isOnScreen(element) {
    var curPos = element.offset();
    var curTop = curPos.top;
    var screenHeight = $(window).height();
    return (curTop > screenHeight) ? false : true;
}

function updatePage() {
    let baseWidth = 60; //vh unit
    if ($(window).width() < 600)
    baseWidth = 50;
    if ($("#night").is(":checked")) {
        for (let i = 0; i < cssVariables.length; i++) {
            document.documentElement.style.setProperty(cssVariables[i], nightColors[i]);
            $(".third_page>.main>section>svg").css({ 'filter': getFilter(nightColors[1])});
        }
    } else if ($("#day").is(":checked")) {
        for (let i = 0; i < cssVariables.length; i++) {
            document.documentElement.style.setProperty(cssVariables[i], dayColors[i]);
            $(".third_page>.main>section>svg").css({ 'filter': getFilter(dayColors[1])});
        }
    }
    let page = 1;
    let loadedProficiencies = false;
    $(".first_page .main").scroll(function () {
        if (loadedProficiencies)
            return;
        loadedProficiencies = true;
        let widthslice = (baseWidth - 16) / 10;
        proficiencySlider(".proficiencies > * > div", widthslice);
    });
    $("#day").change(function () {
        for (let i = 0; i < cssVariables.length; i++) {
            document.documentElement.style.setProperty(cssVariables[i], dayColors[i]);
            $(".third_page>.main>section>svg").css({ 'filter': getFilter(dayColors[1])});
        }
    });
    $("#night").change(function () {
        for (let i = 0; i < cssVariables.length; i++) {
            document.documentElement.style.setProperty(cssVariables[i], nightColors[i]);
            $(".third_page>.main>section>svg").css({ 'filter': getFilter(nightColors[1])});
        }
    });
    $(".more_info_container").hover(function () {
        if (animating) return;
        verticalAnim('.vertical_scrollbar div', 80);
        if (page != 1)
            $(".vertical_scrollbar > *").css("background-color", "var(--other)");
        else
            $(".vertical_scrollbar > *").css("background-color", "var(--main_bg_2)");
    }, function () {
        verticalAnim('.vertical_scrollbar div', 1 / 80);
        $(".vertical_scrollbar > *").css("background-color", "var(--main_bg_2)");
    });
    $("#page_2").hover(function () {
        if (animating) return;
        if (page == 1) {
            $(".second_page").css("right", -baseWidth + 2 + "vh");
            $(".first_page").css("left", "-2vh");
        } else {
            $(".first_page").css("left", -baseWidth + 2 + "vh");
            $(".second_page").css("right", "-2vh");
        }
    }, function () {
        if (animating) return;
        if (page == 1) {
            $(".second_page").css("right", -baseWidth + "vh");
            $(".first_page").css("left", "0");
        } else {
            $(".second_page").css("right", "0");
            $(".first_page").css("left", -baseWidth + "vh");
        }
    });
    $("#page_3").hover(function () {
        if (animating) return;
        if (page == 1) {
            $(".third_page").css("left", -baseWidth + 2 + "vh");
            $(".first_page").css("left", "2vh");
        } else {
            $(".third_page").css("left", "-2vh");
            $(".first_page").css("left", baseWidth - 2 + "vh");
        }
    }, function () {
        if (animating) return;
        if (page == 1) {
            $(".third_page").css("left", -baseWidth + "vh");
            $(".first_page").css("left", "0");
        } else {
            $(".first_page").css("left", baseWidth + "vh");
            $(".third_page").css("left", "0");
        }
    });
    $("#page_2").click(function () {
        if (animating) return;
        animating = true;
        if (page == 1) {
            page = 2
            $(".vertical_scrollbar > *").css("background-color", "var(--other)");
            $(".first_page").css("left", -baseWidth + "vh");
            $("#page_2").css("right", baseWidth / 2 - 3 + "vh");
            $("#page_2").html("Back");
            $("#page_3").css("left", -baseWidth + "vh");
            $(".second_page").css("right", "0");
            $(".basic_info_name").css("color", "var(--text_2)");
            $(".horizontal_scrollbar_r > *").css("background-color", "var(--other)");
            horizontalAnim('.horizontal_scrollbar_r div', 2, 'easeOutCubic');
            slide("#page_2");
        } else {
            page = 1;
            $(".vertical_scrollbar > *").css("background-color", "var(--main_bg_2)");
            $("#page_2").css("right", "2vh");
            $("#page_2").html("Contact");
            $("#page_3").css("left", "2vh");
            $(".second_page").css("right", -baseWidth + "vh");
            $(".first_page").css("left", "0");
            $(".basic_info_name").css("color", "var(--other)");
            $(".horizontal_scrollbar_r > *").css("background-color", "var(--main_bg_2)");
            horizontalAnim('.horizontal_scrollbar_r div', 3, 'linear');
            slide("#page_2");
        }
    });
    $("#page_3").click(function () {
        if (animating) return;
        animating = true;
        if (page == 1) {
            page = 3
            $(".vertical_scrollbar > *").css("background-color", "var(--other)");
            $(".first_page").css("left", baseWidth + "vh");
            $("#page_3").css("left", baseWidth / 2 - 3 + "vh");
            $("#page_3").html("Back");
            $("#page_2").css("right", -baseWidth + "vh");
            $(".third_page").css("left", "0");
            $(".basic_info_name").css("color", "var(--text_2)");
            $(".horizontal_scrollbar_l > *").css("background-color", "var(--other)");
            horizontalAnim('.horizontal_scrollbar_l div', 3, 'easeOutCubic');
            slide("#page_3");
        } else {
            page = 1;
            $(".vertical_scrollbar > *").css("background-color", "var(--main_bg_2)");
            $("#page_3").css("left", "2vh");
            $("#page_3").html("Experience");
            $("#page_2").css("right", "2vh");
            $(".third_page").css("left", -baseWidth + "vh");
            $(".first_page").css("left", "0");
            $(".basic_info_name").css("color", "var(--other)");
            $(".horizontal_scrollbar_l > *").css("background-color", "var(--main_bg_2)");
            horizontalAnim('.horizontal_scrollbar_l div', 2, 'linear');
            slide("#page_3");
        }
    });
}
var windowWidth;
var windowHeight;

$(document).ready(function () {
    $("#noscript").remove();
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    updatePage();
});
$(window).resize(function () {
    if (windowWidth != $(window).width() || windowHeight != $(window).height()) {
        location.reload();
    }
});

function verticalAnim(targets, scale) {
    anime({
        targets: targets,
        scaleY: scale,
        duration: 700,
        easing: 'cubicBezier(0.25, 0.1, 0.25, 1.0)',
        delay: anime.stagger(20, {
            from: 'center',
            easing: 'easeInCirc'
        })
    });
}

function horizontalAnim(targets, dir, ease) {
    anime({
        targets: targets,
        translateX: (dir == 2) ? "-62.2vh" : "62.2vh",
        duration: 500,
        scaleX: [10, 1],
        easing: ease,
        delay: anime.stagger(18, {
            from: 'center',
            easing: "easeInQuad"
        }),
        complete: function(a) {
          animating = false;
        }
    });
}

function slide(targets) {
    anime({
        targets: targets,
        duration: 750,
        scaleX: [3, 1],
        easing: 'easeInOutExpo',
    });
}

function proficiencySlider(targets, widthSlice) {
    anime({
        targets: targets,
        width: function (element, i, l) {
            let score = $(element).attr("class");
            return score * widthSlice + "vh";
        },
        duration: 750,
        delay: anime.stagger(150),
        easing: 'easeInOutQuart'
    });
}


'use strict';

class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }
  
  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = angle / 180 * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.140,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
    const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
    const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}
// borrowed from https://codepen.io/sosuke/pen/Pjoqqp
class Solver {
  constructor(target, baseColor) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Color(0, 0, 0);
  }

  solve() {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter: this.css(result.values),
    };
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = lossDiff / (2 * ck) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value, idx) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + value % max;
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }

  loss(filters) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%)`;
  }
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
    : null;
}

function getFilter(hexColor) {
    const rgb = hexToRgb(hexColor);
    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();
    return result.filter;
};

