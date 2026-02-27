/**
 * ColorMaps - Color Wheel Tool
 * Interactive HSL color wheel for visual color selection.
 * Generic and reusable across any project element.
 */
(function () {
  window.ColorMaps = window.ColorMaps || {};

  class ColorWheel {
    constructor(container, options = {}) {
      this.container = typeof container === 'string'
        ? document.querySelector(container)
        : container;
      this.size = options.size || 160;
      this.color = options.color || '#ff4444';
      this.onChange = options.onChange || null;
      this._hue = 0;
      this._sat = 1;
      this._lit = 0.5;
      this._dragging = false;
      this._dragTarget = null;
      this._parseInitialColor();
      this._build();
    }

    _parseInitialColor() {
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
      wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:8px;';

      // Canvas for the hue ring
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.size;
      this.canvas.height = this.size;
      this.canvas.style.cssText = 'cursor:crosshair;border-radius:50%;';
      this.ctx = this.canvas.getContext('2d');
      wrap.appendChild(this.canvas);

      // Lightness slider
      const lRow = document.createElement('div');
      lRow.style.cssText = 'display:flex;align-items:center;gap:6px;width:100%;';
      const lLabel = document.createElement('span');
      lLabel.textContent = 'L';
      lLabel.style.cssText = 'color:#7f8fa6;font-size:10px;width:12px;';
      this.lSlider = document.createElement('input');
      this.lSlider.type = 'range';
      this.lSlider.min = '0';
      this.lSlider.max = '100';
      this.lSlider.value = String(Math.round(this._lit * 100));
      this.lSlider.style.cssText = 'flex:1;accent-color:#e8652b;';
      lRow.appendChild(lLabel);
      lRow.appendChild(this.lSlider);
      wrap.appendChild(lRow);

      // Preview + hex display
      const previewRow = document.createElement('div');
      previewRow.style.cssText = 'display:flex;align-items:center;gap:8px;';
      this.preview = document.createElement('div');
      this.preview.style.cssText = `width:24px;height:24px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:${this.color};`;
      this.hexLabel = document.createElement('span');
      this.hexLabel.style.cssText = 'color:#ccc;font-size:11px;font-family:monospace;';
      this.hexLabel.textContent = this.color;
      previewRow.appendChild(this.preview);
      previewRow.appendChild(this.hexLabel);
      wrap.appendChild(previewRow);

      this.container.appendChild(wrap);
      this._drawWheel();
      this._attachEvents();
    }

    _drawWheel() {
      const ctx = this.ctx;
      const cx = this.size / 2;
      const cy = this.size / 2;
      const outerR = this.size / 2 - 2;
      const innerR = outerR * 0.6;

      ctx.clearRect(0, 0, this.size, this.size);

      // Draw hue ring
      for (let angle = 0; angle < 360; angle++) {
        const startRad = (angle - 1) * Math.PI / 180;
        const endRad = (angle + 1) * Math.PI / 180;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, startRad, endRad);
        ctx.arc(cx, cy, innerR, endRad, startRad, true);
        ctx.closePath();
        ctx.fillStyle = `hsl(${angle}, ${Math.round(this._sat * 100)}%, ${Math.round(this._lit * 100)}%)`;
        ctx.fill();
      }

      // Draw saturation/brightness square inside
      const sqSize = innerR * 1.3;
      const sqX = cx - sqSize / 2;
      const sqY = cy - sqSize / 2;

      // Saturation gradient (left to right)
      const satGrad = ctx.createLinearGradient(sqX, sqY, sqX + sqSize, sqY);
      satGrad.addColorStop(0, `hsl(${this._hue}, 0%, ${Math.round(this._lit * 100)}%)`);
      satGrad.addColorStop(1, `hsl(${this._hue}, 100%, ${Math.round(this._lit * 100)}%)`);
      ctx.fillStyle = satGrad;
      ctx.fillRect(sqX, sqY, sqSize, sqSize);

      // Hue indicator on ring
      const hRad = this._hue * Math.PI / 180;
      const midR = (outerR + innerR) / 2;
      const hx = cx + Math.cos(hRad) * midR;
      const hy = cy + Math.sin(hRad) * midR;
      ctx.beginPath();
      ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = this._hslToHex(this._hue, this._sat, this._lit);
      ctx.fill();

      // Saturation indicator in square
      const sx = sqX + this._sat * sqSize;
      const sy = cy;
      ctx.beginPath();
      ctx.arc(sx, sy, 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    _attachEvents() {
      const cx = this.size / 2;
      const cy = this.size / 2;
      const outerR = this.size / 2 - 2;
      const innerR = outerR * 0.6;

      const getPos = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      };

      const onDown = (e) => {
        e.preventDefault();
        const pos = getPos(e);
        const dx = pos.x - cx;
        const dy = pos.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= innerR && dist <= outerR) {
          this._dragTarget = 'hue';
          this._dragging = true;
          this._updateHue(pos);
        } else if (dist < innerR) {
          this._dragTarget = 'sat';
          this._dragging = true;
          this._updateSat(pos);
        }
      };

      const onMove = (e) => {
        if (!this._dragging) return;
        e.preventDefault();
        const pos = getPos(e);
        if (this._dragTarget === 'hue') this._updateHue(pos);
        else if (this._dragTarget === 'sat') this._updateSat(pos);
      };

      const onUp = () => { this._dragging = false; this._dragTarget = null; };

      this.canvas.addEventListener('mousedown', onDown);
      this.canvas.addEventListener('touchstart', onDown, { passive: false });
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);

      this.lSlider.addEventListener('input', () => {
        this._lit = parseInt(this.lSlider.value) / 100;
        this._emitChange();
      });
    }

    _updateHue(pos) {
      const cx = this.size / 2;
      const cy = this.size / 2;
      let angle = Math.atan2(pos.y - cy, pos.x - cx) * 180 / Math.PI;
      if (angle < 0) angle += 360;
      this._hue = angle;
      this._emitChange();
    }

    _updateSat(pos) {
      const outerR = this.size / 2 - 2;
      const innerR = outerR * 0.6;
      const sqSize = innerR * 1.3;
      const sqX = this.size / 2 - sqSize / 2;
      this._sat = Math.max(0, Math.min(1, (pos.x - sqX) / sqSize));
      this._emitChange();
    }

    _emitChange() {
      this.color = this._hslToHex(this._hue, this._sat, this._lit);
      this.preview.style.background = this.color;
      this.hexLabel.textContent = this.color;
      this._drawWheel();
      if (this.onChange) this.onChange(this.color);
    }

    getColor() { return this.color; }

    setColor(hex) {
      this.color = hex;
      const rgb = this._hexToRgb(hex);
      if (rgb) {
        const hsl = this._rgbToHsl(rgb.r, rgb.g, rgb.b);
        this._hue = hsl.h;
        this._sat = hsl.s;
        this._lit = hsl.l;
        this.lSlider.value = String(Math.round(this._lit * 100));
        this._emitChange();
      }
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

  window.ColorMaps.ColorWheel = ColorWheel;
  window.ColorMaps.colorWheel = {
    name: 'Color Wheel',
    create: (container, options) => new ColorWheel(container, options)
  };
})();
