/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 119:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.4.2
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License
(function (Math) {
  var trimLeft = /^\s+/,
      trimRight = /\s+$/,
      tinyCounter = 0,
      mathRound = Math.round,
      mathMin = Math.min,
      mathMax = Math.max,
      mathRandom = Math.random;

  function tinycolor(color, opts) {
    color = color ? color : '';
    opts = opts || {}; // If input is already a tinycolor, return itself

    if (color instanceof tinycolor) {
      return color;
    } // If we are called as a function, call using new instead


    if (!(this instanceof tinycolor)) {
      return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType; // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`

    if (this._r < 1) {
      this._r = mathRound(this._r);
    }

    if (this._g < 1) {
      this._g = mathRound(this._g);
    }

    if (this._b < 1) {
      this._b = mathRound(this._b);
    }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
  }

  tinycolor.prototype = {
    isDark: function () {
      return this.getBrightness() < 128;
    },
    isLight: function () {
      return !this.isDark();
    },
    isValid: function () {
      return this._ok;
    },
    getOriginalInput: function () {
      return this._originalInput;
    },
    getFormat: function () {
      return this._format;
    },
    getAlpha: function () {
      return this._a;
    },
    getBrightness: function () {
      //http://www.w3.org/TR/AERT#color-contrast
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function () {
      //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
      var rgb = this.toRgb();
      var RsRGB, GsRGB, BsRGB, R, G, B;
      RsRGB = rgb.r / 255;
      GsRGB = rgb.g / 255;
      BsRGB = rgb.b / 255;

      if (RsRGB <= 0.03928) {
        R = RsRGB / 12.92;
      } else {
        R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }

      if (GsRGB <= 0.03928) {
        G = GsRGB / 12.92;
      } else {
        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }

      if (BsRGB <= 0.03928) {
        B = BsRGB / 12.92;
      } else {
        B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }

      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    },
    setAlpha: function (value) {
      this._a = boundAlpha(value);
      this._roundA = mathRound(100 * this._a) / 100;
      return this;
    },
    toHsv: function () {
      var hsv = rgbToHsv(this._r, this._g, this._b);
      return {
        h: hsv.h * 360,
        s: hsv.s,
        v: hsv.v,
        a: this._a
      };
    },
    toHsvString: function () {
      var hsv = rgbToHsv(this._r, this._g, this._b);
      var h = mathRound(hsv.h * 360),
          s = mathRound(hsv.s * 100),
          v = mathRound(hsv.v * 100);
      return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
    },
    toHsl: function () {
      var hsl = rgbToHsl(this._r, this._g, this._b);
      return {
        h: hsl.h * 360,
        s: hsl.s,
        l: hsl.l,
        a: this._a
      };
    },
    toHslString: function () {
      var hsl = rgbToHsl(this._r, this._g, this._b);
      var h = mathRound(hsl.h * 360),
          s = mathRound(hsl.s * 100),
          l = mathRound(hsl.l * 100);
      return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
    },
    toHex: function (allow3Char) {
      return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function (allow3Char) {
      return '#' + this.toHex(allow3Char);
    },
    toHex8: function (allow4Char) {
      return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function (allow4Char) {
      return '#' + this.toHex8(allow4Char);
    },
    toRgb: function () {
      return {
        r: mathRound(this._r),
        g: mathRound(this._g),
        b: mathRound(this._b),
        a: this._a
      };
    },
    toRgbString: function () {
      return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function () {
      return {
        r: mathRound(bound01(this._r, 255) * 100) + "%",
        g: mathRound(bound01(this._g, 255) * 100) + "%",
        b: mathRound(bound01(this._b, 255) * 100) + "%",
        a: this._a
      };
    },
    toPercentageRgbString: function () {
      return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function () {
      if (this._a === 0) {
        return "transparent";
      }

      if (this._a < 1) {
        return false;
      }

      return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function (secondColor) {
      var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
      var secondHex8String = hex8String;
      var gradientType = this._gradientType ? "GradientType = 1, " : "";

      if (secondColor) {
        var s = tinycolor(secondColor);
        secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
      }

      return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
    },
    toString: function (format) {
      var formatSet = !!format;
      format = format || this._format;
      var formattedString = false;
      var hasAlpha = this._a < 1 && this._a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

      if (needsAlphaFormat) {
        // Special case for "transparent", all other non-alpha formats
        // will return rgba when there is transparency.
        if (format === "name" && this._a === 0) {
          return this.toName();
        }

        return this.toRgbString();
      }

      if (format === "rgb") {
        formattedString = this.toRgbString();
      }

      if (format === "prgb") {
        formattedString = this.toPercentageRgbString();
      }

      if (format === "hex" || format === "hex6") {
        formattedString = this.toHexString();
      }

      if (format === "hex3") {
        formattedString = this.toHexString(true);
      }

      if (format === "hex4") {
        formattedString = this.toHex8String(true);
      }

      if (format === "hex8") {
        formattedString = this.toHex8String();
      }

      if (format === "name") {
        formattedString = this.toName();
      }

      if (format === "hsl") {
        formattedString = this.toHslString();
      }

      if (format === "hsv") {
        formattedString = this.toHsvString();
      }

      return formattedString || this.toHexString();
    },
    clone: function () {
      return tinycolor(this.toString());
    },
    _applyModification: function (fn, args) {
      var color = fn.apply(null, [this].concat([].slice.call(args)));
      this._r = color._r;
      this._g = color._g;
      this._b = color._b;
      this.setAlpha(color._a);
      return this;
    },
    lighten: function () {
      return this._applyModification(lighten, arguments);
    },
    brighten: function () {
      return this._applyModification(brighten, arguments);
    },
    darken: function () {
      return this._applyModification(darken, arguments);
    },
    desaturate: function () {
      return this._applyModification(desaturate, arguments);
    },
    saturate: function () {
      return this._applyModification(saturate, arguments);
    },
    greyscale: function () {
      return this._applyModification(greyscale, arguments);
    },
    spin: function () {
      return this._applyModification(spin, arguments);
    },
    _applyCombination: function (fn, args) {
      return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function () {
      return this._applyCombination(analogous, arguments);
    },
    complement: function () {
      return this._applyCombination(complement, arguments);
    },
    monochromatic: function () {
      return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function () {
      return this._applyCombination(splitcomplement, arguments);
    },
    triad: function () {
      return this._applyCombination(triad, arguments);
    },
    tetrad: function () {
      return this._applyCombination(tetrad, arguments);
    }
  }; // If input is an object, force 1 into "1.0" to handle ratios properly
  // String input requires "1.0" as input, so 1 will be treated as 1

  tinycolor.fromRatio = function (color, opts) {
    if (typeof color == "object") {
      var newColor = {};

      for (var i in color) {
        if (color.hasOwnProperty(i)) {
          if (i === "a") {
            newColor[i] = color[i];
          } else {
            newColor[i] = convertToPercentage(color[i]);
          }
        }
      }

      color = newColor;
    }

    return tinycolor(color, opts);
  }; // Given a string or object, convert that input to RGB
  // Possible string inputs:
  //
  //     "red"
  //     "#f00" or "f00"
  //     "#ff0000" or "ff0000"
  //     "#ff000000" or "ff000000"
  //     "rgb 255 0 0" or "rgb (255, 0, 0)"
  //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
  //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
  //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
  //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
  //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
  //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
  //


  function inputToRGB(color) {
    var rgb = {
      r: 0,
      g: 0,
      b: 0
    };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
      color = stringInputToObject(color);
    }

    if (typeof color == "object") {
      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
        rgb = rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
        s = convertToPercentage(color.s);
        v = convertToPercentage(color.v);
        rgb = hsvToRgb(color.h, s, v);
        ok = true;
        format = "hsv";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
        s = convertToPercentage(color.s);
        l = convertToPercentage(color.l);
        rgb = hslToRgb(color.h, s, l);
        ok = true;
        format = "hsl";
      }

      if (color.hasOwnProperty("a")) {
        a = color.a;
      }
    }

    a = boundAlpha(a);
    return {
      ok: ok,
      format: color.format || format,
      r: mathMin(255, mathMax(rgb.r, 0)),
      g: mathMin(255, mathMax(rgb.g, 0)),
      b: mathMin(255, mathMax(rgb.b, 0)),
      a: a
    };
  } // Conversion Functions
  // --------------------
  // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
  // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
  // `rgbToRgb`
  // Handle bounds / percentage checking to conform to CSS color spec
  // <http://www.w3.org/TR/css3-color/>
  // *Assumes:* r, g, b in [0, 255] or [0, 1]
  // *Returns:* { r, g, b } in [0, 255]


  function rgbToRgb(r, g, b) {
    return {
      r: bound01(r, 255) * 255,
      g: bound01(g, 255) * 255,
      b: bound01(b, 255) * 255
    };
  } // `rgbToHsl`
  // Converts an RGB color value to HSL.
  // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
  // *Returns:* { h, s, l } in [0,1]


  function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = mathMax(r, g, b),
        min = mathMin(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
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
      h: h,
      s: s,
      l: l
    };
  } // `hslToRgb`
  // Converts an HSL color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]


  function hslToRgb(h, s, l) {
    var r, g, b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    };
  } // `rgbToHsv`
  // Converts an RGB color value to HSV
  // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
  // *Returns:* { h, s, v } in [0,1]


  function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = mathMax(r, g, b),
        min = mathMin(r, g, b);
    var h,
        s,
        v = max;
    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
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
      h: h,
      s: s,
      v: v
    };
  } // `hsvToRgb`
  // Converts an HSV color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]


  function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];
    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    };
  } // `rgbToHex`
  // Converts an RGB color to hex
  // Assumes r, g, and b are contained in the set [0, 255]
  // Returns a 3 or 6 character hex


  function rgbToHex(r, g, b, allow3Char) {
    var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))]; // Return a 3 character hex if possible

    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
  } // `rgbaToHex`
  // Converts an RGBA color plus alpha transparency to hex
  // Assumes r, g, b are contained in the set [0, 255] and
  // a in [0, 1]. Returns a 4 or 8 character rgba hex


  function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))]; // Return a 4 character hex if possible

    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
  } // `rgbaToArgbHex`
  // Converts an RGBA color to an ARGB Hex8 string
  // Rarely used, but required for "toFilter()"


  function rgbaToArgbHex(r, g, b, a) {
    var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];
    return hex.join("");
  } // `equals`
  // Can be called with any tinycolor input


  tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) {
      return false;
    }

    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
  };

  tinycolor.random = function () {
    return tinycolor.fromRatio({
      r: mathRandom(),
      g: mathRandom(),
      b: mathRandom()
    });
  }; // Modification Functions
  // ----------------------
  // Thanks to less.js for some of the basics here
  // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>


  function desaturate(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
  }

  function saturate(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
  }

  function greyscale(color) {
    return tinycolor(color).desaturate(100);
  }

  function lighten(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
  }

  function brighten(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
    return tinycolor(rgb);
  }

  function darken(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
  } // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
  // Values outside of this range will be wrapped into this range.


  function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
  } // Combination Functions
  // ---------------------
  // Thanks to jQuery xColor for some of the ideas behind these
  // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>


  function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
  }

  function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [tinycolor(color), tinycolor({
      h: (h + 120) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h + 240) % 360,
      s: hsl.s,
      l: hsl.l
    })];
  }

  function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [tinycolor(color), tinycolor({
      h: (h + 90) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h + 180) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h + 270) % 360,
      s: hsl.s,
      l: hsl.l
    })];
  }

  function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [tinycolor(color), tinycolor({
      h: (h + 72) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h + 216) % 360,
      s: hsl.s,
      l: hsl.l
    })];
  }

  function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;
    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
      hsl.h = (hsl.h + part) % 360;
      ret.push(tinycolor(hsl));
    }

    return ret;
  }

  function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h,
        s = hsv.s,
        v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
      ret.push(tinycolor({
        h: h,
        s: s,
        v: v
      }));
      v = (v + modification) % 1;
    }

    return ret;
  } // Utility Functions
  // ---------------------


  tinycolor.mix = function (color1, color2, amount) {
    amount = amount === 0 ? 0 : amount || 50;
    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();
    var p = amount / 100;
    var rgba = {
      r: (rgb2.r - rgb1.r) * p + rgb1.r,
      g: (rgb2.g - rgb1.g) * p + rgb1.g,
      b: (rgb2.b - rgb1.b) * p + rgb1.b,
      a: (rgb2.a - rgb1.a) * p + rgb1.a
    };
    return tinycolor(rgba);
  }; // Readability Functions
  // ---------------------
  // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
  // `contrast`
  // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)


  tinycolor.readability = function (color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
  }; // `isReadable`
  // Ensure that foreground and background color combinations meet WCAG2 guidelines.
  // The third argument is an optional Object.
  //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
  //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
  // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.
  // *Example*
  //    tinycolor.isReadable("#000", "#111") => false
  //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false


  tinycolor.isReadable = function (color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;
    out = false;
    wcag2Parms = validateWCAG2Parms(wcag2);

    switch (wcag2Parms.level + wcag2Parms.size) {
      case "AAsmall":
      case "AAAlarge":
        out = readability >= 4.5;
        break;

      case "AAlarge":
        out = readability >= 3;
        break;

      case "AAAsmall":
        out = readability >= 7;
        break;
    }

    return out;
  }; // `mostReadable`
  // Given a base color and a list of possible foreground or background
  // colors for that base, returns the most readable color.
  // Optionally returns Black or White if the most readable color is unreadable.
  // *Example*
  //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
  //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
  //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
  //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"


  tinycolor.mostReadable = function (baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors;
    level = args.level;
    size = args.size;

    for (var i = 0; i < colorList.length; i++) {
      readability = tinycolor.readability(baseColor, colorList[i]);

      if (readability > bestScore) {
        bestScore = readability;
        bestColor = tinycolor(colorList[i]);
      }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {
      "level": level,
      "size": size
    }) || !includeFallbackColors) {
      return bestColor;
    } else {
      args.includeFallbackColors = false;
      return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
    }
  }; // Big List of Colors
  // ------------------
  // <http://www.w3.org/TR/css3-color/#svg-color>


  var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
  }; // Make it easy to access colors via `hexNames[hex]`

  var hexNames = tinycolor.hexNames = flip(names); // Utilities
  // ---------
  // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`

  function flip(o) {
    var flipped = {};

    for (var i in o) {
      if (o.hasOwnProperty(i)) {
        flipped[o[i]] = i;
      }
    }

    return flipped;
  } // Return a valid alpha value [0,1] with all invalid values being set to 1


  function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
      a = 1;
    }

    return a;
  } // Take input from [0, n] and return it as [0, 1]


  function bound01(n, max) {
    if (isOnePointZero(n)) {
      n = "100%";
    }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n))); // Automatically convert percentage into number

    if (processPercent) {
      n = parseInt(n * max, 10) / 100;
    } // Handle floating point rounding errors


    if (Math.abs(n - max) < 0.000001) {
      return 1;
    } // Convert into [0, 1] range if it isn't already


    return n % max / parseFloat(max);
  } // Force a number between 0 and 1


  function clamp01(val) {
    return mathMin(1, mathMax(0, val));
  } // Parse a base-16 hex value into a base-10 integer


  function parseIntFromHex(val) {
    return parseInt(val, 16);
  } // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
  // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>


  function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
  } // Check to see if string passed in is a percentage


  function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
  } // Force a hex value to have 2 characters


  function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
  } // Replace a decimal with it's percentage value


  function convertToPercentage(n) {
    if (n <= 1) {
      n = n * 100 + "%";
    }

    return n;
  } // Converts a decimal to a hex value


  function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
  } // Converts a hex value to a decimal


  function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
  }

  var matchers = function () {
    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?"; // <http://www.w3.org/TR/css3-values/#number-value>

    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?"; // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.

    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")"; // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren

    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    return {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
  }(); // `isValidCSSUnit`
  // Take in a single string / number and check to see if it looks like a CSS unit
  // (see `matchers` above for definition).


  function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
  } // `stringInputToObject`
  // Permissive string parsing.  Take in a number of formats, and output an object
  // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`


  function stringInputToObject(color) {
    color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
    var named = false;

    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color == 'transparent') {
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
        format: "name"
      };
    } // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.


    var match;

    if (match = matchers.rgb.exec(color)) {
      return {
        r: match[1],
        g: match[2],
        b: match[3]
      };
    }

    if (match = matchers.rgba.exec(color)) {
      return {
        r: match[1],
        g: match[2],
        b: match[3],
        a: match[4]
      };
    }

    if (match = matchers.hsl.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        l: match[3]
      };
    }

    if (match = matchers.hsla.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        l: match[3],
        a: match[4]
      };
    }

    if (match = matchers.hsv.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        v: match[3]
      };
    }

    if (match = matchers.hsva.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        v: match[3],
        a: match[4]
      };
    }

    if (match = matchers.hex8.exec(color)) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        a: convertHexToDecimal(match[4]),
        format: named ? "name" : "hex8"
      };
    }

    if (match = matchers.hex6.exec(color)) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        format: named ? "name" : "hex"
      };
    }

    if (match = matchers.hex4.exec(color)) {
      return {
        r: parseIntFromHex(match[1] + '' + match[1]),
        g: parseIntFromHex(match[2] + '' + match[2]),
        b: parseIntFromHex(match[3] + '' + match[3]),
        a: convertHexToDecimal(match[4] + '' + match[4]),
        format: named ? "name" : "hex8"
      };
    }

    if (match = matchers.hex3.exec(color)) {
      return {
        r: parseIntFromHex(match[1] + '' + match[1]),
        g: parseIntFromHex(match[2] + '' + match[2]),
        b: parseIntFromHex(match[3] + '' + match[3]),
        format: named ? "name" : "hex"
      };
    }

    return false;
  }

  function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {
      "level": "AA",
      "size": "small"
    };
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();

    if (level !== "AA" && level !== "AAA") {
      level = "AA";
    }

    if (size !== "small" && size !== "large") {
      size = "small";
    }

    return {
      "level": level,
      "size": size
    };
  } // Node: Export function


  if ( true && module.exports) {
    module.exports = tinycolor;
  } // AMD/requirejs: Define the module
  else if (true) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return tinycolor;
      }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } // Browser: Expose to window
    else {}
})(Math);

/***/ }),

/***/ 1349:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * tinygradient (v1.1.5)
 * @copyright 2014-2021 Damien "Mistic" Sorel <contact@git.strangeplanet.fr>
 * @licence MIT
 */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(119)) : 0;
})(this, function (tinycolor2) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var tinycolor2__default = /*#__PURE__*/_interopDefaultLegacy(tinycolor2);
  /**
   * @typedef {Object} TinyGradient.StopInput
   * @property {ColorInput} color
   * @property {number} pos
   */

  /**
   * @typedef {Object} TinyGradient.StepValue
   * @type {number} [r]
   * @type {number} [g]
   * @type {number} [b]
   * @type {number} [h]
   * @type {number} [s]
   * @type {number} [v]
   * @type {number} [a]
   */

  /**
   * @type {StepValue}
   */


  var RGBA_MAX = {
    r: 256,
    g: 256,
    b: 256,
    a: 1
  };
  /**
   * @type {StepValue}
   */

  var HSVA_MAX = {
    h: 360,
    s: 1,
    v: 1,
    a: 1
  };
  /**
   * Linearly compute the step size between start and end (not normalized)
   * @param {StepValue} start
   * @param {StepValue} end
   * @param {number} steps - number of desired steps
   * @return {StepValue}
   */

  function stepize(start, end, steps) {
    var step = {};

    for (var k in start) {
      if (start.hasOwnProperty(k)) {
        step[k] = steps === 0 ? 0 : (end[k] - start[k]) / steps;
      }
    }

    return step;
  }
  /**
   * Compute the final step color
   * @param {StepValue} step - from `stepize`
   * @param {StepValue} start
   * @param {number} i - color index
   * @param {StepValue} max - rgba or hsva of maximum values for each channel
   * @return {StepValue}
   */


  function interpolate(step, start, i, max) {
    var color = {};

    for (var k in start) {
      if (start.hasOwnProperty(k)) {
        color[k] = step[k] * i + start[k];
        color[k] = color[k] < 0 ? color[k] + max[k] : max[k] !== 1 ? color[k] % max[k] : color[k];
      }
    }

    return color;
  }
  /**
   * Generate gradient with RGBa interpolation
   * @param {StopInput} stop1
   * @param {StopInput} stop2
   * @param {number} steps
   * @return {tinycolor[]} color1 included, color2 excluded
   */


  function interpolateRgb(stop1, stop2, steps) {
    var start = stop1.color.toRgb();
    var end = stop2.color.toRgb();
    var step = stepize(start, end, steps);
    var gradient = [stop1.color];

    for (var i = 1; i < steps; i++) {
      var color = interpolate(step, start, i, RGBA_MAX);
      gradient.push(tinycolor2__default['default'](color));
    }

    return gradient;
  }
  /**
   * Generate gradient with HSVa interpolation
   * @param {StopInput} stop1
   * @param {StopInput} stop2
   * @param {number} steps
   * @param {boolean|'long'|'short'} mode
   * @return {tinycolor[]} color1 included, color2 excluded
   */


  function interpolateHsv(stop1, stop2, steps, mode) {
    var start = stop1.color.toHsv();
    var end = stop2.color.toHsv(); // rgb interpolation if one of the steps in grayscale

    if (start.s === 0 || end.s === 0) {
      return interpolateRgb(stop1, stop2, steps);
    }

    var trigonometric;

    if (typeof mode === 'boolean') {
      trigonometric = mode;
    } else {
      var trigShortest = start.h < end.h && end.h - start.h < 180 || start.h > end.h && start.h - end.h > 180;
      trigonometric = mode === 'long' && trigShortest || mode === 'short' && !trigShortest;
    }

    var step = stepize(start, end, steps);
    var gradient = [stop1.color]; // recompute hue

    var diff;

    if (start.h <= end.h && !trigonometric || start.h >= end.h && trigonometric) {
      diff = end.h - start.h;
    } else if (trigonometric) {
      diff = 360 - end.h + start.h;
    } else {
      diff = 360 - start.h + end.h;
    }

    step.h = Math.pow(-1, trigonometric ? 1 : 0) * Math.abs(diff) / steps;

    for (var i = 1; i < steps; i++) {
      var color = interpolate(step, start, i, HSVA_MAX);
      gradient.push(tinycolor2__default['default'](color));
    }

    return gradient;
  }
  /**
   * Compute substeps between each stops
   * @param {StopInput[]} stops
   * @param {number} steps
   * @return {number[]}
   */


  function computeSubsteps(stops, steps) {
    var l = stops.length; // validation

    steps = parseInt(steps, 10);

    if (isNaN(steps) || steps < 2) {
      throw new Error('Invalid number of steps (< 2)');
    }

    if (steps < l) {
      throw new Error('Number of steps cannot be inferior to number of stops');
    } // compute substeps from stop positions


    var substeps = [];

    for (var i = 1; i < l; i++) {
      var step = (steps - 1) * (stops[i].pos - stops[i - 1].pos);
      substeps.push(Math.max(1, Math.round(step)));
    } // adjust number of steps


    var totalSubsteps = 1;

    for (var n = l - 1; n--;) {
      totalSubsteps += substeps[n];
    }

    while (totalSubsteps !== steps) {
      if (totalSubsteps < steps) {
        var min = Math.min.apply(null, substeps);
        substeps[substeps.indexOf(min)]++;
        totalSubsteps++;
      } else {
        var max = Math.max.apply(null, substeps);
        substeps[substeps.indexOf(max)]--;
        totalSubsteps--;
      }
    }

    return substeps;
  }
  /**
   * Compute the color at a specific position
   * @param {StopInput[]} stops
   * @param {number} pos
   * @param {string} method
   * @param {StepValue} max
   * @returns {tinycolor}
   */


  function computeAt(stops, pos, method, max) {
    if (pos < 0 || pos > 1) {
      throw new Error('Position must be between 0 and 1');
    }

    var start, end;

    for (var i = 0, l = stops.length; i < l - 1; i++) {
      if (pos >= stops[i].pos && pos < stops[i + 1].pos) {
        start = stops[i];
        end = stops[i + 1];
        break;
      }
    }

    if (!start) {
      start = end = stops[stops.length - 1];
    }

    var step = stepize(start.color[method](), end.color[method](), (end.pos - start.pos) * 100);
    var color = interpolate(step, start.color[method](), (pos - start.pos) * 100, max);
    return tinycolor2__default['default'](color);
  }

  var TinyGradient = /*#__PURE__*/function () {
    /**
     * @param {StopInput[]|ColorInput[]} stops
     * @returns {TinyGradient}
     */
    function TinyGradient(stops) {
      // validation
      if (stops.length < 2) {
        throw new Error('Invalid number of stops (< 2)');
      }

      var havingPositions = stops[0].pos !== undefined;
      var l = stops.length;
      var p = -1;
      var lastColorLess = false; // create tinycolor objects and clean positions

      this.stops = stops.map(function (stop, i) {
        var hasPosition = stop.pos !== undefined;

        if (havingPositions ^ hasPosition) {
          throw new Error('Cannot mix positionned and not posionned color stops');
        }

        if (hasPosition) {
          var hasColor = stop.color !== undefined;

          if (!hasColor && (lastColorLess || i === 0 || i === l - 1)) {
            throw new Error('Cannot define two consecutive position-only stops');
          }

          lastColorLess = !hasColor;
          stop = {
            color: hasColor ? tinycolor2__default['default'](stop.color) : null,
            colorLess: !hasColor,
            pos: stop.pos
          };

          if (stop.pos < 0 || stop.pos > 1) {
            throw new Error('Color stops positions must be between 0 and 1');
          } else if (stop.pos < p) {
            throw new Error('Color stops positions are not ordered');
          }

          p = stop.pos;
        } else {
          stop = {
            color: tinycolor2__default['default'](stop.color !== undefined ? stop.color : stop),
            pos: i / (l - 1)
          };
        }

        return stop;
      });

      if (this.stops[0].pos !== 0) {
        this.stops.unshift({
          color: this.stops[0].color,
          pos: 0
        });
        l++;
      }

      if (this.stops[l - 1].pos !== 1) {
        this.stops.push({
          color: this.stops[l - 1].color,
          pos: 1
        });
      }
    }
    /**
     * Return new instance with reversed stops
     * @return {TinyGradient}
     */


    var _proto = TinyGradient.prototype;

    _proto.reverse = function reverse() {
      var stops = [];
      this.stops.forEach(function (stop) {
        stops.push({
          color: stop.color,
          pos: 1 - stop.pos
        });
      });
      return new TinyGradient(stops.reverse());
    }
    /**
     * Return new instance with looped stops
     * @return {TinyGradient}
     */
    ;

    _proto.loop = function loop() {
      var stops1 = [];
      var stops2 = [];
      this.stops.forEach(function (stop) {
        stops1.push({
          color: stop.color,
          pos: stop.pos / 2
        });
      });
      this.stops.slice(0, -1).forEach(function (stop) {
        stops2.push({
          color: stop.color,
          pos: 1 - stop.pos / 2
        });
      });
      return new TinyGradient(stops1.concat(stops2.reverse()));
    }
    /**
     * Generate gradient with RGBa interpolation
     * @param {number} steps
     * @return {tinycolor[]}
     */
    ;

    _proto.rgb = function rgb(steps) {
      var _this = this;

      var substeps = computeSubsteps(this.stops, steps);
      var gradient = [];
      this.stops.forEach(function (stop, i) {
        if (stop.colorLess) {
          stop.color = interpolateRgb(_this.stops[i - 1], _this.stops[i + 1], 2)[1];
        }
      });

      for (var i = 0, l = this.stops.length; i < l - 1; i++) {
        var rgb = interpolateRgb(this.stops[i], this.stops[i + 1], substeps[i]);
        gradient.splice.apply(gradient, [gradient.length, 0].concat(rgb));
      }

      gradient.push(this.stops[this.stops.length - 1].color);
      return gradient;
    }
    /**
     * Generate gradient with HSVa interpolation
     * @param {number} steps
     * @param {boolean|'long'|'short'} [mode=false]
     *    - false to step in clockwise
     *    - true to step in trigonometric order
     *    - 'short' to use the shortest way
     *    - 'long' to use the longest way
     * @return {tinycolor[]}
     */
    ;

    _proto.hsv = function hsv(steps, mode) {
      var _this2 = this;

      var substeps = computeSubsteps(this.stops, steps);
      var gradient = [];
      this.stops.forEach(function (stop, i) {
        if (stop.colorLess) {
          stop.color = interpolateHsv(_this2.stops[i - 1], _this2.stops[i + 1], 2, mode)[1];
        }
      });

      for (var i = 0, l = this.stops.length; i < l - 1; i++) {
        var hsv = interpolateHsv(this.stops[i], this.stops[i + 1], substeps[i], mode);
        gradient.splice.apply(gradient, [gradient.length, 0].concat(hsv));
      }

      gradient.push(this.stops[this.stops.length - 1].color);
      return gradient;
    }
    /**
     * Generate CSS3 command (no prefix) for this gradient
     * @param {String} [mode=linear] - 'linear' or 'radial'
     * @param {String} [direction] - default is 'to right' or 'ellipse at center'
     * @return {String}
     */
    ;

    _proto.css = function css(mode, direction) {
      mode = mode || 'linear';
      direction = direction || (mode === 'linear' ? 'to right' : 'ellipse at center');
      var css = mode + '-gradient(' + direction;
      this.stops.forEach(function (stop) {
        css += ', ' + (stop.colorLess ? '' : stop.color.toRgbString() + ' ') + stop.pos * 100 + '%';
      });
      css += ')';
      return css;
    }
    /**
     * Returns the color at specific position with RGBa interpolation
     * @param {number} pos, between 0 and 1
     * @return {tinycolor}
     */
    ;

    _proto.rgbAt = function rgbAt(pos) {
      return computeAt(this.stops, pos, 'toRgb', RGBA_MAX);
    }
    /**
     * Returns the color at specific position with HSVa interpolation
     * @param {number} pos, between 0 and 1
     * @return {tinycolor}
     */
    ;

    _proto.hsvAt = function hsvAt(pos) {
      return computeAt(this.stops, pos, 'toHsv', HSVA_MAX);
    };

    return TinyGradient;
  }();
  /**
   * @param {StopInput[]|ColorInput[]|StopInput...|ColorInput...} stops
   * @returns {TinyGradient}
   */


  var tinygradient = function tinygradient(stops) {
    // varargs
    if (arguments.length === 1) {
      if (!Array.isArray(arguments[0])) {
        throw new Error('"stops" is not an array');
      }

      stops = arguments[0];
    } else {
      stops = Array.prototype.slice.call(arguments);
    }

    return new TinyGradient(stops);
  };

  return tinygradient;
});

/***/ }),

/***/ 802:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_cache.bfc303040cee293a669d.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 1087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_events.60c0eb2f0a6a8095526b.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 8785:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_requests.83b8a08e76a8c1bf870c.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 3678:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_session.5586379f38ef0b8a0948.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 727:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_ui.353aee23863a537cfc53.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 6603:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Farcheo_utilities.45915d87ae1effb41b41.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 8903:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Clink defer rel=\"stylesheet\" href=\"\u002Fcss\u002Fmap.ac8a39a3a20c4940b3f4.css\"\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 4161:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Clink defer rel=\"stylesheet\" href=\"\u002Fcss\u002Fmodules.eff6e00d71d50300030c.css\"\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 8075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Fplot.c7f33e24d705b42e2e74.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 7909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Clink defer rel=\"stylesheet\" href=\"\u002Fcss\u002Fplot.1785395f7b2af3aca031.css\"\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 8635:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cscript defer type=\"text\u002Fjavascript\" src=\"\u002Fjs\u002Ftemplate_basic.bfc201e53652c13ee649.js\"\u003E\u003C\u002Fscript\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 7520:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Clink defer rel=\"stylesheet\" href=\"\u002Fcss\u002Ftemplate_basic.922bf98eeee618b42944.css\"\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 237:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var popDict = {
	'Africa': {
		'name': 'Africa'
	},
	'World': {
		'name': 'World'
	},
	'Eurasia': {
		'name': 'Euroasia'
	},
	'EAS': {
		'name': 'East Asia'
	}
};;return pug_html;};
module.exports = template;

/***/ }),

/***/ 5809:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var resultsDict = {
	'PCA': {
		'name': 'PCA'
	},
	'UMAP': {
		'name': 'UMAP'
	}
};;return pug_html;};
module.exports = template;

/***/ }),

/***/ 4589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (JSON, Object, dictionary, lang, metadata, pageName, popDict, resultsDict) {
      pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml" + (pug.attr("lang", lang, true, true)) + "\u003E\u003Chead\u003E\u003Cmeta charset=\"utf-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"text\u002Fhtml; charset=utf-8\"\u003E\u003Cmeta name=\"robots\" content=\"noindex\"\u003E\u003Clink rel=\"shortcut icon\" href=\"#\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Ficon?family=Material+Icons\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap@4.5.3\u002Fdist\u002Fcss\u002Fbootstrap.min.css\" integrity=\"sha384-TX8t27EcRE3e\u002FihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2\" crossorigin=\"anonymous\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmalihu-custom-scrollbar-plugin\u002F3.1.5\u002Fjquery.mCustomScrollbar.min.css\" integrity=\"sha256-JHGEmB629pipTkMag9aMaw32I8zle24p3FpsEeI6oZU=\" crossorigin=\"anonymous\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjqueryui\u002F1.12.1\u002Fjquery-ui.min.css\" integrity=\"sha256-rByPlHULObEjJ6XQxW\u002FflG2r+22R5dKiAoef+aXWfik=\" crossorigin=\"anonymous\"\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap-select@1.13.17\u002Fdist\u002Fcss\u002Fbootstrap-select.min.css\" integrity=\"sha256-VMPhaMmJn7coDSbzwqB0jflvb+CDnoAlfStC5RogOQo=\" crossorigin=\"anonymous\"\u003E" + (null == (pug_interp = (__webpack_require__(7520).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(4161).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript\u003Ewindow.metadata = JSON.parse( " + (null == (pug_interp = JSON.stringify(metadata).replace(/<\//g, '<\\/')) ? "" : pug_interp) + " );\nwindow.name = \"" + (null == (pug_interp = pageName.replace(/<\//g, '<\\/')) ? "" : pug_interp) + "\";\nwindow.lang = \"" + (null == (pug_interp = lang.replace(/<\//g, '<\\/')) ? "" : pug_interp) + "\";\nwindow.dictionary = JSON.parse( " + (null == (pug_interp = JSON.stringify(dictionary).replace(/<\//g, '<\\/')) ? "" : pug_interp) + " );\n\u003C\u002Fscript\u003E" + (null == (pug_interp = (__webpack_require__(8903).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(7909).call)(this, locals)) ? "" : pug_interp) + "\u003Ctitle\u003EHuman Archeogenomics\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody class=\"loading\"\u003E";
pug_mixins["nav-item"] = pug_interp = function(lang, ref, name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if (ref === pageName) {
pug_html = pug_html + "\u003Cli" + (pug.attrs(pug.merge([{"class": "nav-item active"},attributes]), true)) + "\u003E\u003Ca" + (" class=\"nav-link\""+pug.attr("href", "/" + lang + "/" + ref, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003Cspan class=\"sr-only\"\u003E(current)\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
pug_html = pug_html + "\u003Cli" + (pug.attrs(pug.merge([{"class": "nav-item"},attributes]), true)) + "\u003E\u003Ca" + (" class=\"nav-link\""+pug.attr("href", "/" + lang + "/" + ref, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
};
pug_mixins["nav-dropdown-item"] = pug_interp = function(lang, ref, name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if (ref === pageName) {
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item\""+pug.attr("href", "/" + lang + "/" + ref, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item\""+pug.attr("href", "/" + lang + "/" + ref, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
};
pug_html = pug_html + "\u003Cnav class=\"navbar navbar-expand-md navbar-dark bg-dark fixed-top px-3\"\u003E\u003Ca" + (" class=\"navbar-brand\""+pug.attr("href", `/${lang}/home`, true, true)) + "\u003EArcheogenomics.eu&nbsp;&nbsp;|&nbsp;&nbsp;Human AGEs\u003C\u002Fa\u003E\u003Cbutton class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar-wrapper\" aria-controls=\"#navbar-wrapper\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"\u003E\u003Cspan class=\"navbar-toggler-icon\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003Cdiv class=\"collapse navbar-collapse\" id=\"navbar-wrapper\"\u003E\u003Cul class=\"navbar-nav mr-auto\"\u003E";
pug_mixins["nav-item"].call({
attributes: {"class": "mx-2"}
}, lang, `home`, "Main page");
pug_html = pug_html + "\u003Cli class=\"nav-item dropdown\"\u003E\u003Cdiv class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"\u003EApplications\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu bg-dark\" aria-labelledby=\"navbar-browse\"\u003E";
pug_mixins["nav-dropdown-item"](lang, `map`, "Interactive map");
pug_mixins["nav-dropdown-item"](lang, `plot`, "Interactive plot");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003Cli class=\"nav-item dropdown\"\u003E\u003Cdiv class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"\u003EHelp\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu bg-dark\" aria-labelledby=\"navbar-browse\"\u003E";
pug_mixins["nav-dropdown-item"](lang, "examples", "Examples");
pug_mixins["nav-dropdown-item"](lang, "faq", "FAQ");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
pug_mixins["nav-item"].call({
attributes: {"class": "mx-2"}
}, lang, `contact`, "Contact");
pug_html = pug_html + "\u003C\u002Ful\u003E\u003Cul class=\"navbar-nav ml-auto\"\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fnav\u003E\u003Cdiv id=\"loading-page-wrapper\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"site-wrapper\"\u003E\u003Cmain role=\"main\"\u003E";
pug_mixins["selectOption"] = pug_interp = function(el, key){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var optionsAttributes = {};
if(el.datatokens) optionsAttributes['data-tokens'] = el.datatokens;
if(el.disabled) optionsAttributes['disabled'] = el.disabled;
if(el.subtext) optionsAttributes['data-subtext'] = el.subtext;
if(el.selected) optionsAttributes['selected'] = el.selected;
if(el.content) optionsAttributes['data-content'] = el.content;
if(el.title) optionsAttributes['title'] = el.title;
if(el.attributes)
	Object.keys(el.attributes).forEach((attribute) => {
		optionsAttributes[attribute] = el.attributes[attribute];
	});

pug_html = pug_html + "\u003Coption" + (pug.attrs(pug.merge([{"value": pug.escape(key)},optionsAttributes]), true)) + "\u003E" + (pug.escape(null == (pug_interp = el.name) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
};












































pug_mixins["dropdown"] = pug_interp = function(name, elements = {}, header = null, placeholder = 'Nothing selected...'){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var headerText = header || '';
var placeholderText = header || placeholder;

pug_html = pug_html + "\u003Cselect" + (pug.attrs(pug.merge([{"class": "selectpicker","data-none-selected-text": pug.escape(headerText),"id": pug.escape(name),"name": pug.escape(name),"data-icon-base": "Material Icons","virtual-scroll": 80,"data-dropup-auto": "true","data-header": pug.escape(placeholderText)},attributes]), true)) + "\u003E";
// iterate elements
;(function(){
  var $$obj = elements;
  if ('number' == typeof $$obj.length) {
      for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
        var el = $$obj[key];
if (el.isOptgroup) {
var groupAttributes = {};
if(el.maxData) groupAttributes['data-max-options'] = el.maxData;

pug_html = pug_html + "\u003Coptgroup" + (pug.attrs(pug.merge([{"label": pug.escape(el.name)},groupAttributes]), true)) + "\u003E";
// iterate el.options
;(function(){
  var $$obj = el.options;
  if ('number' == typeof $$obj.length) {
      for (var key2 = 0, $$l = $$obj.length; key2 < $$l; key2++) {
        var el2 = $$obj[key2];
pug_mixins["selectOption"](el2, key2);
      }
  } else {
    var $$l = 0;
    for (var key2 in $$obj) {
      $$l++;
      var el2 = $$obj[key2];
pug_mixins["selectOption"](el2, key2);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Foptgroup\u003E";
}
else {
pug_mixins["selectOption"](el, key);
}
      }
  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;
      var el = $$obj[key];
if (el.isOptgroup) {
var groupAttributes = {};
if(el.maxData) groupAttributes['data-max-options'] = el.maxData;

pug_html = pug_html + "\u003Coptgroup" + (pug.attrs(pug.merge([{"label": pug.escape(el.name)},groupAttributes]), true)) + "\u003E";
// iterate el.options
;(function(){
  var $$obj = el.options;
  if ('number' == typeof $$obj.length) {
      for (var key2 = 0, $$l = $$obj.length; key2 < $$l; key2++) {
        var el2 = $$obj[key2];
pug_mixins["selectOption"](el2, key2);
      }
  } else {
    var $$l = 0;
    for (var key2 in $$obj) {
      $$l++;
      var el2 = $$obj[key2];
pug_mixins["selectOption"](el2, key2);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Foptgroup\u003E";
}
else {
pug_mixins["selectOption"](el, key);
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E";
};
pug_html = pug_html + (null == (pug_interp = (__webpack_require__(237).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(5809).call)(this, locals)) ? "" : pug_interp) + "\u003Cdiv id=\"content-wrapper\"\u003E\u003Cdiv class=\"pt-2\" id=\"content\"\u003E\u003Cdiv class=\"row my-2 pt-3\"\u003E\u003Cdiv class=\"col-2\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-8\"\u003E\u003Cdiv id=\"plot-pca\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-2\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"row my-2 p-2\"\u003E\u003Cdiv class=\"col-2\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-4\"\u003E\u003Ch4 class=\"d-block my-2\"\u003EChoose result type\u003C\u002Fh4\u003E\u003Chr\u003E";
pug_mixins["dropdown"].call({
attributes: {"data-style": "btn"}
}, "select-pca", resultsDict);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-4\"\u003E\u003Ch4 class=\"d-block my-2\"\u003EChoose data type\u003C\u002Fh4\u003E\u003Chr\u003E";
pug_mixins["dropdown"].call({
attributes: {"data-style": "btn"}
}, "select-dataset", popDict);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-2\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"row\"\u003E\u003Cp\u003E\u003C\u002Fp\u003EThe genomic data for ancient individuals visualized in the PCA and UMAP plots were generated by performing pseudo haploization of the published datasets.\nFurther for each dataset minor allele frequency of 6% and linkage disequilibrium of 0.6 were applied.\nPseudo haploid 500k Human Origins SNP data for each  ancient individual is available for download in standard binary plink BED file format.\u003C\u002Fdiv\u003E\u003Ch3 class=\"d-block mt-5 mb-2\"\u003EDownload data\u003C\u002Fh3\u003E\u003Chr\u003E\u003Cp class=\"mt-2\"\u003E\u003Ca href=\"\u002Fdata\u002Funiparental_haplogroups_and_metadata.csv\" download\u003EDownload uniparental haplogroups and metadata\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E\u003C\u002Fdiv\u003E" + (null == (pug_interp = (__webpack_require__(539).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery\u002F3.3.1\u002Fjquery.min.js\" integrity=\"sha256-FgpCb\u002FKJQlLNfOu91ta32o\u002FNMZxltwRo8QtmkMRdAu8=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery-easing\u002F1.4.1\u002Fjquery.easing.min.js\" integrity=\"sha256-H3cjtrm\u002FztDeuhCN9I4yh4iN2Ybx\u002Fy1RM7rMmAesA0k=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery-mousewheel\u002F3.1.13\u002Fjquery.mousewheel.min.js\" integrity=\"sha256-jnOjDTXIPqall8M0MyTSt98JetJuZ7Yu+1Jm7hLTF7U=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmalihu-custom-scrollbar-plugin\u002F3.1.5\u002Fjquery.mCustomScrollbar.min.js\" integrity=\"sha256-AKEjDiK2rz+d8TSPLNVNydvgJvOkG5veMAnc79FkiuE=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fpopper.js@1.16.1\u002Fdist\u002Fumd\u002Fpopper.min.js\" integrity=\"sha384-9\u002FreFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap@4.5.3\u002Fdist\u002Fjs\u002Fbootstrap.min.js\" integrity=\"sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr\u002FaWKhXdBNmNb5D92v7s\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fjson5@2.1.3\u002Fdist\u002Findex.min.js\" integrity=\"sha256-b6dyH0K\u002FnE4K1\u002Fd36PNAa96t19du7JXpzpcS9K3o4Sg=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjqueryui\u002F1.12.1\u002Fjquery-ui.min.js\" integrity=\"sha256-KM512VNnjElC30ehFwehXjx1YCHPiQkOPmqnrWtpccM=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap-select@1.13.17\u002Fdist\u002Fjs\u002Fbootstrap-select.min.js\" integrity=\"sha256-QOE02Glo1C1gHzP96JOaxyIMt4XSFv\u002FexZaYLY4dwO0=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E";
if (lang === 'pl') {
pug_html = pug_html + "\u003Cscript src=\"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fbootstrap-select@1.13.17\u002Fjs\u002Fi18n\u002Fdefaults-pl_PL.js\" integrity=\"sha256-aWaZCaqYgueDr4CzKzw7FlKCuaoJEwOOM9LJ79aSmlk=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E";
}
pug_html = pug_html + (null == (pug_interp = (__webpack_require__(8785).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(6603).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(3678).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(802).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(1087).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(8635).call)(this, locals)) ? "" : pug_interp) + "\u003Cscript defer src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fplotly.js\u002F1.33.1\u002Fplotly-basic.min.js\" integrity=\"sha256-qPutqhXQitI6ydhltlGqtkrcj2rkNRQde60nRB3BIgg=\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E" + (null == (pug_interp = (__webpack_require__(727).call)(this, locals)) ? "" : pug_interp) + (null == (pug_interp = (__webpack_require__(8075).call)(this, locals)) ? "" : pug_interp) + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "Object" in locals_for_with ?
        locals_for_with.Object :
        typeof Object !== 'undefined' ? Object : undefined, "dictionary" in locals_for_with ?
        locals_for_with.dictionary :
        typeof dictionary !== 'undefined' ? dictionary : undefined, "lang" in locals_for_with ?
        locals_for_with.lang :
        typeof lang !== 'undefined' ? lang : undefined, "metadata" in locals_for_with ?
        locals_for_with.metadata :
        typeof metadata !== 'undefined' ? metadata : undefined, "pageName" in locals_for_with ?
        locals_for_with.pageName :
        typeof pageName !== 'undefined' ? pageName : undefined, "popDict" in locals_for_with ?
        locals_for_with.popDict :
        typeof popDict !== 'undefined' ? popDict : undefined, "resultsDict" in locals_for_with ?
        locals_for_with.resultsDict :
        typeof resultsDict !== 'undefined' ? resultsDict : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ 539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Date) {
      pug_html = pug_html + "\u003Cfooter\u003E\u003Cp\u003EInstitute of Bioorganic Chemistry Polish Academy of Sciences, " + (pug.escape(null == (pug_interp = new Date().getFullYear()) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Ffooter\u003E";
    }.call(this, "Date" in locals_for_with ?
        locals_for_with.Date :
        typeof Date !== 'undefined' ? Date : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ 7055:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
}

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '',
    className,
    padding = '',
    escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '',
    padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
}

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (
    val === false ||
    val == null ||
    (!val && (key === 'class' || key === 'style'))
  ) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  var type = typeof val;
  if (
    (type === 'object' || type === 'function') &&
    typeof val.toJSON === 'function'
  ) {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + "='" + val.replace(/'/g, '&#39;') + "'";
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse) {
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
}

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html) {
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34:
        escape = '&quot;';
        break;
      case 38:
        escape = '&amp;';
        break;
      case 60:
        escape = '&lt;';
        break;
      case 62:
        escape = '&gt;';
        break;
      default:
        continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
}

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str) {
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  var context, lines, start, end;
  try {
    str = str || (__webpack_require__(7835).readFileSync)(filename, {encoding: 'utf8'});
    context = 3;
    lines = str.split('\n');
    start = Math.max(lineno - context, 0);
    end = Math.min(lines.length, lineno + context);
  } catch (ex) {
    err.message +=
      ' - could not read from ' + filename + ' (' + ex.message + ')';
    pug_rethrow(err, null, lineno);
    return;
  }

  // Error context
  context = lines
    .slice(start, end)
    .map(function(line, i) {
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
    })
    .join('\n');

  // Alter exception message
  err.path = filename;
  try {
    err.message =
      (filename || 'Pug') +
      ':' +
      lineno +
      '\n' +
      context +
      '\n\n' +
      err.message;
  } catch (e) {}
  throw err;
}


/***/ }),

/***/ 7835:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./views/mixins-pug/dropdown/style.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const style = ({"palette_primary_color":"#13446f","palette_primary_color_light":"#26537a","palette_primary_color_lightest":"#c5d1dc","palette_primary_color_dark":"#113d64","palette_primary_color_darkest":"#0d304e","palette_secondary_color":"#ffad42","palette_secondary_color_darker":"#d4861f","palette_tertiary_color_light":"#afafaf","palette_tertiary_color_lightest":"#ddd","palette_tertiary_color_lighter":"#cecece","palette_tertiary_color":"#474747","palette_tertiary_color_dark":"#2c2c2c","palette_tertiary_color_darker":"#222","palette_tertiary_color_darkest":"#141414","text_color_light":"#e6e6e6","text_color_dark":"#222","text_color_dark_faded":"#646464","background_color_light":"#eee","background_color_lightest":"#f7f7f7","present_time_color_array_string":"119,0,255,1","text_color_light_faded":"#d2d2d2"});
;// CONCATENATED MODULE: ./views/pages/map/js/events/ui/sidebars-handles.js
function initializeSidebardsHandlesEvents() {
  $(".sidebar-trigger").click(function () {
    let $sidebarWrapper = $(this).parent();

    if ($sidebarWrapper.hasClass('left')) {
      $('#content-wrapper').toggleClass("active-left");
    } else if ($sidebarWrapper.hasClass('right')) {
      $('#content-wrapper').toggleClass("active-right");
    }
    /* Trigger event for legend positioning fix */


    $sidebarWrapper.one("transitionend webkitTransitionEnd oTransitionEnd", function () {
      ArcheoEvents.broadcast('panel-activated');
    });
    $sidebarWrapper.toggleClass("active");
    $(this).find(".sidebar-arrow").toggleClass("active");
  });
}

/* harmony default export */ const sidebars_handles = (initializeSidebardsHandlesEvents);
;// CONCATENATED MODULE: ./views/pages/plot/js/events/ui.js
//import initializeRightSidebarUIEvents from './right-sidebar/index.js';
//import initializeLeftSidebarUIEvents from './left-sidebar/index.js';
//import submitQueryBuilderFiltersEvent from './query-builder-submit.js';


function initializeUIEvents() {
  //nitializeLeftSidebarUIEvents();
  //initializeRightSidebarUIEvents();
  //submitQueryBuilderFiltersEvent();
  sidebars_handles();
}

/* harmony default export */ const ui = (initializeUIEvents);
;// CONCATENATED MODULE: ./views/pages/plot/js/events/index.js


function plotTypeSelect() {
  $('#select-pca').change(function () {
    AnalysisUtilities.queryAndDisplayResults('plot-pca', ...AnalysisUtilities.getSelectedResultsInfo());
  });
}

function datasetTypeSelect() {
  $('#select-dataset').change(function () {
    AnalysisUtilities.queryAndDisplayResults('plot-pca', ...AnalysisUtilities.getSelectedResultsInfo());
  });
}

function initializePageEvents() {
  plotTypeSelect();
  datasetTypeSelect();
  ui();
}

/* harmony default export */ const events = (initializePageEvents);
;// CONCATENATED MODULE: ./views/pages/plot/js/elements/index.js


function initializePageElements() {//initializeTimeline('#timeline');
  //initializeTimelineRange('#timeline-range');
}

/* harmony default export */ const js_elements = (initializePageElements);
;// CONCATENATED MODULE: ./views/pages/plot/data/queriesData.json
const queriesData_namespaceObject = JSON.parse('{"PCA":{"selectionSet":["plot_data"]},"UMAP":{"selectionSet":["plot_data"]},"default":{}}');
;// CONCATENATED MODULE: ./views/pages/plot/utilities.js


function registerAnalysisUtilities() {
  window.AnalysisUtilities = {};

  AnalysisUtilities.getSelectedResultsInfo = function () {
    return [$('#select-pca :selected').val(), // entityId
    $('#select-pca :selected').text() + '_' + $('#select-dataset :selected').val(), //resultTypeName
    $('#select-pca :selected').text() + ' ' + $('#select-dataset :selected').text() // resultTypeDisplayName
    ];
    /*
    return {
        entityId: $('#select-pca :selected').val(),
        resultTypeName: $('#select-pca :selected').text() + '_' + $('#select-dataset :selected').val(),
        resultTypeDisplayName: $('#select-pca :selected').text() + ' ' + $('#select-dataset :selected').text()
    }*/
  }; // function was async before


  AnalysisUtilities.queryAndDisplayResults = function (plotId, entityId, resultTypeName, resultTypeDisplayName, plotlyOptions = {}) {
    return new Promise((resolution, rejection) => {
      setTimeout(() => {
        // Prevents error on plotId element not found in the DOM
        let resultsCache = ArcheoCache.getTemporaryEntry('resultsCache');
        let entityCache = resultsCache[resultTypeName];

        if (!ArcheoUtilities.isValid(entityCache)) {
          let entityQueriesData = ArcheoRequests.getEntityQueryData(queriesData_namespaceObject, entityId);
          let filters = {
            'this_is_resulttype': {
              'ResultType': {
                'id': resultTypeName
              }
            }
          };
          let query = ArcheoRequests.createGraphqlQuery(entityId, entityQueriesData['selectionSet'], filters, entityQueriesData['variablesDeclarations'] //{'$lang': 'String'}
          );
          ArcheoRequests.queryGraphQL(query, response => {
            let results = response.data[entityId];
            results = results.map(result => {
              return {
                id: result.plot_data.sample_id,
                label: result.plot_data.pop_name,
                x: result.plot_data.points[0],
                y: result.plot_data.points[1]
              };
            });
            resultsCache[resultTypeName] = results;
            ArcheoUI.createPlotly(plotId, results, resultTypeDisplayName, plotlyOptions);
            resolution(plotId);
          });
        } else {
          ArcheoUI.createPlotly(plotId, entityCache, resultTypeDisplayName, plotlyOptions);
          resolution(plotId);
        }
      }, 1000);
    });
  };
}

/* harmony default export */ const utilities = (registerAnalysisUtilities);
;// CONCATENATED MODULE: ./views/pages/plot/js/session/data/lang_defaults.js
/* harmony default export */ const lang_defaults = ({
  "en": {
    "_meta": {
      "name": "Default",
      "description": "This is a default session of the interactive map application.",
      "lang": "en",
      "creationDate": "Fri Jan 14 2022 14:00:45 GMT+0100 (Central European Standard Time)",
      "editDate": "Fri Jan 14 2022 22:00:45 GMT+0100 (Central European Standard Time)"
    },
    "layers": {
      "_order": [],
      "_counter": 0
    },
    "datasets": {
      "_order": [],
      "_counter": 0
    },
    "clustering": {
      "features": {
        "range": 1000,
        "distance": 0,
        "useCentroids": true,
        "showRegions": true,
        "labelPosition": "cluster",
        "method": {
          "distance": null,
          "region": null
        }
      },
      "attributes": {}
    },
    "filters": {
      "timeline": {
        "isActive": true,
        "yearFrom": -33000,
        "yearTo": -27000,
        "minYear": window.metadata.TimePeriod.minYear,
        "maxYear": window.metadata.TimePeriod.maxYear,
        "showPresent": true,
        "eventOnFinish": false,
        "doFilterRegions": true,
        "showPropability": true
      },
      "attributes": {
        "isActive": true,
        "available": [],
        "configs": {}
      },
      "regions": {
        "isActive": true
      }
    },
    "legend": {
      "attributes": {
        "OTHER": {
          "color": "rgba(126,126,126,1.0)",
          "name": "OTHER",
          "filtered": false,
          "group": null
        },
        "MISSING": {
          "color": "rgba(0,0,0,1.0)",
          "name": "MISSING",
          "filtered": true,
          "group": null
        }
      },
      "regions": {
        "DEFAULT": {
          "name": "Region",
          "color": {
            "background": "rgba(197, 209, 220, 0.3)",
            "stroke": "rgba(38, 83, 122, 1.0)"
          }
        }
      }
    },
    "map": {
      "position": [19.657016, 52.205848],
      "zoom": 4,
      "dataProjection": "EPSG:4326",
      "mapProjection": "EPSG:3857",
      "baseLayers": {},
      "options": {
        "basemap": {
          "name": "Light",
          "appearance": {
            "visible_layers": {
              "basemap-light-water": true,
              "basemap-light-boundaries": true,
              "basemap-light-labels": false
            },
            "colors": {
              "map-background": "#fff",
              "basemap-light-water": "rgb(204, 204, 204)",
              "basemap-light-boundaries": "rgb(153, 153, 153)",
              "basemap-light-labels": "#000"
            }
          }
        },
        "features": {
          "visible": {
            "timeline": true,
            "controls": true,
            "legend": true,
            "scale": true,
            "title": false
          },
          "appearance": {
            "map-title": "Map title",
            "map-subtitle": "Map subtitle"
          }
        }
      }
    }
  }
});
;// CONCATENATED MODULE: ./views/pages/plot/js/session/data/layer_default.js
/* harmony default export */ const layer_default = ({
  /* Source oprtions, need to reassign them */
  //"entityType": "",	
  //"iconUrl": "",
  "positionOffsetRatio": 3.0,
  "positionOffsetRelativeToggle": true,
  "displayLabelProperty": true,

  /* Point-based representations settings */
  "cardinalityByValue": true,
  "cardinalityBySize": true,
  "cardinalityByColor": false,

  /* Size settings */
  "size": [16, 40],
  "fontSizeRatio": 1.0,

  /* Weight settings */
  "weightGrowth": "linear",
  // ["linear", "polynomial", exponential]
  "weightGrowthFactor": 1.0,
  "weightScalingFactor": 1.0,
  "standardisationMethod": "max",
  // ["none", "total", "max"]
  "valueDisplay": "count",
  // ["count", "weight"]
  "blur": 100,
  "radius": 100,
  "drawingAlpha": 1.0,

  /* Blending modes */
  "blendingMode": "normal",
  "layerNameToggle": false,
  "color": '',
  "gradient": null,
  "colorToggle": true,
  "pointerToggle": true,
  "angle": '',

  /* Features visibility/filtering; Could be only for heatmap and points */
  "componentValues": {
    "special": {
      "MISSING": false,
      "OTHER": true
    },
    "data": "selectAll"
  },

  /* Piecharts/Tags settings */
  "piechartLabelsAppearance": "hover",
  "piechartLabelsShowPercent": false,
  "piechartLabelsShowCountData": true,
  "piechartLabelsSizeRatio": 1,
  "piechartLabelsOffsetRatio": 1,
  "otherRatio": 0.01,
  "otherCount": 0,
  "bodyToggle": true,

  /* Tags settings */
  "showFullStop": false,
  "padding": 7,
  "seed": 0.25,
  "outlineSizeRatio": 1,
  "backgroundSizeRatio": 1,
  "strategy": "archimedean"
});
;// CONCATENATED MODULE: ./views/pages/map/data/attributes.json
const attributes_namespaceObject = JSON.parse('{"RemainsAADR":{"":{},"sex":{"name":"Sex","entity":"Sex","selected":false},"haplogroup_y":{"name":"Haplogroup Y","entity":"HaplogroupY","type":"tree","selected":false},"haplogroup_mt":{"name":"Haplogroup Mt","entity":"HaplogroupMt","type":"tree","selected":false},"results":{"isOptgroup":true,"name":"Analysis results","options":{"admixture":{"name":"Admixture","entity":"Admixture","type":"admixture","selected":false}}}},"PersonAADR":{"":{},"sex":{"name":"Sex","entity":"Sex","selected":false},"haplogroup_y":{"name":"Haplogroup Y","entity":"HaplogroupY","type":"tree","selected":false},"haplogroup_mt":{"name":"Haplogroup Mt","entity":"HaplogroupMt","type":"tree","selected":false}},"PersonEMPOP":{"":{},"haplogroup_mt":{"name":"Haplogroup Mt","entity":"HaplogroupMt","type":"tree","selected":false}}}');
;// CONCATENATED MODULE: ./views/pages/map/data/attributesTypes.json
const attributesTypes_namespaceObject = JSON.parse('{"admixture":{"":{},"admixture_k2":{"name":"Admixture K=2","type":"admixture","selected":false},"admixture_k3":{"name":"Admixture K=3","type":"admixture","selected":false},"admixture_k4":{"name":"Admixture K=4","type":"admixture","selected":false},"admixture_k6":{"name":"Admixture K=6","type":"admixture","selected":false},"admixture_k7":{"name":"Admixture K=7","type":"admixture","selected":false},"admixture_k8":{"name":"Admixture K=8","type":"admixture","selected":false},"admixture_k9":{"name":"Admixture K=9","type":"admixture","selected":false},"admixture_k10":{"name":"Admixture K=10","type":"admixture","selected":false},"admixture_k11":{"name":"Admixture K=11","type":"admixture","selected":false},"admixture_k12":{"name":"Admixture K=12","type":"admixture","selected":false},"admixture_k13":{"name":"Admixture K=13","type":"admixture","selected":false},"admixture_k14":{"name":"Admixture K=14","type":"admixture","selected":false},"admixture_k16":{"name":"Admixture K=16","type":"admixture","selected":false},"admixture_k17":{"name":"Admixture K=17","type":"admixture","selected":false}}}');
;// CONCATENATED MODULE: ./views/pages/map/data/groups.json
const groups_namespaceObject = JSON.parse('{"special":{"isOptgroup":true,"name":"Special attributes","options":{"MISSING":{"name":"missing","filtered":false},"OTHER":{"name":"other","filtered":false}}},"attributes":{"isOptgroup":true,"name":"Data attributes","options":{}}}');
// EXTERNAL MODULE: ./node_modules/tinygradient/browser.js
var browser = __webpack_require__(1349);
;// CONCATENATED MODULE: ./views/pages/map/js/events/ui/right-sidebar/layers/new-layer/utilities.js
/* These are layer types which require substential amount of computation upon renderering */
//var HEAVY_LOAD_TYPES = new Set(['tag']);
function layerConfigSliderEventSetup(sliderObj, layerId, layerType, configName, callerName = 'onChange', refresh = false) {
  $(sliderObj.input).on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType)) {
      //sliderObj.update({});

      /* Synchronize UI with session */
      let sessionValue = ArcheoSession.get().layers[layerId].style[configName];
      if (ArcheoUtilities.isArray(sessionValue)) sliderObj.update({
        from: sessionValue[0],
        to: sessionValue[1]
      });else sliderObj.update({
        from: sessionValue
      });
    }
  });

  var eventFunction = async function (data) {
    var config = {};
    if (sliderObj.options.type === 'double') config[configName] = [data.from, data.to];else config[configName] = data.from;
    ArcheoEvents.broadcast('layer-config-change', null, {
      layerId: layerId,
      value: config,
      refresh: refresh
    });
  };

  let updateDict = {};
  updateDict[callerName] = eventFunction;
  updateDict.onUpdate = eventFunction;
  sliderObj.update(updateDict);
}

function layerConfigSpinnerEventSetup($spinner, layerId, layerType, configName, refresh = false) {
  $spinner.on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType)) {
      /* Synchronize UI with session */
      let sessionValue = ArcheoSession.get().layers[layerId].style[configName];
      $spinner.spinner("value", sessionValue);
    }
  });
  $spinner.on('spinchange spinstop', function (event, data) {
    var config = {};
    var spinnerValue = $spinner.spinner("value");

    if (ArcheoUtilities.isValid(spinnerValue)) {
      config[configName] = spinnerValue;
      $spinner.attr('last-value', spinnerValue);
      ArcheoEvents.broadcast('layer-config-change', null, {
        layerId: layerId,
        value: config,
        refresh: refresh
      });
    } else {
      $spinner.spinner('value', $spinner.attr('last-value'));
    }
  });
}

function layerAngleEventSetup(sliderObj, layerId, layerType, configName, callerName = 'onChange') {
  $(sliderObj.input).on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType)) {
      //sliderObj.update({});

      /* Synchronize UI with session */
      let sessionValue = ArcheoSession.get().layers[layerId].style[configName];
      sliderObj.anglePicker("setValue", sessionValue);
    }
  });

  var eventFunction = async function (event, data) {
    var config = {};
    config[configName] = data.value;
    ArcheoEvents.broadcast('layer-config-change', null, {
      layerId: layerId,
      value: config
    });
  };

  sliderObj.anglePicker({
    change: eventFunction
  });
}

function layerConfigCheckboxEventSetup(checkboxObj, layerId, layerType, configName, refresh = false) {
  $(checkboxObj).on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType)) {
      /* Synchronize UI with session */
      let sessionValue = ArcheoSession.get().layers[layerId].style[configName];
      if (sessionValue) $(checkboxObj).addClass('active');else $(checkboxObj).removeClass('active'); //$(checkboxObj).trigger('update');
    }
  });
  $(checkboxObj).on('click update', function (event) {
    let config = {};
    if (event.type === 'click')
      /* The class did not managed to switch yet, so the check must be negated for true value */
      config[configName] = !$(checkboxObj).hasClass('active'); // negation applied intentionally
    else config[configName] = $(checkboxObj).hasClass('active');
    ArcheoEvents.broadcast('layer-config-change', null, {
      layerId: layerId,
      value: config,
      refresh: refresh
    });
  });
}

function layerColorToggleCheckboxEventSetup(checkboxObj, layerId, layerType, configName) {
  $(checkboxObj).on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType)) {
      /* Synchronize UI with session */
      let sessionValue = ArcheoSession.get().layers[layerId].style[configName];
      if (sessionValue) $(checkboxObj).addClass('active');else $(checkboxObj).removeClass('active'); //$(checkboxObj).trigger('update');
    }
  });
  $(checkboxObj).on('click update', function (event) {
    let config = {};
    if (event.type === 'click')
      /* The class did not managed to switch yet, so the check must be negated for true value */
      config[configName] = !$(checkboxObj).hasClass('active'); // negation applied intentionally
    else config[configName] = $(checkboxObj).hasClass('active');
    ArcheoEvents.broadcast(['layer-config-change', 'layer-visibility-change'], null, {
      layerId: layerId,
      value: config,
      refreshRegions: true
    });
  });
}

function layerConfigRadiobuttonEventSetup(radiobuttonWrapper, layerId, layerType, configName, refresh = false) {
  $(radiobuttonWrapper).on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType)) $(checkboxObj).find("[checked='']").trigger('update');
  });
  $(radiobuttonWrapper).on('change update', 'input', null, function (event) {
    var $input = $(event.target);
    let config = {};
    config[configName] = $input.attr('value');
    ArcheoEvents.broadcast('layer-config-change', null, {
      layerId: layerId,
      value: config,
      refresh: refresh
    });
  });
}

function layerSettingSliderEventSetup(sliderObj, layerId, layerType, settingName, callerName = 'onChange') {
  $(sliderObj.input).on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType)) {
      sliderObj.update({});
    }
  });

  var eventFunction = async function (data) {
    let value;
    if (sliderObj.options.type === 'double') value = [data.from, data.to];else value = data.from;
    ArcheoEvents.broadcast('layer-setting-change', null, {
      layerId: layerId,
      setting: settingName,
      value: value
    });
  };

  let updateDict = {};
  updateDict[callerName] = eventFunction;
  updateDict.onUpdate = eventFunction;
  sliderObj.update(updateDict);
}

function layerConfigSelectEventSetup(selectObj, layerId, layerType, configName, refresh = false) {
  $(selectObj).on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType)) {
      selectObj.trigger('changed.bs.select');
    }
  });
  $(selectObj).on('changed.bs.select', function (event) {
    var config = {};
    config[configName] = selectObj.val();
    ArcheoEvents.broadcast('layer-config-change', null, {
      layerId: layerId,
      value: config,
      refresh: refresh
    });
  });
}

function layerConfigColorPickEventSetup(colorPickerObj, layerId, notLayerType, callerName = 'move', refresh = false) {
  $(colorPickerObj).on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(notLayerType) || data.value !== notLayerType)) {
      let currentColor = colorPickerObj.spectrum('get');
      colorPickerObj.trigger(`${callerName}.spectrum`, [currentColor]);
    }
  });
  colorPickerObj.on(`${callerName}.spectrum change.spectrum`, function (e, color) {
    let rgbColor = color.toRgbString();
    ArcheoEvents.broadcast('layer-color-change', null, {
      layerId: layerId,
      value: rgbColor,
      refresh: refresh
    });
  });
  /* Initialy run event to synchronize UI with layer config */

  $(colorPickerObj).trigger('layer-type-change', [{
    layerId: layerId
  }]);
} // handler:color:change
// handler:drag:end
// layerGradientInput


function layerConfigGradientPickEventSetup(gradientPicker, layerId, layerType, refresh = false) {
  let gradientEl = $(gradientPicker.el);
  gradientEl.on('layer-type-change', function (event, data) {
    if (data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType)) {
      gradientPicker.change();
    }
  });

  var changeFunction = function (handler) {
    var gradientColor = gradientPicker.getColorValue(); //var gradientCss = gradientPicker.getValue();

    if (ArcheoUtilities.isValidNonEmptyString(gradientColor)) {
      //var rgbColors = gradientColor.split('%, ');
      ArcheoEvents.broadcast('layer-gradient-change', '.layer', {
        layerId: layerId,
        value: ArcheoUtilities.gradientToArray(gradientColor),
        refresh: refresh
      });
    }
  };

  gradientPicker.on(`change`, changeFunction);
  gradientPicker.on(`handler:color:change`, changeFunction);
  gradientPicker.on(`handler:drag:end`, changeFunction);
  gradientPicker.on(`handler:remove`, changeFunction);
  gradientPicker.on(`handler:add`, changeFunction);
}

function sizeSliderSettingSetup($obj, params = {}) {
  return ArcheoUI.initializeSlider($obj, {
    min: 10,
    max: 100,
    from: 20,
    step: 1,
    type: 'single',
    postfix: 'px',
    drag_interval: true,
    ...params
  });
}

function getDataSourceAttributeValues(datasetId, layerId, attributeId, attributeType) {
  //let features = ArcheoMap.getDataSourceFeatures(datasetId);
  var features = ArcheoCache.getDatasetFeatures(datasetId);
  var attributesValues = new Set();

  if (attributeType === "admixture") {
    /* Update decoration for every feature */
    let componentsCount;
    features.forEach(feature => {
      var decoration = ArcheoMap.setupFeatureAttributesData(feature, layerId);
      componentsCount = decoration.attributeCount;
    });
    let valuesArray = [];

    for (var i = 1; i < componentsCount + 1; ++i) valuesArray.push(`k #${i}`);

    return valuesArray;
  } else {
    features.forEach(feature => {
      /* Change to decoration */
      let decoration = ArcheoMap.setupFeatureAttributesData(feature, layerId);
      let value = decoration.attributeValue;
      if (ArcheoUtilities.isValid(value) && value !== 'MISSING') attributesValues.add(value);
    });
    return Array.from(attributesValues);
  }
}


;// CONCATENATED MODULE: ./views/pages/map/js/events/ui/right-sidebar/layers/new-layer/initialize-layer-types-settings.js


function setPointSettingsEvents(elementsDict, layerId) {
  /* Appearance */
  layerConfigCheckboxEventSetup(elementsDict.bodyToggleCheckbox, layerId, 'point', 'bodyToggle');
  layerConfigSliderEventSetup(elementsDict.outlineSlider, layerId, 'point', 'outlineSizeRatio', 'onFinish');
  layerConfigSliderEventSetup(elementsDict.fillSlider, layerId, 'point', 'backgroundSizeRatio', 'onFinish');
}

function setPointSettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Body toggle */

  var bodyToggleCheckboxId = layerId + '_point-appearance-body';
  var $bodyToggleCheckbox = newLayerElement.find('#point-appearance-body');
  $bodyToggleCheckbox.attr('name', bodyToggleCheckboxId);
  $bodyToggleCheckbox.attr('id', bodyToggleCheckboxId);
  ArcheoUI.toggleCheckbox($bodyToggleCheckbox, layerConfig.style.bodyToggle); // Outline

  var outlineSliderId = layerId + '_point-appearance-outline-size';
  var $outlineSlider = newLayerElement.find('#point-appearance-outline-size');
  $outlineSlider.attr('name', outlineSliderId);
  $outlineSlider.attr('id', outlineSliderId);
  var outlineSliderObj = ArcheoUI.initializeSlider($outlineSlider, {
    min: 0,
    max: 6.,
    from: layerConfig.style.outlineSizeRatio,
    step: 0.01,
    type: 'single',
    extra_classes: 'point-appearance-outline-size'
  }); // Fill

  var fillSliderId = layerId + '_point-appearance-body-size';
  var $fillSlider = newLayerElement.find('#point-appearance-body-size');
  $fillSlider.attr('name', fillSliderId);
  $fillSlider.attr('id', fillSliderId);
  var fillSliderObj = ArcheoUI.initializeSlider($fillSlider, {
    min: 0,
    max: 6.,
    from: layerConfig.style.backgroundSizeRatio,
    // get from session
    step: 0.01,
    type: 'single',
    extra_classes: 'point-appearance-body-size'
  });
  setPointSettingsEvents({
    'bodyToggleCheckbox': $bodyToggleCheckbox,
    'outlineSlider': outlineSliderObj,
    'fillSlider': fillSliderObj
  }, layerId);
}

function setPiechartSettingsEvents(elementsDict, layerId) {
  layerConfigRadiobuttonEventSetup(elementsDict.labelAppearanceRadiobutton, layerId, 'piechart', 'piechartLabelsAppearance', true);
  layerConfigCheckboxEventSetup(elementsDict.labelCountDataCheckbox, layerId, 'piechart', 'piechartLabelsShowCountData', true);
  layerConfigCheckboxEventSetup(elementsDict.labelPercentCheckbox, layerId, 'piechart', 'piechartLabelsShowPercent', true);
  layerConfigSliderEventSetup(elementsDict.labelSizeSlider, layerId, 'piechart', 'piechartLabelsSizeRatio', 'onFinish', true);
  layerConfigSliderEventSetup(elementsDict.labelOffsetSlider, layerId, 'piechart', 'piechartLabelsOffsetRatio', 'onFinish', true);
}

function setPiechartSettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Labels appearance options */

  var labelAppearanceRadiobuttonId = layerId + '_piechart-label-appearance';
  var $labelAppearanceRadiobutton = newLayerElement.find('#piechart-label-appearance');
  $labelAppearanceRadiobutton.attr('name', labelAppearanceRadiobuttonId);
  $labelAppearanceRadiobutton.attr('id', labelAppearanceRadiobuttonId);
  $labelAppearanceRadiobutton.find('input').attr('name', labelAppearanceRadiobuttonId);
  $labelAppearanceRadiobutton.find(`input[value=${layerConfig.style.piechartLabelsAppearance}]`).click();
  /* Labels show count data */

  var labelCountDataCheckboxId = layerId + '_piechart-label-count-toggle';
  var $labelCountDataCheckbox = newLayerElement.find('#piechart-label-count-toggle');
  $labelCountDataCheckbox.attr('name', labelCountDataCheckboxId);
  $labelCountDataCheckbox.attr('id', labelCountDataCheckboxId);
  if (!ArcheoUtilities.isValid(layerConfig.style.piechartLabelsShowCountData)) layerConfig.style.piechartLabelsShowCountData = true;
  ArcheoUI.toggleCheckbox($labelCountDataCheckbox, layerConfig.style.piechartLabelsShowCountData);
  /* Labels percetanges */

  var labelPercentCheckboxId = layerId + '_piechart-label-percent';
  var $labelPercentCheckbox = newLayerElement.find('#piechart-label-percent');
  $labelPercentCheckbox.attr('name', labelPercentCheckboxId);
  $labelPercentCheckbox.attr('id', labelPercentCheckboxId);
  ArcheoUI.toggleCheckbox($labelPercentCheckbox, layerConfig.style.piechartLabelsShowPercent);
  /* Labels size ratio */

  var labelSizeSliderId = layerId + '_piechart-label-size';
  var $labelSizeSlider = newLayerElement.find('#piechart-label-size');
  $labelSizeSlider.attr('name', labelSizeSliderId);
  $labelSizeSlider.attr('id', labelSizeSliderId);
  var labelSizeSliderObj = ArcheoUI.initializeSlider($labelSizeSlider, {
    min: 0,
    max: 3,
    from: layerConfig.style.piechartLabelsSizeRatio,
    step: 0.01,
    type: 'single' //extra_classes: 'piechart-label-size'

  });
  /* Labels offset ratio */

  var labelOffsetSliderId = layerId + '_piechart-label-offset';
  var $labelOffsetSlider = newLayerElement.find('#piechart-label-offset');
  $labelOffsetSlider.attr('name', labelOffsetSliderId);
  $labelOffsetSlider.attr('id', labelOffsetSliderId);
  var labelOffsetSliderObj = ArcheoUI.initializeSlider($labelOffsetSlider, {
    min: 0,
    max: 5,
    from: layerConfig.style.piechartLabelsOffsetRatio,
    step: 0.01,
    type: 'single' //extra_classes: 'piechart-others-slider',

  });
  setPiechartSettingsEvents({
    'labelAppearanceRadiobutton': $labelAppearanceRadiobutton,
    'labelPercentCheckbox': $labelPercentCheckbox,
    'labelSizeSlider': labelSizeSliderObj,
    'labelOffsetSlider': labelOffsetSliderObj,
    'labelCountDataCheckbox': $labelCountDataCheckbox
  }, layerId);
}

function setHeatmapSettingsEvents(elementsDict, layerId) {
  layerSettingSliderEventSetup(elementsDict.radiusSlider, layerId, 'heatmap', 'radius');
  layerSettingSliderEventSetup(elementsDict.blurSlider, layerId, 'heatmap', 'blur');
}

function setHeatmapSettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Heatmap radius */

  var radiusSliderId = layerId + '_heatmap-radius';
  var $radiusSlider = newLayerElement.find('#heatmap-radius');
  $radiusSlider.attr('name', radiusSliderId);
  $radiusSlider.attr('id', radiusSliderId);
  var radiusSliderObj = sizeSliderSettingSetup($radiusSlider, {
    from: layerConfig.settings.radius,
    min: 1,
    max: 1000
  });
  /* Heatmap blur setting */

  var blurSliderId = layerId + '_heatmap-blur';
  var $blurSlider = newLayerElement.find('#heatmap-blur');
  $blurSlider.attr('name', blurSliderId);
  $blurSlider.attr('id', blurSliderId);
  var blurSliderObj = sizeSliderSettingSetup($blurSlider, {
    from: layerConfig.settings.blur,
    min: 1,
    max: 1000
  });
  setHeatmapSettingsEvents({
    'blurSlider': blurSliderObj,
    'radiusSlider': radiusSliderObj
  }, layerId);
  /* Initialize blur size */
  // It is initialized inside layerChange function
}

function setTagSettingsEvents(elementsDict, layerId) {
  /* Appearance */
  layerConfigCheckboxEventSetup(elementsDict.dotsCheckbox, layerId, 'tag', 'showFullStop');
  layerConfigSliderEventSetup(elementsDict.outlineSlider, layerId, 'tag', 'outlineSizeRatio', 'onFinish');
  layerConfigSliderEventSetup(elementsDict.fillSlider, layerId, 'tag', 'backgroundSizeRatio', 'onFinish');
  layerConfigSliderEventSetup(elementsDict.paddingSlider, layerId, 'tag', 'padding', 'onFinish');
  layerConfigSliderEventSetup(elementsDict.seedSlider, layerId, 'tag', 'seed', 'onFinish');
  layerConfigRadiobuttonEventSetup(elementsDict.strategyRadiobutton, layerId, 'tag', 'strategy');
}

function setTagSettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Tag appearance elements */
  // Dots

  var dotsCheckboxId = layerId + '_tag-appearance-dots';
  var $dotsCheckbox = newLayerElement.find('#tag-appearance-dots');
  $dotsCheckbox.attr('name', dotsCheckboxId);
  $dotsCheckbox.attr('id', dotsCheckboxId);
  ArcheoUI.toggleCheckbox($dotsCheckbox, layerConfig.style.showFullStop); // Outline

  var outlineSliderId = layerId + '_tag-appearance-outline-size';
  var $outlineSlider = newLayerElement.find('#tag-appearance-outline-size');
  $outlineSlider.attr('name', outlineSliderId);
  $outlineSlider.attr('id', outlineSliderId);
  var outlineSliderObj = ArcheoUI.initializeSlider($outlineSlider, {
    min: 0,
    max: 6.,
    from: layerConfig.style.outlineSizeRatio,
    step: 0.01,
    type: 'single',
    extra_classes: 'tag-appearance-outline-size'
  }); // Fill

  var fillSliderId = layerId + '_tag-appearance-fill-size';
  var $fillSlider = newLayerElement.find('#tag-appearance-fill-size');
  $fillSlider.attr('name', fillSliderId);
  $fillSlider.attr('id', fillSliderId);
  var fillSliderObj = ArcheoUI.initializeSlider($fillSlider, {
    min: 0,
    max: 6.,
    from: layerConfig.style.backgroundSizeRatio,
    // get from session
    step: 0.01,
    type: 'single',
    extra_classes: 'tag-appearance-fill-size'
  }); // Padding

  var paddingSliderId = layerId + '_tag-appearance-padding';
  var $paddingSlider = newLayerElement.find('#tag-appearance-padding');
  $paddingSlider.attr('name', paddingSliderId);
  $paddingSlider.attr('id', paddingSliderId);
  var paddingSliderObj = ArcheoUI.initializeSlider($paddingSlider, {
    min: .01,
    max: 0.6,
    from: layerConfig.style.padding,
    // get from session
    step: .01,
    type: 'single',
    extra_classes: 'tag-appearance-padding'
  }); // Seed

  var seedSliderId = layerId + '_tag-appearance-seed';
  var $seedSlider = newLayerElement.find('#tag-appearance-seed');
  $seedSlider.attr('name', seedSliderId);
  $seedSlider.attr('id', seedSliderId);
  var seedSliderObj = ArcheoUI.initializeSlider($seedSlider, {
    min: .01,
    max: 3,
    from: layerConfig.style.seed,
    // get from session
    step: .01,
    type: 'single',
    extra_classes: 'tag-appearance-seed'
  }); // Placement strategy

  var strategyRadiobuttonId = layerId + '_tag-appearance-strategy';
  var $strategyRadiobutton = newLayerElement.find('#tag-appearance-strategy');
  $strategyRadiobutton.attr('name', strategyRadiobuttonId);
  $strategyRadiobutton.attr('id', strategyRadiobuttonId);
  $strategyRadiobutton.find('input').attr('name', strategyRadiobuttonId);
  $strategyRadiobutton.find(`input[value=${layerConfig.style.strategy}]`).click();
  setTagSettingsEvents({
    'dotsCheckbox': $dotsCheckbox,
    'outlineSlider': outlineSliderObj,
    'fillSlider': fillSliderObj,
    'paddingSlider': paddingSliderObj,
    'seedSlider': seedSliderObj,
    'strategyRadiobutton': $strategyRadiobutton
  }, layerId);
}


;// CONCATENATED MODULE: ./views/mixins-sass/_colors.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const _colors = ({"palette_primary_color":"#13446f","palette_primary_color_light":"#26537a","palette_primary_color_lightest":"#c5d1dc","palette_primary_color_dark":"#113d64","palette_primary_color_darkest":"#0d304e","palette_secondary_color":"#ffad42","palette_secondary_color_darker":"#d4861f","palette_tertiary_color_light":"#afafaf","palette_tertiary_color_lightest":"#ddd","palette_tertiary_color_lighter":"#cecece","palette_tertiary_color":"#474747","palette_tertiary_color_dark":"#2c2c2c","palette_tertiary_color_darker":"#222","palette_tertiary_color_darkest":"#141414","text_color_light":"#e6e6e6","text_color_dark":"#222","text_color_dark_faded":"#646464","background_color_light":"#eee","background_color_lightest":"#f7f7f7","present_time_color_array_string":"119,0,255,1","text_color_light_faded":"#d2d2d2"});
;// CONCATENATED MODULE: ./views/pages/map/js/events/ui/right-sidebar/utilities.js

const possiblePatterns = (/* unused pure expression or super */ null && (['hatch', 'coal', 'dot', 'crosses', 'woven']));

function generateRandomRegionStyle() {
  let patternColor = ArcheoUtilities.randomRGBColorGenerator(true);
  let backgroundColor = ArcheoUtilities.randomRGBColorGenerator(true);
  return {
    name: '',
    color: {
      pattern: patternColor.toRgbString(),
      background: backgroundColor.setAlpha(0.3).toRgbString(),
      stroke: null
    },
    pattern: {
      type: possiblePatterns[ArcheoUtilities.getRandomInt(0, possiblePatterns.length)],
      angle: 45 * ArcheoUtilities.getRandomInt(0, 4),
      scale: 1.0 + 0.25 * ArcheoUtilities.getRandomInt(1, 4),
      spacing: ArcheoUtilities.getRandomInt(10, 21)
    }
  };
}
/* Gather basic data about all certain type's regions */


function promiseFetchRegionsBasicData(regionsTypeId) {
  return new Promise((resolution, rejection) => {
    var filters = {
      'this_is_division': {
        'Division': {
          'id': regionsTypeId
        }
      }
    };
    var selectionSet = ['id', 'name(lang: $lang)', 'centroid {x, y}', 'dating', 'bbox {x, y}'];
    var variablesDeclarations = {
      "$lang": "String"
    };
    let query = ArcheoRequests.createGraphqlQuery('Region', selectionSet, filters, variablesDeclarations);
    /* Register region type entry */

    let regionsLegend = ArcheoSession.get().legend.regions;
    if (!(regionsTypeId in regionsLegend)) regionsLegend[regionsTypeId] = {};
    ArcheoRequests.queryGraphQL(query, response => {
      let regionsDetails = response.data.Region;
      /* Add regions info to the regions dict */

      regionsDetails.forEach(regionInfo => {
        let id = regionInfo.id;
        let centroid = [regionInfo.centroid.x, regionInfo.centroid.y];
        centroid = ArcheoMap.getCoordinatesProjectedToMap(centroid);
        let boundingCoordinates = [];

        for (var i = 0; i < regionInfo.bbox.length; ++i) {
          let corner = [regionInfo.bbox[i].x, regionInfo.bbox[i].y];
          boundingCoordinates.push(ArcheoMap.getCoordinatesProjectedToMap(corner));
        }

        let isThereDatingInfo = ArcheoUtilities.isValid(regionInfo.dating) && ArcheoUtilities.isValid(regionInfo.dating[Object.keys(regionInfo.dating)[0]]);
        let regionName = regionInfo.name;
        let mapRegionInfo = {
          name: regionName,
          type: regionsTypeId,
          centroid: centroid,
          extent: ArcheoMap.getExtentFromBoundingBox(boundingCoordinates)
        };

        if (!(regionName in regionsLegend[regionsTypeId])) {
          if (regionsTypeId === 'cultures') regionsLegend[regionsTypeId][regionName] = generateRandomRegionStyle();
          regionsLegend[regionsTypeId][regionName] = { ...regionsLegend[regionsTypeId][regionName],
            name: regionName,
            filtered: false,
            group: null
          };
        }

        if (isThereDatingInfo) {
          mapRegionInfo.dating = regionInfo.dating;
          mapRegionInfo.datingMean = (regionInfo.dating.year_end - regionInfo.dating.year_start) / 2.0;
        }

        ArcheoMap.setMapRegions(id, mapRegionInfo, regionsTypeId);
      });
      resolution(true);
    }, {
      lang: window.getLang()
    });
  });
}

async function promiseGetDescendantsAttributes(attributeEntity, attributesValuesIds, treeIndex) {
  return new Promise(async function (resolution, rejection) {
    // 	"begins_with": "_starts_with", 
    var filters = {
      'name_in': attributesValuesIds,
      'treeIndex_starts_with': treeIndex
    };
    var selectionSet = ['name']; //var variablesDeclarations = {"$lang": "String"};

    let query = ArcheoRequests.createGraphqlQuery(attributeEntity, selectionSet, filters //variablesDeclarations
    );
    ArcheoRequests.queryGraphQL(query, response => {
      let attributeDescendants = response.data[attributeEntity];
      resolution(attributeDescendants);
    }); //{lang: window.getLang() });
  });
} // is_ancestor(treeIndex: String, lang: String = "en")


async function promiseGetAncestorsAttributes(attributeEntity, attributesValuesIds, treeIndex) {
  return new Promise(async function (resolution, rejection) {
    // "begins_with": "_starts_with", 
    var filters = {
      'name_in': attributesValuesIds
    };
    var selectionSet = ['is_ancestor(treeIndex: $treeIndex, lang: $lang)'];
    var variablesDeclarations = {
      "$lang": "String",
      "$treeIndex": "String"
    }; //var variablesDeclarations = {"$treeIndex": "String"};

    let query = ArcheoRequests.createGraphqlQuery(attributeEntity, selectionSet, filters, variablesDeclarations);
    ArcheoRequests.queryGraphQL(query, response => {
      let attributeAncestors = response.data[attributeEntity];
      attributeAncestors = attributeAncestors.map(el => el.is_ancestor);
      attributeAncestors = attributeAncestors.filter(ancestor => ArcheoUtilities.isValid(ancestor));
      resolution(attributeAncestors);
    }, {
      lang: window.getLang(),
      treeIndex: treeIndex
    });
  });
}

async function promiseGetAttributesByTreeLevel(attributeEntity, attributesValuesIds, treeLevel) {
  return new Promise(async function (resolution, rejection) {
    var filters = {
      'name_in': attributesValuesIds
    };
    var selectionSet = ['get_ancestor(treeLevel: $treeLevel, lang: $lang)'];
    var variablesDeclarations = {
      "$lang": "String",
      "$treeLevel": "Int"
    };
    let query = ArcheoRequests.createGraphqlQuery(attributeEntity, selectionSet, filters, variablesDeclarations);
    ArcheoRequests.queryGraphQL(query, response => {
      let attributeAncestors = response.data[attributeEntity];
      attributeAncestors = attributeAncestors.map(el => {
        return el.get_ancestor;
      });
      attributeAncestors = attributeAncestors.filter(ancestor => ArcheoUtilities.isValid(ancestor) && ancestor.path_length > -1);
      resolution(attributeAncestors);
    }, {
      lang: window.getLang(),
      treeLevel: treeLevel
    });
  });
}

async function promiseFitlerAttributesByTreeLevel(attributeEntity, attributesValuesIds, treeLevelFrom, treeLevelTo) {
  return new Promise(async function (resolution, rejection) {
    var filters = {
      'name_in': attributesValuesIds,
      'depth_gte': treeLevelFrom,
      'depth_lte': treeLevelTo
    };
    var selectionSet = ['name']; //var variablesDeclarations = {"$lang": "String"};

    var variablesDeclarations = {};
    let query = ArcheoRequests.createGraphqlQuery(attributeEntity, selectionSet, filters, variablesDeclarations);
    ArcheoRequests.queryGraphQL(query, response => {
      let attributeObjects = response.data[attributeEntity];
      resolution(attributeObjects);
    }, {//lang: window.getLang()
    });
  });
}

function initializeTreeSearch($inputEl, attributeId) {
  if (ArcheoUtilities.isValid($inputEl.autocomplete('instance'))) $inputEl.autocomplete("destroy");
  ArcheoSearcher.initialize($inputEl, attributeId, 'treeIndex', 'name', 'synonym', window.getLang(), function (event, ui) {
    $inputEl.attr('searched-label', ui.item.label);
    $inputEl.attr('searched-value', ui.item.value);
  }, function (event, ui) {
    let queryAttributeValue = $inputEl.attr('searched-label');
    let label = ArcheoUtilities.isStringUndefined(queryAttributeValue) ? '' : queryAttributeValue;
    $inputEl.val(label);
  });
}

function updateTreeLevelSlider($treeLevelClusteringPanel, $treeLevelSlider, attributeId, attributeType, data = {}) {
  if (attributeType === 'tree') {
    $treeLevelClusteringPanel.removeClass('hidden');
    let allAttributes = MapUtilities.getAttributesDict();
    let attributeEntity = allAttributes[attributeId].entity;
    let minLevel = metadata[attributeEntity].minDepth;
    let maxLevel = metadata[attributeEntity].maxDepth;
    $treeLevelSlider.data("ionRangeSlider").update({
      min: minLevel,
      max: maxLevel,
      ...data
    });
  } else {
    $treeLevelClusteringPanel.addClass('hidden');
  }
}


;// CONCATENATED MODULE: ./views/pages/map/js/events/ui/right-sidebar/layers/new-layer/components/tree-select.js


function ancestorSelectEvents(elementsDic, layerId) {
  let $ancestorSearchInput = elementsDic.ancestorsInput;
  let $ancestorSearchButton = elementsDic.ancestorsButt;
  let $selectValues = elementsDic.browser;
  $ancestorSearchButton.on('click', function () {
    let treeIndex = $ancestorSearchInput.attr('searched-value');
    let attributesValuesIds = $selectValues.find('option:not(.hidden)').get().map(el => $(el).val());
    let layerConfig = ArcheoSession.get().layers[layerId];
    let attributeId = layerConfig.attributeId;
    let attributeType = layerConfig.attributeType;
    let allAttributes = MapUtilities.getAttributesDict();
    let attributeEntity = allAttributes[attributeId].entity;
    promiseGetAncestorsAttributes(attributeEntity, attributesValuesIds, treeIndex).then(function (ancestors) {
      ancestors.forEach(ancestor => {
        $selectValues.find(`option:not(.hidden)[value="${ancestor.name}"]`).prop('selected', true);
      });
    });
  });
}

function descendantsSelectEvents(elementsDic, layerId) {
  let $descendantsSearchInput = elementsDic.descendantsInput;
  let $descendantsSearchButton = elementsDic.descendantsButton;
  let $selectValues = elementsDic.browser;
  $descendantsSearchButton.on('click', function () {
    let treeIndex = $descendantsSearchInput.attr('searched-value');
    let attributesValuesIds = $selectValues.find('option:not(.hidden)').get().map(el => $(el).val());
    let layerConfig = ArcheoSession.get().layers[layerId];
    let attributeId = layerConfig.attributeId;
    let attributeType = layerConfig.attributeType;
    let allAttributes = MapUtilities.getAttributesDict();
    let attributeEntity = allAttributes[attributeId].entity;
    promiseGetDescendantsAttributes(attributeEntity, attributesValuesIds, treeIndex).then(function (descendants) {
      descendants.forEach(descendant => {
        $selectValues.find(`option:not(.hidden)[value="${descendant.name}"]`).prop('selected', true);
      });
    });
  });
}

function treeSelectEvents(elementsDic, layerId) {
  ancestorSelectEvents(elementsDic, layerId);
  descendantsSelectEvents(elementsDic, layerId);
}


;// CONCATENATED MODULE: ./views/pages/map/js/events/ui/right-sidebar/layers/new-layer/components/utilities.js
function resetTreeSearch(elementsDic) {
  let $descendantsSearchInput = elementsDic.descendantsInput;
  let $ancestorSearchInput = elementsDic.ancestorsInput;
  $descendantsSearchInput.val('');
  $descendantsSearchInput.attr('searched-label', '');
  $descendantsSearchInput.attr('searched-value', '');
  $ancestorSearchInput.val('');
  $ancestorSearchInput.attr('searched-label', '');
  $ancestorSearchInput.attr('searched-value', '');
}

function toggleTreeSearch(elementsDic, attributeType, clusteringObjectName = 'attributes') {
  let $treeClusteringOptionsPanel = elementsDic.treePanel;
  if (attributeType === 'tree' && clusteringObjectName === 'attributes') $treeClusteringOptionsPanel.removeClass('hidden');else $treeClusteringOptionsPanel.addClass('hidden');
}

function resetFiltering(elementsDict, layerId, filtered = false, triggerEvent = true) {
  let layerConfig = ArcheoSession.get().layers[layerId];
  let attributeId = layerConfig.attributeId;
  let attributeType = layerConfig.attributeType;

  if (ArcheoUtilities.isValidNonEmptyString(attributeId)) {
    layerConfig.style.componentValues.data = "selectAll";
    ArcheoEvents.broadcast('layer-attribute-change', null, {
      layerId: layerId,
      //data.eventType
      attributeId: attributeId,
      //attributeName: attributeTitle,
      attributeType: attributeType
    });
    /*elementsDict.browser.trigger('layer-attribute-change', {
    	layerId: layerId,
    	attributeId: attributeId,
    	attributeType: attributeType
    });*/

    /*let legend = ArcheoSession.getAttributeLegend(attributeId);
    
    let attributesLegend;
    if(attributeType === 'admixture')
    	attributesLegend = ArcheoSession.getAdmixtureLegend(attributeId, true);
    else
    	attributesLegend = ArcheoSession.getAttributeLegend(attributeId, true);
    	let attributesValues = Object.keys(attributesLegend);
    	for(var i = 0; i < attributesValues.length; ++i) {
    	let value = attributesValues[i];
    	legend[value].filtered = filtered;
    }
    	if(triggerEvent)
    	ArcheoEvents.broadcast('filter-attribute-change', null, {
    		attributeId: attributeId,
    		attributeType: attributeType
    	});*/
  }
}


;// CONCATENATED MODULE: ./views/pages/map/js/events/ui/right-sidebar/layers/new-layer/components/index.js








function initializeAttributesSelectButtons(elementsDict) {
  let $selectAllButt = elementsDict.selectAllButt;
  let $unselectAllButt = elementsDict.unselectAllButt;
  let $selectValues = elementsDict.browser;

  let filterButtonFunction = function (doSelect) {
    return function (event) {
      let $selectedOptions = $selectValues.find('option:not(.hidden)');

      if (doSelect) {
        $selectedOptions.prop('selected', true);
      } else {
        $selectedOptions.prop('selected', false);
      }
    };
  };

  $selectAllButt.on('click', filterButtonFunction(true));
  $unselectAllButt.on('click', filterButtonFunction(false));
  let $selectInvert = elementsDict.invertButt;
  $selectInvert.on('click', function () {
    let $allOptions = $selectValues.find('option:not(.hidden:selected)');
    let $selectedOptions = $selectValues.find('option:not(.hidden):selected');
    $allOptions.prop('selected', true);
    $selectedOptions.prop('selected', false);
  });
}

function initializeAttriutesFilterButtons(elementsDict) {
  let $filterAllButt = elementsDict.filterButt;
  let $unfilterAllButt = elementsDict.unfilterButt;
  let $selectValues = elementsDict.browser;

  let filterButtonFunction = function (doFilterOut) {
    return function (event) {
      let $selectedOptions = $selectValues.find('option:selected:not(.hidden)');
      let attributeId = $selectValues.attr('attributeId');
      let attributeType = $selectValues.attr('attributeType');
      let legend = ArcheoSession.getAttributeLegend(attributeId);
      if (doFilterOut) $selectedOptions.addClass('filtered');else $selectedOptions.removeClass('filtered');
      /*$selectedOptions.each((index) => {
      	let value = $($selectedOptions[index]).val();
      	legend[value].filtered = doFilterOut;
      });*/

      /* Force update of the components data */

      elementsDict.browser.trigger('update');
    };
  };

  $filterAllButt.on('click', filterButtonFunction(false));
  $unfilterAllButt.on('click', filterButtonFunction(true));
}

function initializeUseRegexEvent(elementsDict) {
  let $attributeRegexCheckbox = elementsDict.searchRegex;
  let $attributeSearch = elementsDict.search;
  $attributeRegexCheckbox.on('click', function (event) {
    let value = !$attributeRegexCheckbox.hasClass('active'); // negation applied intentionally

    if (value) {
      $attributeSearch.attr('placeholder', "Filter attributes by regex...");
      $attributeSearch.attr('regex', "");
      $attributeSearch.val('');
    } else {
      $attributeSearch.attr('placeholder', "Filter attributes...");
      $attributeSearch.removeAttr('regex');
      $attributeSearch.val('');
    }
  });
}

function browserFilteringEvents(elementsDict) {
  /*elementsDict.valuesSelect.on('changed.bs.select', function (event, data) {
  	let layerConfig = ArcheoSession.get().layers[layerId];
  		var $select = $(event.target);
  	var values = $select.selectpicker().val();
  		let allPossibleAttributesCount = getDataAttributesIds(elementsDict.valuesSelect).length;
  		let attributeId;
  	var attributeType;
  	if(event.type === 'layer-attribute-change') {
  		attributeId =  data.attributeId;
  		attributeType = data.attributeType;
  	} else {
  		attributeId = layerConfig.attributeId; 
  		attributeType = layerConfig.attributeType;
  	}
  	
  	ArcheoEvents.broadcast('layer-value-change', null, {
  		layerId: layerId,
  		values: values,
  		dataAttributesCount: allPossibleAttributesCount,
  		attributeId: attributeId,
  		attributeType: attributeType	
  	});
  });*/
}

function initializeFilteringEvents(elementsDict, layerId) {
  let filteringFunction = function ($selectValues) {
    return function (event) {
      let $selectedOptions = $selectValues.find(':selected:not(.hidden)');
      let layerConfig = ArcheoSession.get().layers[layerId];
      let attributeId = layerConfig.attributeId;
      let attributeType = layerConfig.attributeType; //let legend = ArcheoSession.getAttributeLegend(attributeId);

      let selectedCount = $selectedOptions.length;
      let filteredCount = $selectedOptions.filter('.filtered').length;

      if (filteredCount / selectedCount >= 0.5) {
        $selectedOptions.removeClass('filtered');
      } else {
        $selectedOptions.addClass('filtered');
      }

      let allOptions = $selectValues.find('option:not(.filtered)');
      let values = $.map(allOptions, el => $(el).val());
      let allPossibleAttributesCount = getDataAttributesIds(elementsDict.browser).length;
      ArcheoEvents.broadcast('layer-value-change', null, {
        layerId: layerId,
        values: values,
        dataAttributesCount: allPossibleAttributesCount,
        attributeId: attributeId,
        attributeType: attributeType
      });
    };
  };

  let $selectAttributeValues = elementsDict.browser;
  $selectAttributeValues.on('dblclick update', filteringFunction($selectAttributeValues));
}

function initializeSearchEvents(elementsDict) {
  let searchEventFunction = function ($selectValues) {
    return function (event) {
      let $search = $(event.target);
      let searchValue = $(event.target).val();
      let doUseRegex = ArcheoUtilities.isValid($search.attr('regex'));
      $selectValues.find('option').filter(async function (index) {
        let $this = $(this);
        let optionValue = $this.val();
        let isMatched;

        try {
          if (doUseRegex) isMatched = optionValue.match(new RegExp(`${searchValue}`));else isMatched = optionValue.match(new RegExp(`^${ArcheoUtilities.escapeRegex(searchValue)}`));
        } catch (error) {
          isMatched = false;
        }

        if (!isMatched) $this.addClass('hidden');else $this.removeClass('hidden');
      });
    };
  };

  let $selectAttributesValues = elementsDict.browser;
  let $attributesSearch = elementsDict.search;
  $attributesSearch.on('input', searchEventFunction($selectAttributesValues));
}

function getDataAttributesIds($browser) {
  return $.map($browser.find('optgroup[label="Data attributes"] option'), el => {
    //return $.map($browser.find('option'), (el) => {
    return $(el).attr('value');
  });
}

function componentUIUpdateEvents(elementsDict, layerId) {
  let $ancestorSearchInput = elementsDict.ancestorsInput;
  let $descendantsSearchInput = elementsDict.descendantsInput;
  elementsDict.browser.on('layer-attribute-change filter-attribute-change clustering-attribute-change layer-initialization', function (event, data) {
    if (event.type === 'layer-initialization' && layerId !== data.layerId) return;
    let layerConfig = ArcheoSession.get().layers[layerId];
    var attributeId;
    var attributeType;

    if (event.type === 'layer-attribute-change') {
      attributeId = data.attributeId;
      attributeType = data.attributeType;
    } else {
      attributeId = layerConfig.attributeId;
      attributeType = layerConfig.attributeType;
    }

    let datasetId = layerConfig.datasetId;
    var attributesDict = ArcheoUtilities.deepCloneObject(groups_namespaceObject);
    let doesFilterChangeConcernsThisLayer = (event.type === 'filter-attribute-change' || event.type === 'clustering-attribute-change') && data.attributeId === attributeId;

    if (ArcheoUtilities.isValidNonEmptyString(datasetId)) {
      if (data.layerId === layerId || doesFilterChangeConcernsThisLayer === true) {
        // Reset value //
        if (ArcheoUtilities.isValidNonEmptyString(attributeId)) {
          /* Update UI */
          if (event.type === 'layer-attribute-change' || event.type === 'layer-initialization') {
            resetTreeSearch(elementsDict);
            initializeTreeSearch($ancestorSearchInput, attributeId);
            initializeTreeSearch($descendantsSearchInput, attributeId);
            toggleTreeSearch(elementsDict, attributeType);
          }
          /* Populate select UI */


          let attributeLegend = ArcheoSession.getAttributeLegend(attributeId);
          var attributeValues = getDataSourceAttributeValues(datasetId, layerId, attributeId, attributeType);
          attributeValues.forEach(function (value) {
            //if(value in attributeLegend && attributeLegend[value].filtered === false)
            attributesDict.attributes.options[value] = {
              name: value,
              filtered: true // By default every value is filtered out

            };
          });
          /* Apply proper filtering according to session info */

          let componentValues = layerConfig.style.componentValues;
          var selected;
          let commonAttributesDict = attributesDict.attributes.options;

          if (event.type === 'layer-initialization') {
            if (componentValues.data === 'selectAll') {
              Object.keys(commonAttributesDict).forEach(value => {
                commonAttributesDict[value].filtered = false;
              });
            } else {
              Object.keys(componentValues.data).forEach(value => {
                if (value in commonAttributesDict) commonAttributesDict[value].filtered = false;
              });
            }

            ArcheoMap.refreshLayer(data.layerId);
          } else if (event.type === 'layer-attribute-change') {
            Object.keys(commonAttributesDict).forEach(value => {
              commonAttributesDict[value].filtered = false;
            });
          } else if (event.type === 'filter-attribute-change' || event.type === 'clustering-attribute-change') {
            if (componentValues.data === 'selectAll') {
              Object.keys(commonAttributesDict).forEach(value => {
                commonAttributesDict[value].filtered = false;
              });
            } else {
              Object.keys(componentValues.data).forEach(value => {
                if (value in commonAttributesDict) commonAttributesDict[value].filtered = false;
              });
            }
          }
          /* Initialize filtering for special attributes */


          if (ArcheoUtilities.isValid(componentValues.special.MISSING)) attributesDict.special.options.MISSING.filtered = false;else attributesDict.special.options.MISSING.filtered = true;
          if (ArcheoUtilities.isValid(componentValues.special.OTHER)) attributesDict.special.options.OTHER.filtered = false;else attributesDict.special.options.OTHER.filtered = true;
          /* Update browser */

          ArcheoUI.setSelect(elementsDict.browser, attributesDict);
          elementsDict.browser.attr('attributeId', attributeId);
          elementsDict.browser.attr('attributeType', attributeType);
        }
      }
    } else {
      /* Reset to default */
      ArcheoUI.setSelect(elementsDict.browser, groups_namespaceObject);
    }
  });
}

function resetButtonEvents(elementsDict, layerId) {
  let $resetButton = elementsDict.resetButt;
  $resetButton.on('click', () => resetFiltering(elementsDict, layerId));
}

function initializeUI(newLayerElement, layerId) {
  let $browser = newLayerElement.find('#layer-select-attribute-filter-browser');
  $browser.attr('id', layerId + '_' + $browser.prop('id'));
  let $resetButt = newLayerElement.find('#layer-attribute-filter-reset');
  $resetButt.attr('id', layerId + '_' + $resetButt.prop('id'));
  let $search = newLayerElement.find('#layer-filter-attribute-search');
  $search.attr('id', layerId + '_' + $search.prop('id'));
  let $searchRegex = newLayerElement.find('#layer-attribute-filter-regex');
  $searchRegex.attr('id', layerId + '_' + $searchRegex.prop('id'));
  let $selectAllButt = newLayerElement.find('#layer-attribute-filter-select-all');
  $selectAllButt.attr('id', layerId + '_' + $selectAllButt.prop('id'));
  let $unselectAllButt = newLayerElement.find('#layer-attribute-filter-unselect-all');
  $unselectAllButt.attr('id', layerId + '_' + $unselectAllButt.prop('id'));
  let $invertButt = newLayerElement.find('#layer-attribute-filter-select-invert');
  $invertButt.attr('id', layerId + '_' + $invertButt.prop('id'));
  let $unfilterButt = newLayerElement.find('#layer-attribute-filter-unfilter-all');
  $unfilterButt.attr('id', layerId + '_' + $unfilterButt.prop('id'));
  let $filterButt = newLayerElement.find('#layer-attribute-filter-filter-all');
  $filterButt.attr('id', layerId + '_' + $filterButt.prop('id'));
  let $ancestorsInput = newLayerElement.find('#layer-attribute-filtering-ancestors');
  $ancestorsInput.attr('id', layerId + '_' + $ancestorsInput.prop('id'));
  let $ancestorsButt = newLayerElement.find('#layer-attribute-filtering-ancestors-button');
  $ancestorsButt.attr('id', layerId + '_' + $ancestorsButt.prop('id'));
  let $descendantsInput = newLayerElement.find('#layer-attribute-filtering-descendants');
  $descendantsInput.attr('id', layerId + '_' + $descendantsInput.prop('id'));
  let $descendantsButton = newLayerElement.find('#layer-attribute-filtering-descendants-button');
  $descendantsButton.attr('id', layerId + '_' + $descendantsButton.prop('id'));
  let $treePanel = newLayerElement.find('#tree-filter-select-panel');
  $treePanel.attr('id', layerId + '_' + $treePanel.prop('id'));
  return {
    'browser': $browser,
    'resetButt': $resetButt,
    'search': $search,
    'searchRegex': $searchRegex,
    'selectAllButt': $selectAllButt,
    'unselectAllButt': $unselectAllButt,
    'invertButt': $invertButt,
    'unfilterButt': $unfilterButt,
    'filterButt': $filterButt,
    'ancestorsInput': $ancestorsInput,
    'ancestorsButt': $ancestorsButt,
    'descendantsInput': $descendantsInput,
    'descendantsButton': $descendantsButton,
    'treePanel': $treePanel
  };
}

function setComponentsSettings(newLayerElement, layerId) {
  /* Initialize UI */
  let elementsDict = initializeUI(newLayerElement, layerId);
  /* Initialize events */
  //initializeAttributeSelectEvents(elementsDict);

  componentUIUpdateEvents(elementsDict, layerId);
  browserFilteringEvents(elementsDict);
  initializeSearchEvents(elementsDict);
  initializeFilteringEvents(elementsDict, layerId);
  initializeUseRegexEvent(elementsDict);
  initializeAttributesSelectButtons(elementsDict);
  initializeAttriutesFilterButtons(elementsDict);
  treeSelectEvents(elementsDict, layerId);
  resetButtonEvents(elementsDict, layerId);
}

/* harmony default export */ const components = (setComponentsSettings);
;// CONCATENATED MODULE: ./views/pages/map/js/events/ui/right-sidebar/layers/new-layer/initialize-layer.js








function setLayerAccordion(newLayerElement, layerId) {
  /* Assign meta */
  newLayerElement.find('.layer-header > .header-text').html(ArcheoSession.get().layers[layerId].settings.title);
  /* Assign correct id to all accordions */

  newLayerElement.find(`[data-target="#layer-template-accordion"]`).attr('data-target', `#${layerId}-accordion`);
  newLayerElement.find('#layer-template-accordion').attr('id', `${layerId}-accordion`);
}

function setSettingsAccordion(newLayerElement, layerId) {
  /* Layer type accordion */
  newLayerElement.find(`[data-target="#layer-type-settings"]`).attr('data-target', `#${layerId}-accordion-type-settings`);
  newLayerElement.find('#layer-type-settings').attr('id', `${layerId}-accordion-type-settings`);
  /* Appearance accordion */

  newLayerElement.find(`[data-target="#layer-visibility-settings"]`).attr('data-target', `#${layerId}-accordion-layer-visibility-settings`);
  newLayerElement.find('#layer-visibility-settings').attr('id', `${layerId}-accordion-layer-visibility-settings`);
  /* Position accordion */

  newLayerElement.find(`[data-target="#features-position"]`).attr('data-target', `#${layerId}-accordion-features-position`);
  newLayerElement.find('#features-position').attr('id', `${layerId}-accordion-features-position`);
  /* Features size accordion */

  newLayerElement.find(`[data-target="#features-size"]`).attr('data-target', `#${layerId}-accordion-features-size`);
  newLayerElement.find('#features-size').attr('id', `${layerId}-accordion-features-size`);
  /* Layer weight accordion */

  newLayerElement.find(`[data-target="#layer-weight"]`).attr('data-target', `#${layerId}-accordion-layer-weight`);
  newLayerElement.find('#layer-weight').attr('id', `${layerId}-accordion-layer-weight`);
  /* Components accordion */

  newLayerElement.find(`[data-target="#values-settings"]`).attr('data-target', `#${layerId}-accordion-values-settings`);
  newLayerElement.find('#values-settings').attr('id', `${layerId}-accordion-values-settings`);
}

function setGeneralSettingsEvents(elementsDict, layerId) {
  /* Change layer name */
  elementsDict.layerNameTextbox.on('change', function (event) {
    var $textbox = $(event.target);
    var newLayerName = $textbox.val();

    if (ArcheoUtilities.isValidNonEmptyString(newLayerName)) {
      //ArcheoSession.get().layers[ layerId ].settings.title = newLayerName;
      elementsDict.layerHeaderTextElement.html(newLayerName);
      ArcheoEvents.broadcast('layer-name-change', null, {
        layerId: layerId,
        value: newLayerName
      });
      ArcheoEvents.broadcast('layer-setting-change', null, {
        layerId: layerId,
        setting: 'title',
        value: newLayerName
      });
      $textbox.trigger('blur');
    } else {
      let oldLayerName = ArcheoSession.get().layers[layerId].settings.title;
      $textbox.val(oldLayerName);
    }
  });
  /* Change layer type */

  elementsDict.layerTypeSelect.on('changed.bs.select', function (event) {
    var $select = $(event.target);
    let layerType = $select.val();
    let layerTypeName = $select.find(':selected').text();
    let layerConfig = ArcheoSession.get().layers[layerId];
    ArcheoSession.get().layers[layerId].type = layerType;
    /* Show layer type settings */

    elementsDict.layerElement.find('.type-settings').addClass('d-none');
    elementsDict.layerElement.find(`.${layerType}-settings`).removeClass('d-none');
    /* Change type settings header text */

    let $layerSettings = elementsDict.layerElement.find(`.layer-type-settings`);

    if (ArcheoUtilities.isValidNonEmptyString(layerTypeName)) {
      $layerSettings.find(`.header-text`).text(`${layerTypeName} settings`);
      $layerSettings.removeClass('hidden');
    } else $layerSettings.addClass('hidden');

    if (layerType === 'heatmap') {
      /* Weight appearance */
      elementsDict.layerElement.find('.weight-appearance-wrapper').hide();
      /* Color toggle */

      elementsDict.layerElement.find('.layer-color-toggle-wrapper').hide();
      elementsDict.layerElement.find('.layer-name-toggle-wrapper').hide();
      /* Show proper color settings */

      elementsDict.layerElement.find('.layer-color-input').hide();
      elementsDict.layerElement.find('.layer-color-pointer-options').hide();
      elementsDict.layerElement.find('.gradient-input-wrapper').show(); //('d-none');

      /* Change to type's default blending mode */

      elementsDict.layerElement.find('.select-layer-blending-mode').selectpicker('val', 'screen');
      /* Hide Postion and Size setting, as they are unapplicable to the heatmap */

      elementsDict.layerElement.find('.features-position-settings').hide();
      elementsDict.layerElement.find('.features-size-settings').hide();
    } else {
      /* Weight appearance */
      elementsDict.layerElement.find('.weight-appearance-wrapper').show();
      /* Color toggle */

      elementsDict.layerElement.find('.layer-color-toggle-wrapper').show();
      elementsDict.layerElement.find('.layer-name-toggle-wrapper').show();
      /* Show proper color settings */

      elementsDict.layerElement.find('.gradient-input-wrapper').hide();
      elementsDict.layerElement.find('.layer-color-input').show();
      elementsDict.layerElement.find('.layer-color-pointer-options').show();
      /* Change to type's default blending mode */

      elementsDict.layerElement.find('.select-layer-blending-mode').selectpicker('val', 'normal');
      /* Show Postion and Size setting */

      elementsDict.layerElement.find('.features-position-settings').show();
      elementsDict.layerElement.find('.features-size-settings').show();
    }

    ArcheoEvents.broadcast('layer-type-change', null, {
      layerId: layerId,
      value: layerType
    });
  });
  /* Change layer attribute */

  const attributeChangeEventFunction = function (event, data) {
    let $select = $(event.target);
    let attributeId = $select.val();
    let attributeType = $select.find(':selected').attr('type');
    let layerConfig = ArcheoSession.get().layers[layerId];
    let datasetId;

    if (event.type === 'layer-dataset-change') {
      attributeId = layerConfig.attributeId;
      attributeType = layerConfig.attributeType;
      datasetId = data.datasetId;
      if (data.layerId !== layerId) return;

      if (elementsDict.attributeTypeSelect.is(event.target)) {
        if (!(attributeType in attributesTypes_namespaceObject) || !(attributeId in attributesTypes_namespaceObject[attributeType])) return;
      } else if (elementsDict.attributeSelect.is(event.target)) {
        if (attributeType in attributesTypes_namespaceObject && attributeId in attributesTypes_namespaceObject[attributeType]) return;
      }
    } else {
      datasetId = ArcheoSession.get().layers[layerId].datasetId;
    } //alert(`attributeId 0 ${attributeId} attributeType 0 ${attributeType}`);


    if (ArcheoUtilities.isValidNonEmptyString(attributeId)) {
      if (ArcheoUtilities.isValidNonEmptyString(datasetId)) {
        let params = {
          layerId: layerId,
          attributeId: attributeId,
          attributeType: attributeType,
          datasetId: datasetId,
          eventType: event.type
        };
        ArcheoRequests.incorporateAttributes(params).then(isSuccess => {
          if (isSuccess === true) {
            ArcheoEvents.broadcast('attribute-fetched', null, {
              datasetId: datasetId,
              layerId: layerId
            });
          }

          $select.trigger('update-ui', params);
        });
      }
    } else {
      if (elementsDict.attributeSelect.is(event.target)) {
        let layer = ArcheoMap.getLayer(layerId);
        ArcheoMap.setLayerConfig(layer, {
          attributeId: attributeId,
          attributeType: attributeType
        });
        ArcheoMap.refreshLayer(layerId);
      }
    }
  };

  const updateUI = async function (event, data) {
    if (data.layerId === layerId) {
      let layerConfig = ArcheoSession.get().layers[layerId];
      var $select = $(event.target);
      let attributeId = $select.val();
      let attributeType = $select.find(':selected').attr('type');
      let doesFilterChangeConcernsThisLayer = data.attributeId === attributeId;

      if (doesFilterChangeConcernsThisLayer === true) {
        let typesWrapper = $select.parent().next();
        let params = {
          layerId: layerId,
          eventType: data.eventType
        };

        if (attributeId in attributesTypes_namespaceObject) {
          typesWrapper.removeClass('d-none'); //ArcheoUI.setSelectpicker( elementsDict.attributeSelect, attributeType, false );

          ArcheoUI.setSelectpicker(elementsDict.attributeTypeSelect, attributesTypes_namespaceObject[attributeType], true);
          return;
        } else {
          typesWrapper.addClass('d-none');
        }

        if (ArcheoUtilities.isValidNonEmptyString(attributeId)) {
          let attributeType = $select.find(`option[value=${attributeId}]`).attr("type") || 'value';
          let attributeTitle = $select.find(`option[value=${attributeId}]`).text();
          params = { ...params,
            attributeId: attributeId,
            attributeName: attributeTitle,
            attributeType: attributeType
          };
          if (attributeType === "admixture") elementsDict.layerElement.find('.piechart-label-percent').hide();else elementsDict.layerElement.find('.piechart-label-percent').show();
        } //if(data.eventType !== 'layer-initialization' && data.eventType !== 'layer-dataset-change') {


        if (data.eventType !== 'layer-dataset-change') {
          /* Reset filtering on new attribute select */
          layerConfig.style.componentValues.data = "selectAll";
          ArcheoEvents.broadcast('layer-attribute-change', null, params);
        } else {
          elementsDict.layerElement.find('select.select-value').trigger('layer-initialization', params);
          ArcheoMap.getMapSources()[data.datasetId].changed();
        }
      }
    }
  };
  /* Change layer attribute */
  //elementsDict.attributeSelect.on('changed.bs.select update layer-initialization', attributeChangeEventFunction);


  elementsDict.attributeSelect.on('changed.bs.select update layer-dataset-change', attributeChangeEventFunction);
  elementsDict.attributeSelect.on('update-ui dataset-remove', updateUI);
  /* Change layer attribute type if available */
  //elementsDict.attributeTypeSelect.on('changed.bs.select update layer-initialization', attributeChangeEventFunction);

  elementsDict.attributeTypeSelect.on('changed.bs.select update layer-dataset-change', attributeChangeEventFunction);
  elementsDict.attributeTypeSelect.on('update-ui dataset-remove', updateUI);
  /* Change dataset */

  elementsDict.datasetSelect.on('changed.bs.select layer-initialization', function (event, data) {
    if (event.type === 'layer-initialization' && layerId !== data.layerId) return;
    let layerConfig = ArcheoMap.getLayerConfigById(layerId);
    var $select = $(event.target);
    let datasetId;

    if (event.type === "layer-initialization") {
      datasetId = layerConfig.datasetId;
    } else {
      datasetId = $select.val();
      ArcheoSession.get().layers[layerId].datasetId = datasetId;
    }

    ArcheoEvents.broadcast('layer-dataset-change', null, {
      layerId: layerId,
      datasetId: datasetId
    });

    if (ArcheoUtilities.isValidNonEmptyString(datasetId)) {
      let dataset = ArcheoSession.get().datasets[datasetId];
      let isDatasetCustom = dataset.isCustom;
      console.log("VIS dataset dataset");
      console.log(dataset);
      let attributeId = layerConfig.attributeId;
      let attributeType = layerConfig.attributeType;

      if (!ArcheoUtilities.isValid(isDatasetCustom)) {
        let objectId = dataset.objectId;

        if (event.type === "layer-initialization") {
          /* Attribute which has subtypes */
          if (attributeType in attributesTypes_namespaceObject && attributeId in attributesTypes_namespaceObject[attributeType]) {
            ArcheoUI.setSelectpicker(elementsDict.attributeSelect, attributes_namespaceObject[objectId], true);
            ArcheoUI.setSelectpicker(elementsDict.attributeTypeSelect, attributesTypes_namespaceObject[attributeType], true);
            ArcheoUI.setSelectValueNoEvent(elementsDict.attributeSelect, attributeType);
            ArcheoUI.setSelectValue(elementsDict.attributeTypeSelect, attributeId);
            let typesWrapper = elementsDict.attributeTypeSelect.parent().parent();
            typesWrapper.removeClass('d-none');
          }
          /* Normal attribute */
          else {
              ArcheoUI.setSelectpicker(elementsDict.attributeSelect, attributes_namespaceObject[objectId], true);
              ArcheoUI.setSelectValueNoEvent(elementsDict.attributeSelect, attributeId);
            }
        } else {
          ArcheoUI.setSelectpicker(elementsDict.attributeSelect, attributes_namespaceObject[objectId], true);
          ArcheoUI.setSelectValueNoEvent(elementsDict.attributeSelect, attributeId);
        }
      } else {
        ArcheoUI.setSelectpicker(elementsDict.attributeSelect, dataset.attributesDict, true);
        ArcheoUI.setSelectValueNoEvent(elementsDict.attributeSelect, attributeId);
      }
    } else {
      ArcheoUI.setSelectpicker(elementsDict.attributeSelect, {}, true);
    }
  });
}

function setGeneralSettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Layer name textbox */

  var layerHeaderTextElement = newLayerElement.find('.layer-header > .header-text');
  var layerNameTextboxId = layerId + '_layer-name-textbox';
  var layerNameTextbox = newLayerElement.find('#layer-name-textbox');
  layerNameTextbox.attr('id', layerNameTextboxId); // Initialize

  layerNameTextbox.val(ArcheoSession.get().layers[layerId].settings.title);
  /* Layer dataset select */

  var datasetSelectId = layerId + '_select-layer-dataset';
  var $datasetSelect = newLayerElement.find('#select-layer-dataset');
  $datasetSelect.attr('id', datasetSelectId);
  let $datasetSelectpicker = $datasetSelect.selectpicker();
  /* Layer attribute select */

  var attributeSelectId = layerId + '_select-attribute';
  var $attributeSelect = newLayerElement.find('#select-attribute');
  $attributeSelect.attr('id', attributeSelectId);
  $attributeSelect.selectpicker();
  /* Layer attribute type select */

  var attributeTypeSelectId = layerId + '_select-attribute-type';
  var $attributeTypeSelect = newLayerElement.find('#select-attribute-type');
  $attributeTypeSelect.attr('id', attributeTypeSelectId);
  $attributeTypeSelect.selectpicker();
  /* Layer type select */

  var layerTypeSelectId = layerId + '_select-layer-type';
  var $layerTypeSelect = newLayerElement.find('#select-layer-type');
  $layerTypeSelect.attr('id', layerTypeSelectId);
  $layerTypeSelect.selectpicker();
  let elements = {
    'layerElement': newLayerElement,
    'layerHeaderTextElement': layerHeaderTextElement,
    'layerNameTextbox': layerNameTextbox,
    'layerTypeSelect': $layerTypeSelect,
    'attributeSelect': $attributeSelect,
    'attributeTypeSelect': $attributeTypeSelect,
    'datasetSelect': $datasetSelect
  };
  setGeneralSettingsEvents(elements, layerId);
  /* Initialize layer type selectpicker */

  $layerTypeSelect.selectpicker('val', layerConfig.type); //$attributeSelect.selectpicker('val', layerConfig.attributeId);

  /* Initialize dataset and attribute selectpicker by triggering dataset change event */

  ArcheoEvents.broadcast('dataset-update', null, {
    layerId: layerId
  }); //$datasetSelectpicker.selectpicker('val', layerConfig.datasetId);
  //ArcheoUI.setSelectValueNoEvent($datasetSelectpicker, layerConfig.datasetId);

  return elements;
}

function setVisibilitySettingsEvents(elementsDict, layerId) {
  /* Change visibility setting */
  elementsDict.layerVisibilityButt.on('click', function (event) {
    /* The button status will be changed only after click event, thus negation */
    var isToggled = !$(event.target).hasClass('active'); // negation applied on purpose

    ArcheoEvents.broadcast(['layer-setting-change', 'layer-visibility-change'], null, {
      layerId: layerId,
      setting: 'visible',
      value: isToggled
    });
    ArcheoMap.triggerLayerStyleFunction();
  });
  /* Change opacity setting */

  layerConfigSliderEventSetup(elementsDict.opacitySlider, layerId, null, 'drawingAlpha', 'onFinish');
  /* Change blending mode */

  layerConfigSelectEventSetup(elementsDict.layerBlendingModeSelect, layerId, null, 'blendingMode');
  /* Change color */

  layerConfigColorPickEventSetup(elementsDict.layerColorInput, layerId,
  /* notLayerType */
  'heatmap', 'move');
  /* Toggle layer name */

  layerConfigCheckboxEventSetup(elementsDict.layerNameToggleCheckbox, layerId, null, 'layerNameToggle');
  /* Toggle color */

  layerColorToggleCheckboxEventSetup(elementsDict.layerColorToggleCheckbox, layerId, null, 'colorToggle'); // layer-visibility-change
  // ArcheoMap.triggerLayerStyleFunction( ArcheoMap.getRegionsLayer() );

  /* Toggle color */

  layerColorToggleCheckboxEventSetup(elementsDict.layerPointerToggleCheckbox, layerId, null, 'pointerToggle');
  /* Change gradient */

  layerConfigGradientPickEventSetup(elementsDict.gradientInput, layerId, 'heatmap');
}

function setVisibilitySettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Visibility button */

  let layerVisibilityButt = newLayerElement.find('#visibility');
  layerVisibilityButt.attr('id', `${layerId}_visibility`);
  layerVisibilityButt.next().attr('for', `${layerId}_visibility`); // Initialize

  ArcheoUI.toggleCheckbox(layerVisibilityButt, layerConfig.settings.visible);
  /* Opacity slider */

  var opacitySliderId = layerId + '_layer-opacity';
  var $opacitySlider = newLayerElement.find('#layer-opacity');
  $opacitySlider.attr('name', opacitySliderId);
  $opacitySlider.attr('id', opacitySliderId);
  var opacitySliderObj = ArcheoUI.initializeSlider($opacitySlider, {
    min: .0,
    max: 1.,
    from: layerConfig.style.drawingAlpha,
    step: 0.01,
    type: 'single',
    prettify: val => {
      return Math.round(val * 100) + '%';
    }
  });
  var layerNumber = ArcheoSession.get().layers._counter - 1;
  /* Toggle layer name */

  var layerNameToggleCheckboxId = layerId + '_layer-name-toggle';
  var $layerNameToggleCheckbox = newLayerElement.find('#layer-name-toggle');
  $layerNameToggleCheckbox.attr('name', layerNameToggleCheckboxId);
  $layerNameToggleCheckbox.attr('id', layerNameToggleCheckboxId);
  if (layerConfig.style.layerNameToggle) $layerNameToggleCheckbox.addClass('active');else $layerNameToggleCheckbox.removeClass('active');
  /* Body Color */

  var layerColorInputId = layerId + '_layer-color-input';
  var $layerColorInput = newLayerElement.find('#layer-color-input');
  $layerColorInput.attr('id', layerColorInputId);
  if (ArcheoUtilities.isValidNonEmptyString(layerConfig.style.color)) ArcheoUI.initializeColorInput($layerColorInput, {
    color: layerConfig.style.color,
    palette: 'layer'
  }, layerNumber);else ArcheoUI.initializeColorInput($layerColorInput, {
    palette: 'layer'
  }, layerNumber);
  /* Body Toggle color */

  var layerColorToggleCheckboxId = layerId + '_layer-color-toggle';
  var $layerColorToggleCheckbox = newLayerElement.find('#layer-color-toggle');
  $layerColorToggleCheckbox.attr('name', layerColorToggleCheckboxId);
  $layerColorToggleCheckbox.attr('id', layerColorToggleCheckboxId);
  if (layerConfig.style.colorToggle) $layerColorToggleCheckbox.addClass('active');else $layerColorToggleCheckbox.removeClass('active');
  /* Pointer Toggle */

  var layerPointerToggleCheckboxId = layerId + '_layer-pointer-toggle';
  var $layerPointerToggleCheckbox = newLayerElement.find('#layer-pointer-toggle');
  $layerPointerToggleCheckbox.attr('name', layerPointerToggleCheckboxId);
  $layerPointerToggleCheckbox.attr('id', layerPointerToggleCheckboxId);
  if (layerConfig.style.pointerToggle) $layerPointerToggleCheckbox.addClass('active');else $layerPointerToggleCheckbox.removeClass('active');
  /* Gradient */

  var layerGradientInputId = layerId + '_layer-gradient-input';
  var $layerGradientInput = newLayerElement.find('#layer-gradient-input');
  $layerGradientInput.attr('id', layerGradientInputId);
  var gradientInputObj = ArcheoUI.initializeGradientInput($layerGradientInput);
  /* Decide whether show single color or gradient options */

  /*if( ArcheoUtilities.isArray(layerConfig.style.color) ) {
  	$layerColorInput.addClass('d-none');
  	$layerGradientInput.parent().removeClass('d-none');
  } else {
  	$layerColorInput.removeClass('d-none');
  	$layerGradientInput.parent().addClass('d-none');
  }*/

  /* Layer type select */

  var layerBlendingModeSelectId = layerId + '_select-layer-blending-mode';
  var $layerBlendingModeSelect = newLayerElement.find('#select-layer-blending-mode');
  $layerBlendingModeSelect.attr('id', layerBlendingModeSelectId);
  $layerBlendingModeSelect.selectpicker();
  $layerBlendingModeSelect.selectpicker('val', layerConfig.style.blendingMode);
  setVisibilitySettingsEvents({
    'layerElement': newLayerElement,
    'opacitySlider': opacitySliderObj,
    'layerBlendingModeSelect': $layerBlendingModeSelect,
    'layerColorInput': $layerColorInput,
    'gradientInput': gradientInputObj,
    'layerVisibilityButt': layerVisibilityButt,
    'layerColorToggleCheckbox': $layerColorToggleCheckbox,
    'layerPointerToggleCheckbox': $layerPointerToggleCheckbox,
    'layerNameToggleCheckbox': $layerNameToggleCheckbox
  }, layerId); // Initialize

  $layerColorToggleCheckbox.trigger('update'); // Initialize gradient

  var newGradient;
  if (ArcheoUtilities.isValid(layerConfig.style.gradient)) newGradient = ArcheoUI.setGradientValue(gradientInputObj, layerConfig.style.gradient, layerNumber);else newGradient = ArcheoUI.setGradientValue(gradientInputObj, null, layerNumber);
  /* Save default color to the session */
  //layerConfig.style.gradient = newGradient;
}

function setSizeSettingsEvents(elementsDict, layerId) {
  /* Change size setting */
  layerConfigSliderEventSetup(elementsDict.sizeSlider, layerId, null, 'size', 'onFinish'); //layerSettingSliderEventSetup(elementsDict.sizeSlider, layerId, null, 'radius', 'onFinish');

  /* Change font size setting */

  layerConfigSliderEventSetup(elementsDict.fontSlider, layerId, null, 'fontSizeRatio', 'onFinish');
}

function setSizeSettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Layer size slider */

  var sizeSliderId = layerId + '_features-size-slider';
  var $sizeSlider = newLayerElement.find('#features-size-slider');
  $sizeSlider.attr('name', sizeSliderId);
  $sizeSlider.attr('id', sizeSliderId);
  var sizeSliderObj = sizeSliderSettingSetup($sizeSlider, {
    from: layerConfig.style.size[0],
    to: layerConfig.style.size[1],
    min: 4,
    max: 100,
    type: 'double'
  });
  /* Font size slider */

  var fontSliderId = layerId + '_font-size-slider';
  var $fontSlider = newLayerElement.find('#font-size-slider');
  $fontSlider.attr('name', fontSliderId);
  $fontSlider.attr('id', fontSliderId);
  var fontSliderObj = sizeSliderSettingSetup($fontSlider, {
    from: layerConfig.style.fontSizeRatio,
    step: 0.01,
    min: 0,
    max: 3,
    type: 'single',
    postfix: ''
  });
  setSizeSettingsEvents({
    'sizeSlider': sizeSliderObj,
    'fontSlider': fontSliderObj
  }, layerId);
}

function setPositionSettingsEvents(elementsDict, layerId) {
  /* Change feature angle setting */
  layerAngleEventSetup(elementsDict.anglepicker, layerId, null, 'angle');
  /* Change feature offset setting */

  layerConfigSliderEventSetup(elementsDict.offsetSlider, layerId, null, 'positionOffsetRatio', 'onFinish');
  /* Change feature offset relative toggle */

  layerConfigCheckboxEventSetup(elementsDict.offsetRelativeCheckbox, layerId, null, 'positionOffsetRelativeToggle');
}

function setPositionSettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Layer size slider */

  var anglepickerId = layerId + '_anglepicker';
  var $anglepicker = newLayerElement.find('#anglepicker');
  $anglepicker.attr('name', anglepickerId);
  $anglepicker.attr('id', anglepickerId);
  /* Initialize it with value */

  if (layerConfig.style.angle === '') {
    let layerNumber = ArcheoSession.get().layers._counter - 1;
    layerConfig.style.angle = layerNumber * 45;
  }

  var anglepickerObj = $anglepicker.anglePicker({
    flat: true,
    value: layerConfig.style.angle,
    enableCenter: true,
    centerSize: 20,
    size: 75,
    handleSize: 15,
    handleType: "default",
    snap: 1,
    showValue: true,
    start: -90,
    showValueAlwaysEnabled: true
  });
  /* Relative offset toggle */

  var offsetRelativeCheckboxId = layerId + '_feature-offset-relative-toggle';
  var $offsetRelativeCheckbox = newLayerElement.find('#feature-offset-relative-toggle');
  $offsetRelativeCheckbox.attr('name', offsetRelativeCheckboxId);
  $offsetRelativeCheckbox.attr('id', offsetRelativeCheckboxId);
  if (layerConfig.style.positionOffsetRelativeToggle) $offsetRelativeCheckbox.addClass('active');else $offsetRelativeCheckbox.removeClass('active');
  /* Font size slider */

  var offsetSliderId = layerId + '_feature-offset-slider';
  var $offsetSlider = newLayerElement.find('#feature-offset-slider');
  $offsetSlider.attr('name', offsetSliderId);
  $offsetSlider.attr('id', offsetSliderId);
  var offsetSliderObj = sizeSliderSettingSetup($offsetSlider, {
    from: layerConfig.style.positionOffsetRatio,
    step: 0.05,
    min: -10,
    max: 10,
    type: 'single',
    postfix: ''
  });
  setPositionSettingsEvents({
    'anglepicker': anglepickerObj,
    'offsetSlider': offsetSliderObj,
    'offsetRelativeCheckbox': $offsetRelativeCheckbox
  }, layerId);
}

function setWeightSettingsEvents(elementsDict, layerId) {
  /* Change min weight scaling factor for logarithmic weight function */
  $(elementsDict.weightGrowthSelect).on('changed.bs.select', function (event) {
    let weightFunction = $(event.target).val();

    if (weightFunction === "logarithmic") {
      elementsDict.growthFactorSpinner.spinner("option", "min", 2);
    } else {
      elementsDict.growthFactorSpinner.spinner("option", "min", 0);
    }

    return true;
  });
  /* Change size setting */

  layerConfigSpinnerEventSetup(elementsDict.scalingFactorSpinner, layerId, null, 'weightScalingFactor');
  layerConfigSpinnerEventSetup(elementsDict.growthFactorSpinner, layerId, null, 'weightGrowthFactor');
  layerConfigSelectEventSetup(elementsDict.weightGrowthSelect, layerId, null, 'weightGrowth');
  layerConfigSelectEventSetup(elementsDict.standMethodSelect, layerId, null, 'standardisationMethod');
  layerConfigRadiobuttonEventSetup(elementsDict.displayRadiobutton, layerId, null, 'valueDisplay');
  layerConfigCheckboxEventSetup(elementsDict.weightValueCheckbox, layerId, null, 'cardinalityByValue');
  layerConfigCheckboxEventSetup(elementsDict.weightSizeCheckbox, layerId, null, 'cardinalityBySize');
  layerConfigCheckboxEventSetup(elementsDict.weightColorCheckbox, layerId, null, 'cardinalityByColor');
}

function setWeightSettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Weight appearance */

  /* Cardinality by value setting */

  var weightValueCheckboxId = layerId + '_weight-by-value';
  var $weightValueCheckbox = newLayerElement.find('#weight-by-value');
  $weightValueCheckbox.attr('name', weightValueCheckboxId);
  $weightValueCheckbox.attr('id', weightValueCheckboxId);
  ArcheoUI.toggleCheckbox($weightValueCheckbox, layerConfig.style.cardinalityByValue);
  /* Cardinality by size setting */

  var weightSizeCheckboxId = layerId + '_weight-by-size';
  var $weightSizeCheckbox = newLayerElement.find('#weight-by-size');
  $weightSizeCheckbox.attr('name', weightSizeCheckboxId);
  $weightSizeCheckbox.attr('id', weightSizeCheckboxId);
  ArcheoUI.toggleCheckbox($weightSizeCheckbox, layerConfig.style.cardinalityBySize);
  /* Cardinality by color setting */

  var weightColorCheckboxId = layerId + '_weight-by-color';
  var $weightColorCheckbox = newLayerElement.find('#weight-by-color');
  $weightColorCheckbox.attr('name', weightColorCheckboxId);
  $weightColorCheckbox.attr('id', weightColorCheckboxId);
  ArcheoUI.toggleCheckbox($weightColorCheckbox, layerConfig.style.cardinalityByColor);
  /* Weight display mode */

  var displayRadiobuttonId = layerId + '_weight-value-display';
  var $displayRadiobutton = newLayerElement.find('#weight-value-display');
  $displayRadiobutton.attr('name', displayRadiobuttonId);
  $displayRadiobutton.attr('id', displayRadiobuttonId);
  $displayRadiobutton.find('input').attr('name', displayRadiobuttonId);
  $displayRadiobutton.find(`input[value=${layerConfig.style.valueDisplay}]`).click();
  /* Weight scaling factor slider */

  var scalingFactorSpinnerId = layerId + '_weight-scaling-factor';
  var $scalingFactorSpinner = newLayerElement.find('#weight-scaling-factor');
  $scalingFactorSpinner.attr('name', scalingFactorSpinnerId);
  $scalingFactorSpinner.attr('id', scalingFactorSpinnerId);
  $scalingFactorSpinner.spinner({
    culture: window.getLang(),
    min: 0,
    max: 100.0,
    numberFormat: "n",
    step: 0.00001
  });
  $scalingFactorSpinner.val(layerConfig.style.weightScalingFactor);
  $scalingFactorSpinner.attr('last-value', layerConfig.style.weightScalingFactor);
  /* Weight growth factor slider */

  var growthFactorSpinnerId = layerId + '_weight-growth-factor';
  var $growthFactorSpinner = newLayerElement.find('#weight-growth-factor');
  $growthFactorSpinner.attr('name', growthFactorSpinnerId);
  $growthFactorSpinner.attr('id', growthFactorSpinnerId);
  $growthFactorSpinner.spinner({
    culture: window.getLang(),
    min: 0,
    max: 100.0,
    numberFormat: "n",
    step: 0.00001
  });
  $growthFactorSpinner.val(layerConfig.style.weightGrowthFactor);
  $growthFactorSpinner.attr('last-value', layerConfig.style.weightGrowthFactor);
  /* Weight growth select */

  var standMethodSelectId = layerId + '_select-stand-method';
  var $standMethodSelect = newLayerElement.find('#select-stand-method');
  $standMethodSelect.attr('id', standMethodSelectId);
  $standMethodSelect.selectpicker();
  $standMethodSelect.selectpicker('val', layerConfig.style.standardisationMethod);
  /* Weight growth select */

  var weightGrowthSelectId = layerId + '_select-weight-growth';
  var $weightGrowthSelect = newLayerElement.find('#select-weight-growth');
  $weightGrowthSelect.attr('id', weightGrowthSelectId);
  $weightGrowthSelect.selectpicker();
  $weightGrowthSelect.selectpicker('val', layerConfig.style.weightGrowth);
  setWeightSettingsEvents({
    'weightValueCheckbox': $weightValueCheckbox,
    'weightSizeCheckbox': $weightSizeCheckbox,
    'weightColorCheckbox': $weightColorCheckbox,
    'scalingFactorSpinner': $scalingFactorSpinner,
    'growthFactorSpinner': $growthFactorSpinner,
    'weightGrowthSelect': $weightGrowthSelect,
    'standMethodSelect': $standMethodSelect,
    'displayRadiobutton': $displayRadiobutton
  }, layerId);
}

function setLayerTypeSettings(newLayerElement, layerId) {
  setPointSettings(newLayerElement, layerId);
  setPiechartSettings(newLayerElement, layerId);
  setHeatmapSettings(newLayerElement, layerId);
  setTagSettings(newLayerElement, layerId);
}

function setCloneEvents(elementsDict, layerId) {
  /* Values select */
  elementsDict.cloneButton.on('click', function (event) {
    ArcheoUtilities.setButtonLoading(elementsDict.cloneButton).then(() => {
      $('.clone-button').one('layer-initialization', () => {
        ArcheoUtilities.setButtonLoaded(elementsDict.cloneButton);
      });
      var $button = $(event.target);
      ArcheoSession.cloneLayer(layerId);
    });
  });
}

function setSmallQuantitiesEvents(elementsDict, layerId) {
  layerConfigSliderEventSetup(elementsDict.othersSlider, layerId, null, 'otherRatio', 'onFinish', true);
  layerConfigSliderEventSetup(elementsDict.othersCountSlider, layerId, null, 'otherCount', 'onFinish', true);
}

function setSmallQuantitiesSettings(newLayerElement, layerId) {
  let layerConfig = ArcheoMap.getLayerConfigById(layerId);
  /* Group others slider setting */

  var othersSliderId = layerId + '_others-slider';
  var $othersSlider = newLayerElement.find('#others-slider');
  $othersSlider.attr('name', othersSliderId);
  $othersSlider.attr('id', othersSliderId);
  var othersSliderObj = ArcheoUI.initializeSlider($othersSlider, {
    min: .0,
    max: 1.,
    from: layerConfig.style.otherRatio,
    step: 0.01,
    type: 'single',
    extra_classes: 'others-slider',
    prettify: val => {
      return Math.round(val * 100) + '%';
    }
  });
  /* Group others slider setting */

  var othersCountSliderId = layerId + '_others-count-slider';
  var $othersCountSlider = newLayerElement.find('#others-count-slider');
  $othersCountSlider.attr('name', othersCountSliderId);
  $othersCountSlider.attr('id', othersCountSliderId);
  var othersCountSliderObj = ArcheoUI.initializeSlider($othersCountSlider, {
    min: 0,
    max: 100,
    from: layerConfig.style.otherCount,
    step: 1,
    type: 'single',
    extra_classes: 'others-slider',
    prettify: val => val
  });
  setSmallQuantitiesEvents({
    "othersSlider": othersSliderObj,
    "othersCountSlider": othersCountSliderObj
  }, layerId);
}

function setCloneSettings(newLayerElement, layerId) {
  var $cloneButton = newLayerElement.find('.clone-button');
  setCloneEvents({
    'cloneButton': $cloneButton
  }, layerId);
}

function initalizeClustering(newLayerElement, layerId) {
  newLayerElement.on('layer-initialization', function (event, data) {
    if (data.layerId === layerId) {
      ArcheoEvents.broadcast('cluster-setting-change', null, {
        layerId: layerId,
        setting: 'distance'
      });
      ArcheoEvents.broadcast('cluster-setting-change', null, {
        layerId: layerId,
        setting: 'range'
      });
    }
  });
}

function initializeTooltips(newLayerElement, layerId) {
  newLayerElement.find('.archeo-tooltip').each(function () {
    let tooltipId = $(this).attr('tooltip-id');
    let text = window.dictionary.tooltips[tooltipId];
    tippy(this, {
      content: text,
      interactive: true,
      appendTo: () => document.body
    });
  });
}

function createLayerElement(layerId, hideLayer) {
  return new Promise((resolution, rejection) => {
    let newLayerElement = $(`#layer-template`).clone();
    newLayerElement.addClass('layer');

    if (hideLayer) {
      newLayerElement.find('.layer-header').addClass('collapsed');
      newLayerElement.children('.collapse').removeClass('show');
    }
    /* Assign new dataset id */


    newLayerElement.attr('id', layerId);
    newLayerElement.appendTo('#layers-container');
    setCloneSettings(newLayerElement, layerId);
    let el = setGeneralSettings(newLayerElement, layerId);
    components(newLayerElement, layerId);
    setVisibilitySettings(newLayerElement, layerId);
    let layerConfig = ArcheoSession.get().layers[layerId];
    el.layerTypeSelect.selectpicker('val', layerConfig.type);
    setLayerTypeSettings(newLayerElement, layerId);
    setPositionSettings(newLayerElement, layerId);
    setSizeSettings(newLayerElement, layerId);
    setWeightSettings(newLayerElement, layerId);
    setSmallQuantitiesSettings(newLayerElement, layerId);
    setLayerAccordion(newLayerElement, layerId);
    setSettingsAccordion(newLayerElement, layerId);
    initalizeClustering(newLayerElement, layerId);
    initializeTooltips(newLayerElement, layerId);
    newLayerElement.css('display', 'block');
    resolution(newLayerElement);
  });
}

function initializeLayer(layerId) {
  return new Promise((resolution, rejection) => {
    var hideLayer = Object.keys(ArcheoMap.getMapLayers()).length > 0;
    createLayerElement(layerId, hideLayer).then(() => {
      /* Initialize filter values */
      ArcheoEvents.broadcast('layer-initialization', null, {
        layerId: layerId
      });
      resolution();
    });
  });
}

function broadcastLayerCreation(layerId, delayTime = null) {
  return ArcheoEvents.broadcast('layer-add', '#new-layer-button', {
    layerId: layerId,
    settings: ArcheoSession.get().layers[layerId].settings
  }, delayTime);
}


;// CONCATENATED MODULE: ./views/pages/plot/js/session/index.js



function registerSessionFunctions() {
  ArcheoSession.addDataset = function (objectId, databaseName, entityName, queryString) {
    let datasetsNumber = ArcheoSession.get().datasets._counter + 1 || 1;
    let datasetId = `${objectId}_${datasetsNumber}`;
    ArcheoSession.get().datasets[datasetId] = {
      name: databaseName.capitalize() + " #" + datasetsNumber,
      objectId: objectId,
      databaseName: databaseName,
      entityName: entityName,
      query: queryString,
      samplingRatio: 1
    };

    ArcheoSession.get().datasets._order.push(datasetId);

    ArcheoSession.get().datasets._counter += 1;
    return datasetId;
  };

  ArcheoSession.removeDatasets = function (datasetId = null) {
    if (datasetId === null) {
      let datasetIds = ArcheoSession.get().datasets._order.clone();

      datasetIds.forEach(datasetId => {
        ArcheoSession.removeDatasets(datasetId);
      });
    } else {
      delete ArcheoSession.get().datasets[datasetId];

      ArcheoSession.get().datasets._order.removeEl(datasetId);
    }
  };

  ArcheoSession.getDefaultLayerStyle = function () {
    return ArcheoUtilities.deepCloneObject(layer_default);
  };

  ArcheoSession.addLayer = function (layerId = null) {
    var layerNumber = ArcheoSession.get().layers._counter + 1 || 1;
    var zIndex = ArcheoMap.getLayerZIndex(layerNumber);
    if (layerId === null) layerId = 'layer_' + layerNumber;
    ArcheoSession.get().layers[layerId] = {
      layerId: layerId,
      type: '',
      datasetId: '',
      attributeId: '',
      attributeName: '',
      attributeType: '',
      //attributeValue: '',
      style: ArcheoSession.getDefaultLayerStyle(),
      settings: {
        zIndex: zIndex,
        opacity: 1.0,
        visible: true,
        title: "Layer #" + layerNumber
      }
    };
    ArcheoCache.getTemporaryEntry('styleCache')[layerId] = {};
    ArcheoCache.getTemporaryEntry('canvasCache')[layerId] = {};
    ArcheoCache.getTemporaryEntry('featuresClusters')[layerId] = {};
    /* Create cache entry for layer clusters */

    ArcheoCache.setSessionEntry(layerId, {}, 'object'); // Since clusters are features as well, they could be parsed as geojson, excluding their features

    ArcheoSession.get().layers._order.push(layerId);

    ArcheoSession.get().layers._counter += 1;
    return layerId;
  };

  ArcheoSession.cloneLayer = function (layerId) {
    var clonedLayerConfig = ArcheoSession.get().layers[layerId];
    let layers = ArcheoSession.get().layers;
    var newLayerId = layerId + '_copy_' + layers._counter;
    layers[newLayerId] = ArcheoUtilities.deepCloneObject(clonedLayerConfig);
    layers[newLayerId].settings.title += ' (copy)';
    layers[newLayerId].layerId = newLayerId;
    ArcheoCache.getTemporaryEntry('styleCache')[newLayerId] = {};
    ArcheoCache.getTemporaryEntry('featuresClusters')[newLayerId] = {};
    ArcheoCache.setSessionEntry(newLayerId, {}, 'object');

    layers._order.push(newLayerId);

    layers._counter += 1;
    MapUtilities.broadcastLayerCreation(newLayerId);
    initializeLayer(newLayerId);
    return newLayerId;
  };

  ArcheoSession.removeLayers = function (layerId = null) {
    if (layerId === null) {
      let layerIds = ArcheoSession.get().layers._order.clone();

      layerIds.forEach(layerId => {
        ArcheoSession.removeLayers(layerId);
      });
    } else {
      delete ArcheoSession.get().layers[layerId];

      ArcheoSession.get().layers._order.removeEl(layerId);
    }
  };

  ArcheoSession.getAttributeLegend = function (attributeId, getOnlyAttributes = false, includeGroupingInfo = false, ignoreSpecialAttributes = false) {
    let legend = ArcheoSession.get().legend.attributes;
    let attributesNames = Object.keys(ArcheoCache.getAttributeCache(attributeId));
    if (!(attributeId in legend)) legend[attributeId] = {
      '_groups': []
    };
    legend = legend[attributeId];
    let attributesLegend = {};

    if (getOnlyAttributes) {
      for (let i = 0; i < attributesNames.length; ++i) {
        let attributeName = attributesNames[i];
        let entryName = attributeName;
        /* Ignore special attributes */

        if (!ArcheoUtilities.isValid(legend[attributeName].special)) {
          if (includeGroupingInfo) {
            let groupName = legend[attributeName].group;

            if (ArcheoUtilities.isValid(groupName)) {
              entryName = groupName; //attributesLegend[groupName] = legend[groupName];
            }
          }
        }

        if (ignoreSpecialAttributes) {
          if (!ArcheoUtilities.isValid(legend[attributeName].special)) attributesLegend[entryName] = legend[entryName];
        } else attributesLegend[entryName] = legend[entryName];
      }
    } else {
      attributesLegend = legend;
    }

    return attributesLegend;
  };

  ArcheoSession.getAdmixtureLegend = function (attributeId, getOnlyAttributes = false, ignoreSpecialAttributes = true, includeGroupingInfo = false) {
    let legend = ArcheoSession.get().legend.attributes;
    if (!(attributeId in legend)) legend[attributeId] = {
      '_groups': [],
      '_order': []
    };
    legend = legend[attributeId];
    let attributesLegend = {};

    if (getOnlyAttributes) {
      for (let i = 0; i < legend._order.length; ++i) {
        let entryName = legend._order[i];
        /* Ignore special attributes */

        if (!ArcheoUtilities.isValid(legend[entryName].special)) {
          if (includeGroupingInfo) {
            let groupName = legend[entryName].group;

            if (ArcheoUtilities.isValid(groupName)) {
              entryName = groupName; //attributesLegend[groupName] = legend[groupName];
            }
          }
        }
        /*if(ignoreSpecialAttributes) {
            if( ! ArcheoUtilities.isValid(legend[attributeName].special) )
                attributesLegend[entryName] = legend[entryName];
        } else
            attributesLegend[entryName] = legend[entryName];*/


        attributesLegend[entryName] = legend[entryName];
      }
    } else {
      attributesLegend = legend;
    }

    if (ignoreSpecialAttributes === false) {
      if ('OTHER' in legend) attributesLegend.OTHER = legend.OTHER;
      if ('MISSING' in legend) attributesLegend.MISSING = legend.MISSING;
    } else {
      /*if('OTHER' in legend)
          delete attributesLegend.OTHER;
      if('MISSING' in legend)
          delete attributesLegend.MISSING;*/
    }

    return attributesLegend;
  };

  ArcheoSession.getAttributeGroupsList = function (attributeId) {
    let legend = ArcheoSession.get().legend.attributes;
    if (!(attributeId in legend)) legend[attributeId] = {
      '_groups': []
    };
    return legend[attributeId]._groups;
  };

  ArcheoSession.getAttributeGroupsLegend = function (attributeId) {
    let legend = ArcheoSession.get().legend.attributes;
    if (!(attributeId in legend)) legend[attributeId] = {
      '_groups': []
    };
    legend = legend[attributeId];
    let groupsKeys = legend._groups;
    let groupsLegend = {};
    groupsKeys.forEach(key => {
      groupsLegend[key] = legend[key];
    });
    return groupsLegend;
  };

  ArcheoSession.getRegionLegend = function (regionTypeId, getOnlyRegions = false) {
    let legend = ArcheoSession.get().legend.regions;
    if (!(regionTypeId in legend)) legend[regionTypeId] = {
      '_groups': []
    };
    legend = legend[regionTypeId];
    if (getOnlyRegions) legend = ArcheoUtilities.filterObject(legend, ([key]) => !key.startsWith('_'));
    return legend;
  };

  ArcheoSession.load = function (sessionId) {
    let newSession = ArcheoCache.getSession(sessionId);

    if (ArcheoUtilities.isValid(newSession)) {
      let doLoadLayers = ArcheoUtilities.isValid(newSession.layers);
      let doLoadDatasets = ArcheoUtilities.isValid(newSession.datasets);
      let oldSession = ArcheoSession.get();
      /* Remove old datasets and layers if they are about to be overwritten */

      if (doLoadDatasets) {
        if (ArcheoUtilities.isValid(oldSession.datasets)) {
          let oldDatasetsIds = ArcheoSession.get().datasets._order.clone();

          MapUtilities.removeDatasets(oldDatasetsIds);
        }
      }

      if (doLoadLayers) {
        if (ArcheoUtilities.isValid(oldSession.layers)) {
          let oldLayersIds = ArcheoSession.get().layers._order.clone();

          MapUtilities.removeLayers(oldLayersIds);
        }
      }
      /* Load up new session */


      ArcheoCache.loadSession(newSession);

      if (doLoadDatasets) {
        let newDatasetsIds = newSession.datasets._order;
        MapUtilities.loadDatasets(newDatasetsIds).then(() => {
          if (doLoadLayers) {
            let newLayersIds = newSession.layers._order;
            MapUtilities.loadLayers(newLayersIds).then(() => {
              ArcheoEvents.broadcast('session-load');
            });
          }
        });
      } else if (doLoadLayers) {
        let newLayersIds = newSession.layers._order;
        MapUtilities.loadLayers(newLayersIds).then(() => {
          ArcheoEvents.broadcast('session-load');
        });
      } else {
        ArcheoEvents.broadcast('session-load');
      }

      return sessionId;
    } else {
      return false;
    }
  }; // "baseLayers": {} add baseLayer?: name, id?, color, isVisible, config {} // e.g. for basemap
  // nie, zrobię to na sztywno, ale bedzie w configu

}


// EXTERNAL MODULE: ./views/pages/plot/index.pug
var plot = __webpack_require__(4589);
;// CONCATENATED MODULE: ./views/pages/plot/app.js
/*import 'Views/mixins-pug/toggle-arrow/script.js';
import 'Views/mixins-pug/icon-text-list/script.js';
import 'Views/mixins-pug/dropdown/script.js';
import 'Views/mixins-pug/switch/script.js';*/
// Styles //

 // Scripts //







/* Link .pug for assets injetion */


$(document).ready(function () {
  /*** Register plot Utilities  ***/
  utilities();
  /*** Initialize page session functions ***/

  registerSessionFunctions();
  /* Setup cache */

  ArcheoCache.setTemporaryEntry('resultsCache', {});
  /* Initialize session */

  let defaultSession = lang_defaults[getLang()];
  ArcheoSession.set(defaultSession);
  /*** Initialize static UI Elements  ***/

  js_elements();
  /*** Initialize static UI Events ***/

  events();
  AnalysisUtilities.queryAndDisplayResults('plot-pca', ...AnalysisUtilities.getSelectedResultsInfo());
  ArcheoUtilities.setContentLoaded('#loading-page-wrapper', 'body');
});
})();

/******/ })()
;