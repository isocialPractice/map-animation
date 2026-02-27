/**
 * ColorMaps - Color Harmony Tool
 * Generates harmonious color palettes from a base color using color theory:
 * complementary, analogous, triadic, and split-complementary relationships.
 * Generic and reusable across any project element.
 */
(function () {
  window.ColorMaps = window.ColorMaps || {};

  const HARMONY_MODES = {
    complementary: { label: 'Complementary', offsets: [0, 180] },
    analogous:     { label: 'Analogous',     offsets: [0, -30, 30, -60, 60] },
    triadic:       { label: 'Triadic',       offsets: [0, 120, 240] },
    splitComp:     { label: 'Split Comp.',   offsets: [0, 150, 210] },
    tetradic:      { label: 'Tetradic',      offsets: [0, 90, 180, 270] }
  };

  class ColorHarmony {
    constructor(container, options = {}) {
      this.container = typeof container === 'string'
        ? document.querySelector(container)
        : container;
      this.color = options.color || '#ff4444';
      this.harmonyMode = options.harmonyMode || 'complementary';
      this.onChange = options.onChange || null;
      this.onPaletteChange = options.onPaletteChange || null;
      this._hue = 0;
      this._sat = 1;
      this._lit = 0.5;
      this._parseColor();
      this._build();
    }

    _parseColor() {
      const rgb = this._hexToRgb(this.color);
      if (rgb) {
        const hsl = this._rgbToHsl(rgb.r, rgb.g, rgb.b);
        this._hue = hsl.h;
        this._sat = hsl.s;
        this._lit = hsl.l;
      }
    }

    _build() {
      this.container.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

      // Harmony mode selector
      const modeRow = document.createElement('div');
      modeRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:3px;';
      this._modeBtns = {};
      Object.keys(HARMONY_MODES).forEach(key => {
        const btn = document.createElement('button');
        btn.textContent = HARMONY_MODES[key].label;
        btn.style.cssText = 'padding:3px 7px;border-radius:4px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);color:#7f8fa6;font-size:9px;cursor:pointer;letter-spacing:0.5px;';
        btn.addEventListener('click', () => {
          this.harmonyMode = key;
          this._updateModeButtons();
          this._renderPalette();
        });
        modeRow.appendChild(btn);
        this._modeBtns[key] = btn;
      });
      wrap.appendChild(modeRow);

      // Base color hue slider
      const hueRow = document.createElement('div');
      hueRow.style.cssText = 'display:flex;align-items:center;gap:6px;';
      const hueLabel = document.createElement('span');
      hueLabel.textContent = 'Base';
      hueLabel.style.cssText = 'color:#7f8fa6;font-size:10px;width:28px;';
      this.hueSlider = document.createElement('input');
      this.hueSlider.type = 'range';
      this.hueSlider.min = '0';
      this.hueSlider.max = '359';
      this.hueSlider.value = String(Math.round(this._hue));
      this.hueSlider.style.cssText = 'flex:1;accent-color:#e8652b;';
      this.hueSlider.addEventListener('input', () => {
        this._hue = parseInt(this.hueSlider.value);
        this.color = this._hslToHex(this._hue, this._sat, this._lit);
        this._renderPalette();
      });
      hueRow.appendChild(hueLabel);
      hueRow.appendChild(this.hueSlider);
      wrap.appendChild(hueRow);

      // Palette display
      this.paletteArea = document.createElement('div');
      this.paletteArea.style.cssText = 'display:flex;gap:4px;';
      wrap.appendChild(this.paletteArea);

      // Selected color preview
      const previewRow = document.createElement('div');
      previewRow.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:4px;';
      this.preview = document.createElement('div');
      this.preview.style.cssText = `width:24px;height:24px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:${this.color};`;
      this.hexLabel = document.createElement('span');
      this.hexLabel.style.cssText = 'color:#ccc;font-size:11px;font-family:monospace;';
      this.hexLabel.textContent = this.color;
      previewRow.appendChild(this.preview);
      previewRow.appendChild(this.hexLabel);
      wrap.appendChild(previewRow);

      this.container.appendChild(wrap);
      this._updateModeButtons();
      this._renderPalette();
    }

    _updateModeButtons() {
      const active = 'padding:3px 7px;border-radius:4px;border:1px solid rgba(232,101,43,0.5);background:rgba(232,101,43,0.15);color:#e8652b;font-size:9px;cursor:pointer;letter-spacing:0.5px;';
      const inactive = 'padding:3px 7px;border-radius:4px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);color:#7f8fa6;font-size:9px;cursor:pointer;letter-spacing:0.5px;';
      Object.keys(this._modeBtns).forEach(key => {
        this._modeBtns[key].style.cssText = key === this.harmonyMode ? active : inactive;
      });
    }

    _renderPalette() {
      this.paletteArea.innerHTML = '';
      const offsets = HARMONY_MODES[this.harmonyMode].offsets;
      const palette = offsets.map(offset => {
        let h = (this._hue + offset) % 360;
        if (h < 0) h += 360;
        return this._hslToHex(h, this._sat, this._lit);
      });

      palette.forEach((hex, idx) => {
        const swatch = document.createElement('div');
        swatch.style.cssText = `flex:1;height:32px;background:${hex};border-radius:4px;cursor:pointer;border:2px solid ${idx === 0 ? '#fff' : 'transparent'};transition:border-color 0.15s;`;
        swatch.title = hex;
        swatch.addEventListener('click', () => {
          this.color = hex;
          this.preview.style.background = hex;
          this.hexLabel.textContent = hex;
          // Update hue slider to match clicked swatch
          const rgb = this._hexToRgb(hex);
          if (rgb) {
            const hsl = this._rgbToHsl(rgb.r, rgb.g, rgb.b);
            this._hue = hsl.h;
            this._sat = hsl.s;
            this._lit = hsl.l;
            this.hueSlider.value = String(Math.round(this._hue));
          }
          if (this.onChange) this.onChange(this.color);
          this._renderPalette();
        });
        this.paletteArea.appendChild(swatch);
      });

      this.preview.style.background = this.color;
      this.hexLabel.textContent = this.color;
      if (this.onChange) this.onChange(this.color);
      if (this.onPaletteChange) this.onPaletteChange(palette);
    }

    getColor() { return this.color; }
    getPalette() {
      const offsets = HARMONY_MODES[this.harmonyMode].offsets;
      return offsets.map(offset => {
        let h = (this._hue + offset) % 360;
        if (h < 0) h += 360;
        return this._hslToHex(h, this._sat, this._lit);
      });
    }

    setColor(hex) {
      this.color = hex;
      this._parseColor();
      this.hueSlider.value = String(Math.round(this._hue));
      this._renderPalette();
    }

    destroy() { this.container.innerHTML = ''; }

    // ─── Color conversions ───
    _hexToRgb(hex) {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!m) return null;
      return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
    }

    _rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
      }
      return { h: h * 360, s, l };
    }

    _hslToHex(h, s, l) {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      let r, g, b;
      if (s === 0) { r = g = b = l; }
      else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h / 360 + 1 / 3);
        g = hue2rgb(p, q, h / 360);
        b = hue2rgb(p, q, h / 360 - 1 / 3);
      }
      const toHex = (v) => {
        const hex = Math.round(v * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return '#' + toHex(r) + toHex(g) + toHex(b);
    }
  }

  window.ColorMaps.ColorHarmony = ColorHarmony;
  window.ColorMaps.colorHarmony = {
    name: 'Color Harmony',
    create: (container, options) => new ColorHarmony(container, options)
  };
})();
