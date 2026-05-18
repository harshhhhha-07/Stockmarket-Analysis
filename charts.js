
// ============================================================
// CHART COMPONENTS — uses Recharts from CDN
// ============================================================
const {
  ComposedChart, LineChart, BarChart, AreaChart,
  Line, Bar, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, ResponsiveContainer,
  Cell
} = Recharts;

// ── Mini Sparkline for stock cards ──────────────────────────
function Sparkline({ data, color }) {
  const vals = data.slice(-20).map(d => ({ v: d.close }));
  return React.createElement(ResponsiveContainer, { width: '100%', height: 50 },
    React.createElement(AreaChart, { data: vals, margin: { top: 4, right: 0, left: 0, bottom: 0 } },
      React.createElement('defs', null,
        React.createElement('linearGradient', { id: 'sg_' + color.replace('#',''), x1: '0', y1: '0', x2: '0', y2: '1' },
          React.createElement('stop', { offset: '0%', stopColor: color, stopOpacity: 0.3 }),
          React.createElement('stop', { offset: '100%', stopColor: color, stopOpacity: 0 })
        )
      ),
      React.createElement(Area, { type: 'monotone', dataKey: 'v', stroke: color, strokeWidth: 1.5, fill: 'url(#sg_' + color.replace('#','') + ')', dot: false, isAnimationActive: true })
    )
  );
}

// ── Price + Volume Chart ─────────────────────────────────────
function PriceVolumeChart({ data, symbol, showEMA, showSMA, showBollinger }) {
  return React.createElement(ResponsiveContainer, { width: '100%', height: 320 },
    React.createElement(ComposedChart, { data: data, margin: { top: 10, right: 20, left: 10, bottom: 5 } },
      React.createElement('defs', null,
        React.createElement('linearGradient', { id: 'priceGrad', x1: '0', y1: '0', x2: '0', y2: '1' },
          React.createElement('stop', { offset: '0%', stopColor: '#6366f1', stopOpacity: 0.25 }),
          React.createElement('stop', { offset: '100%', stopColor: '#6366f1', stopOpacity: 0 })
        )
      ),
      React.createElement(CartesianGrid, { strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.05)' }),
      React.createElement(XAxis, { dataKey: 'date', tick: { fontSize: 10 }, tickLine: false }),
      React.createElement(YAxis, { yAxisId: 'price', orientation: 'right', tick: { fontSize: 10 }, tickLine: false, tickFormatter: v => '₹' + v.toFixed(0), domain: ['auto','auto'] }),
      React.createElement(YAxis, { yAxisId: 'vol', orientation: 'left', tick: { fontSize: 10 }, tickLine: false, tickFormatter: v => (v/1e5).toFixed(1)+'L' }),
      React.createElement(Tooltip, { contentStyle: { background: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontSize: 12 }, formatter: (v, n) => n === 'volume' ? (v/1e5).toFixed(1)+'L' : '₹'+v.toFixed(2) }),
      React.createElement(Legend, { wrapperStyle: { fontSize: 12 } }),
      React.createElement(Bar, { yAxisId: 'vol', dataKey: 'volume', name: 'Volume', fill: 'rgba(99,102,241,0.2)', radius: [2,2,0,0] }),
      showBollinger && React.createElement(Area, { yAxisId: 'price', type: 'monotone', dataKey: 'bollingerUpper', name: 'BB Upper', stroke: 'rgba(245,158,11,0.4)', strokeDasharray:'4 2', fill: 'none', dot: false }),
      showBollinger && React.createElement(Area, { yAxisId: 'price', type: 'monotone', dataKey: 'bollingerLower', name: 'BB Lower', stroke: 'rgba(245,158,11,0.4)', strokeDasharray:'4 2', fill: 'none', dot: false }),
      showEMA && React.createElement(Line, { yAxisId: 'price', type: 'monotone', dataKey: 'ema20', name: 'EMA 20', stroke: '#22d3ee', strokeWidth: 1.5, dot: false }),
      showSMA && React.createElement(Line, { yAxisId: 'price', type: 'monotone', dataKey: 'sma50', name: 'SMA 50', stroke: '#f59e0b', strokeWidth: 1.5, dot: false }),
      React.createElement(Area, { yAxisId: 'price', type: 'monotone', dataKey: 'close', name: 'Price', stroke: '#6366f1', strokeWidth: 2, fill: 'url(#priceGrad)', dot: false })
    )
  );
}

// ── RSI Chart ───────────────────────────────────────────────
function RSIChart({ data }) {
  return React.createElement(ResponsiveContainer, { width: '100%', height: 140 },
    React.createElement(ComposedChart, { data: data, margin: { top: 5, right: 20, left: 10, bottom: 5 } },
      React.createElement(CartesianGrid, { strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.05)' }),
      React.createElement(XAxis, { dataKey: 'date', tick: { fontSize: 10 }, tickLine: false }),
      React.createElement(YAxis, { domain: [0, 100], ticks: [20, 30, 50, 70, 80], tick: { fontSize: 10 }, tickLine: false }),
      React.createElement(Tooltip, { contentStyle: { background: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontSize: 12 } }),
      React.createElement(ReferenceLine, { y: 70, stroke: 'rgba(255,71,87,0.5)', strokeDasharray: '4 2', label: { value: 'OB', fill: '#ff4757', fontSize: 10 } }),
      React.createElement(ReferenceLine, { y: 30, stroke: 'rgba(0,220,130,0.5)', strokeDasharray: '4 2', label: { value: 'OS', fill: '#00dc82', fontSize: 10 } }),
      React.createElement(Line, { type: 'monotone', dataKey: 'rsi', name: 'RSI', stroke: '#818cf8', strokeWidth: 2, dot: false })
    )
  );
}

// ── MACD Chart ──────────────────────────────────────────────
function MACDChart({ data }) {
  return React.createElement(ResponsiveContainer, { width: '100%', height: 140 },
    React.createElement(ComposedChart, { data: data, margin: { top: 5, right: 20, left: 10, bottom: 5 } },
      React.createElement(CartesianGrid, { strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.05)' }),
      React.createElement(XAxis, { dataKey: 'date', tick: { fontSize: 10 }, tickLine: false }),
      React.createElement(YAxis, { tick: { fontSize: 10 }, tickLine: false }),
      React.createElement(Tooltip, { contentStyle: { background: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontSize: 12 } }),
      React.createElement(ReferenceLine, { y: 0, stroke: 'rgba(255,255,255,0.1)' }),
      React.createElement(Bar, { dataKey: 'macdHist', name: 'Histogram', radius: [2,2,0,0] },
        ...data.map((d, i) => React.createElement(Cell, { key: i, fill: d.macdHist >= 0 ? 'rgba(0,220,130,0.6)' : 'rgba(255,71,87,0.6)' }))
      ),
      React.createElement(Line, { type: 'monotone', dataKey: 'macdLine', name: 'MACD', stroke: '#6366f1', strokeWidth: 1.5, dot: false }),
      React.createElement(Line, { type: 'monotone', dataKey: 'macdSignal', name: 'Signal', stroke: '#f59e0b', strokeWidth: 1.5, dot: false })
    )
  );
}

// ── Volume Chart ─────────────────────────────────────────────
function VolumeChart({ data }) {
  const avg = data.reduce((s, d) => s + d.volume, 0) / data.length;
  return React.createElement(ResponsiveContainer, { width: '100%', height: 120 },
    React.createElement(ComposedChart, { data: data, margin: { top: 5, right: 20, left: 10, bottom: 5 } },
      React.createElement(CartesianGrid, { strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.05)' }),
      React.createElement(XAxis, { dataKey: 'date', tick: { fontSize: 10 }, tickLine: false }),
      React.createElement(YAxis, { tick: { fontSize: 10 }, tickLine: false, tickFormatter: v => (v/1e5).toFixed(0)+'L' }),
      React.createElement(Tooltip, { contentStyle: { background: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontSize: 12 }, formatter: v => [(v/1e5).toFixed(1)+'L', 'Volume'] }),
      React.createElement(ReferenceLine, { y: avg, stroke: 'rgba(245,158,11,0.5)', strokeDasharray: '4 2' }),
      React.createElement(Bar, { dataKey: 'volume', name: 'Volume', radius: [2,2,0,0] },
        ...data.map((d, i) => React.createElement(Cell, { key: i, fill: d.volume > avg ? 'rgba(0,220,130,0.5)' : 'rgba(99,102,241,0.35)' }))
      )
    )
  );
}

// ── Intraday Price Chart ─────────────────────────────────────
function IntradayChart({ data }) {
  const first = data[0]?.price || 0;
  return React.createElement(ResponsiveContainer, { width: '100%', height: 220 },
    React.createElement(AreaChart, { data: data, margin: { top: 5, right: 20, left: 10, bottom: 5 } },
      React.createElement('defs', null,
        React.createElement('linearGradient', { id: 'intrGrad', x1: '0', y1: '0', x2: '0', y2: '1' },
          React.createElement('stop', { offset: '0%', stopColor: '#22d3ee', stopOpacity: 0.3 }),
          React.createElement('stop', { offset: '100%', stopColor: '#22d3ee', stopOpacity: 0 })
        )
      ),
      React.createElement(CartesianGrid, { strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.05)' }),
      React.createElement(XAxis, { dataKey: 'time', tick: { fontSize: 10 }, tickLine: false, interval: 7 }),
      React.createElement(YAxis, { tick: { fontSize: 10 }, tickLine: false, domain: ['auto','auto'], tickFormatter: v => '₹'+v.toFixed(0) }),
      React.createElement(Tooltip, { contentStyle: { background: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontSize: 12 }, formatter: v => ['₹'+v.toFixed(2), 'Price'] }),
      React.createElement(ReferenceLine, { y: first, stroke: 'rgba(255,255,255,0.15)', strokeDasharray: '4 2' }),
      React.createElement(Area, { type: 'monotone', dataKey: 'price', stroke: '#22d3ee', strokeWidth: 2, fill: 'url(#intrGrad)', dot: false })
    )
  );
}

// ── Candlestick Chart (SVG custom) ───────────────────────────
function CandlestickChart({ data }) {
  const w = 14, gap = 4, h = 280, padL = 55, padR = 10, padT = 15, padB = 25;
  const slice = data.slice(-40);
  const prices = slice.flatMap(d => [d.high, d.low]);
  const minP = Math.min(...prices), maxP = Math.max(...prices);
  const range = maxP - minP || 1;
  const totalW = slice.length * (w + gap) + padL + padR;
  const toY = p => padT + ((maxP - p) / range) * (h - padT - padB);

  const ticks = [];
  const steps = 5;
  for (let i = 0; i <= steps; i++) {
    const v = minP + (range * i / steps);
    const y = toY(v);
    ticks.push(
      React.createElement('g', { key: i },
        React.createElement('line', { x1: padL, y1: y, x2: totalW - padR, y2: y, stroke: 'rgba(255,255,255,0.04)' }),
        React.createElement('text', { x: padL - 5, y: y + 4, textAnchor: 'end', fontSize: 9, fill: '#64748b' }, '₹' + v.toFixed(0))
      )
    );
  }

  const candles = slice.map((d, i) => {
    const x = padL + i * (w + gap);
    const isUp = d.close >= d.open;
    const color = isUp ? '#00dc82' : '#ff4757';
    const bodyTop = toY(Math.max(d.open, d.close));
    const bodyBot = toY(Math.min(d.open, d.close));
    const bodyH = Math.max(bodyBot - bodyTop, 1);
    const cx = x + w / 2;
    return React.createElement('g', { key: i },
      React.createElement('line', { x1: cx, y1: toY(d.high), x2: cx, y2: toY(d.low), stroke: color, strokeWidth: 1 }),
      React.createElement('rect', { x, y: bodyTop, width: w, height: bodyH, fill: isUp ? color : 'none', stroke: color, strokeWidth: 1, rx: 1, fillOpacity: isUp ? 0.85 : 1 }),
      i % 5 === 0 && React.createElement('text', { x: cx, y: h - 5, textAnchor: 'middle', fontSize: 8, fill: '#64748b' }, d.date)
    );
  });

  return React.createElement('div', { className: 'candle-chart' },
    React.createElement('svg', { width: '100%', height: h, viewBox: `0 0 ${totalW} ${h}`, preserveAspectRatio: 'none', style: { minWidth: totalW } },
      ...ticks, ...candles
    )
  );
}
