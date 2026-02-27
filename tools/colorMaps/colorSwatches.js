/**
 * ColorMaps - Color Swatches Tool
 * Predefined color swatch grid for quick color selection.
 * Generic and reusable across any project element.
 */
(function () {
  window.ColorMaps = window.ColorMaps || {};

  const DEFAULT_SWATCHES = [
    // Reds
    '#ff0000', '#ff4444', '#ff6666', '#cc0000', '#990000',
    // Oranges
    '#ff8800', '#ffaa44', '#e8652b', '#ff6600', '#cc5500',
    // Yellows
    '#ffff00', '#ffcc44', '#ffee88', '#ffdd00', '#ccaa00',
    // Greens
    '#00ff00', '#44ff88', '#88ff44', '#00cc00', '#009900',
    // Cyans
    '#00ffff', '#44ddff', '#88eeff', '#00cccc', '#009999',
    // Blues
    '#0000ff', '#4444ff', '#64c8ff', '#44aaff', '#0066cc',
    // Purples
    '#8800ff', '#8854d0', '#a55eea', '#ff9ff3', '#cc66ff',
    // Pinks
    '#ff00ff', '#ff55aa', '#ff88cc', '#ffaaee', '#cc44aa',
    // Neutrals
    '#ffffff', '#cccccc', '#888888', '#444444', '#000000'
  ];

  class ColorSwatches {
    constructor(container, options = {}) {
      this.container = typeof container === 'string'
        ? document.querySelector(container)
        : container;
      this.swatches = options.swatches || DEFAULT_SWATCHES;
      this.color = options.color || '#ff4444';
      this.onChange = options.onChange || null;
      this.columns = options.columns || 5;
      this._build();
    }

    _build() {
      this.container.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

      // Swatch grid
      const grid = document.createElement('div');
      grid.style.cssText = `display:grid;grid-template-columns:repeat(${this.columns}, 1fr);gap:3px;`;

      this._swatchEls = [];
      this.swatches.forEach(hex => {
        const swatch = document.createElement('div');
        swatch.style.cssText = `width:100%;aspect-ratio:1;background:${hex};border-radius:3px;cursor:pointer;border:2px solid transparent;transition:border-color 0.15s,transform 0.15s;`;
        if (hex.toLowerCase() === this.color.toLowerCase()) {
          swatch.style.borderColor = '#fff';
          swatch.style.transform = 'scale(1.1)';
        }
        swatch.addEventListener('click', () => this._select(hex));
        swatch.addEventListener('mouseenter', () => {
          if (hex.toLowerCase() !== this.color.toLowerCase()) {
            swatch.style.borderColor = 'rgba(255,255,255,0.4)';
          }
        });
        swatch.addEventListener('mouseleave', () => {
          if (hex.toLowerCase() !== this.color.toLowerCase()) {
            swatch.style.borderColor = 'transparent';
          }
        });
        grid.appendChild(swatch);
        this._swatchEls.push({ el: swatch, hex });
      });

      wrap.appendChild(grid);

      // Selected preview
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
    }

    _select(hex) {
      this.color = hex;
      this.preview.style.background = hex;
      this.hexLabel.textContent = hex;
      this._swatchEls.forEach(s => {
        if (s.hex.toLowerCase() === hex.toLowerCase()) {
          s.el.style.borderColor = '#fff';
          s.el.style.transform = 'scale(1.1)';
        } else {
          s.el.style.borderColor = 'transparent';
          s.el.style.transform = 'scale(1)';
        }
      });
      if (this.onChange) this.onChange(this.color);
    }

    getColor() { return this.color; }

    setColor(hex) {
      this._select(hex);
    }

    destroy() { this.container.innerHTML = ''; }
  }

  window.ColorMaps.ColorSwatches = ColorSwatches;
  window.ColorMaps.colorSwatches = {
    name: 'Color Swatches',
    create: (container, options) => new ColorSwatches(container, options)
  };
})();
