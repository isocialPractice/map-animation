/**
 * ColorMaps - Color Input Tool
 * Direct text-based color input supporting RGB and Hexadecimal modes.
 * Generic and reusable across any project element.
 */
(function () {
  window.ColorMaps = window.ColorMaps || {};

  class ColorInput {
    constructor(container, options = {}) {
      this.container = typeof container === 'string'
        ? document.querySelector(container)
        : container;
      this.color = options.color || '#ff4444';
      this.mode = options.mode || 'hex';  // 'hex' or 'rgb'
      this.onChange = options.onChange || null;
      this._build();
    }

    _build() {
      this.container.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

      // Mode toggle
      const modeRow = document.createElement('div');
      modeRow.style.cssText = 'display:flex;gap:4px;';
      this.hexBtn = this._createModeBtn('HEX', 'hex', modeRow);
      this.rgbBtn = this._createModeBtn('RGB', 'rgb', modeRow);
      wrap.appendChild(modeRow);

      // Input area
      this.inputArea = document.createElement('div');
      this.inputArea.style.cssText = 'display:flex;gap:6px;align-items:center;';
      wrap.appendChild(this.inputArea);

      // Preview swatch
      const previewRow = document.createElement('div');
      previewRow.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:4px;';
      this.preview = document.createElement('div');
      this.preview.style.cssText = `width:100%;height:28px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:${this.color};`;
      previewRow.appendChild(this.preview);
      wrap.appendChild(previewRow);

      this.container.appendChild(wrap);
      this._renderInputs();
      this._updateModeButtons();
    }

    _createModeBtn(label, mode, parent) {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.style.cssText = 'padding:3px 10px;border-radius:4px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);color:#7f8fa6;font-size:10px;cursor:pointer;text-transform:uppercase;letter-spacing:1px;';
      btn.addEventListener('click', () => {
        this.mode = mode;
        this._updateModeButtons();
        this._renderInputs();
      });
      parent.appendChild(btn);
      return btn;
    }

    _updateModeButtons() {
      const active = 'padding:3px 10px;border-radius:4px;border:1px solid rgba(232,101,43,0.5);background:rgba(232,101,43,0.15);color:#e8652b;font-size:10px;cursor:pointer;text-transform:uppercase;letter-spacing:1px;';
      const inactive = 'padding:3px 10px;border-radius:4px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);color:#7f8fa6;font-size:10px;cursor:pointer;text-transform:uppercase;letter-spacing:1px;';
      this.hexBtn.style.cssText = this.mode === 'hex' ? active : inactive;
      this.rgbBtn.style.cssText = this.mode === 'rgb' ? active : inactive;
    }

    _renderInputs() {
      this.inputArea.innerHTML = '';
      if (this.mode === 'hex') {
        this._renderHexInput();
      } else {
        this._renderRgbInputs();
      }
    }

    _renderHexInput() {
      const label = document.createElement('span');
      label.textContent = '#';
      label.style.cssText = 'color:#7f8fa6;font-size:13px;font-family:monospace;';
      this.inputArea.appendChild(label);

      this.hexInput = document.createElement('input');
      this.hexInput.type = 'text';
      this.hexInput.maxLength = 6;
      this.hexInput.value = this.color.replace('#', '');
      this.hexInput.style.cssText = 'width:80px;padding:4px 6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:4px;color:#ccc;font-family:monospace;font-size:12px;outline:none;';
      this.hexInput.addEventListener('input', () => {
        let val = this.hexInput.value.replace(/[^a-fA-F0-9]/g, '');
        if (val.length === 6) {
          this.color = '#' + val;
          this.preview.style.background = this.color;
          if (this.onChange) this.onChange(this.color);
        }
      });
      this.hexInput.addEventListener('focus', () => { this.hexInput.style.borderColor = 'rgba(232,101,43,0.5)'; });
      this.hexInput.addEventListener('blur', () => { this.hexInput.style.borderColor = 'rgba(255,255,255,0.12)'; });
      this.inputArea.appendChild(this.hexInput);
    }

    _renderRgbInputs() {
      const rgb = this._hexToRgb(this.color);
      const channels = [
        { label: 'R', value: rgb.r },
        { label: 'G', value: rgb.g },
        { label: 'B', value: rgb.b }
      ];
      this._rgbInputs = {};
      channels.forEach(ch => {
        const group = document.createElement('div');
        group.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:2px;';
        const lbl = document.createElement('span');
        lbl.textContent = ch.label;
        lbl.style.cssText = 'color:#7f8fa6;font-size:9px;text-transform:uppercase;';
        const inp = document.createElement('input');
        inp.type = 'number';
        inp.min = '0';
        inp.max = '255';
        inp.value = ch.value;
        inp.style.cssText = 'width:48px;padding:4px 4px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:4px;color:#ccc;font-family:monospace;font-size:12px;text-align:center;outline:none;';
        inp.addEventListener('input', () => this._onRgbChange());
        inp.addEventListener('focus', () => { inp.style.borderColor = 'rgba(232,101,43,0.5)'; });
        inp.addEventListener('blur', () => { inp.style.borderColor = 'rgba(255,255,255,0.12)'; });
        group.appendChild(lbl);
        group.appendChild(inp);
        this.inputArea.appendChild(group);
        this._rgbInputs[ch.label.toLowerCase()] = inp;
      });
    }

    _onRgbChange() {
      const r = Math.max(0, Math.min(255, parseInt(this._rgbInputs.r.value) || 0));
      const g = Math.max(0, Math.min(255, parseInt(this._rgbInputs.g.value) || 0));
      const b = Math.max(0, Math.min(255, parseInt(this._rgbInputs.b.value) || 0));
      this.color = this._rgbToHex(r, g, b);
      this.preview.style.background = this.color;
      if (this.onChange) this.onChange(this.color);
    }

    getColor() { return this.color; }

    setColor(hex) {
      this.color = hex;
      this.preview.style.background = this.color;
      if (this.mode === 'hex' && this.hexInput) {
        this.hexInput.value = hex.replace('#', '');
      } else if (this.mode === 'rgb' && this._rgbInputs) {
        const rgb = this._hexToRgb(hex);
        this._rgbInputs.r.value = rgb.r;
        this._rgbInputs.g.value = rgb.g;
        this._rgbInputs.b.value = rgb.b;
      }
    }

    destroy() { this.container.innerHTML = ''; }

    _hexToRgb(hex) {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!m) return { r: 255, g: 68, b: 68 };
      return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
    }

    _rgbToHex(r, g, b) {
      const toHex = v => { const h = v.toString(16); return h.length === 1 ? '0' + h : h; };
      return '#' + toHex(r) + toHex(g) + toHex(b);
    }
  }

  window.ColorMaps.ColorInput = ColorInput;
  window.ColorMaps.colorInput = {
    name: 'Color Input',
    create: (container, options) => new ColorInput(container, options)
  };
})();
