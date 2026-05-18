
// ============================================================
// PAGES: Landing, Dashboard, Stock Detail, Scanner
// ============================================================

// ── LANDING PAGE ─────────────────────────────────────────────
function LandingPage({ setPage }) {
  const features = [
    { icon:'📈', color:'rgba(99,102,241,.15)', title:'Real-Time Charts', desc:'Candlestick, Area and Volume charts powered by Recharts with live-style updates.' },
    { icon:'🧠', color:'rgba(34,211,238,.15)', title:'Technical Indicators', desc:'RSI, MACD, EMA, SMA, Bollinger Bands and VWAP in one unified view.' },
    { icon:'🔍', color:'rgba(0,220,130,.15)', title:'Intraday Scanner', desc:'Filter by breakout, EMA crossover, volume spike, gap-up and RSI zones.' },
    { icon:'⭐', color:'rgba(245,158,11,.15)', title:'Smart Watchlist', desc:'Track your favourite stocks with live P&L, signals and sentiment overlay.' },
    { icon:'📰', color:'rgba(255,71,87,.15)', title:'Market News', desc:'Curated news feed colour-coded by sentiment to keep you ahead of the market.' },
    { icon:'💼', color:'rgba(129,140,248,.15)', title:'Portfolio Tracker', desc:'Monitor total value, daily change and overall returns at a glance.' },
  ];
  return React.createElement('div', { className:'landing' },
    // Hero
    React.createElement('section', { className:'hero' },
      React.createElement('div', { className:'hero-content' },
        React.createElement('div', { className:'hero-badge' }, '✨ Professional Trading Dashboard'),
        React.createElement('h1', null,
          'Trade Smarter with ',
          React.createElement('span', { className:'gradient-text' }, 'AI-Powered Insights')
        ),
        React.createElement('p', null, 'Advanced stock analysis, real-time charts and intraday signals — all in one premium fintech dashboard.'),
        React.createElement('div', { className:'hero-buttons' },
          React.createElement('button', { className:'btn-primary', onClick:()=>setPage('dashboard') }, '🚀 Open Dashboard'),
          React.createElement('button', { className:'btn-secondary', onClick:()=>setPage('scanner') }, '🔍 Try Scanner')
        ),
        React.createElement('div', { className:'hero-stats' },
          [{ v:'10+', l:'Stocks Tracked' },{ v:'6', l:'Indicators' },{ v:'Real-Time', l:'Market Data' }].map(s=>
            React.createElement('div', { key:s.l, className:'hero-stat' },
              React.createElement('div', { className:'stat-value' }, s.v),
              React.createElement('div', { className:'stat-label' }, s.l)
            )
          )
        )
      )
    ),
    // Features
    React.createElement('section', { className:'features' },
      React.createElement('h2', null, 'Everything You Need to Trade'),
      React.createElement('p', { className:'subtitle' }, 'Built for active traders. Designed for clarity.'),
      React.createElement('div', { className:'feature-grid' },
        features.map((f,i)=>
          React.createElement('div', { key:i, className:'feature-card fade-in', style:{animationDelay:i*0.1+'s'} },
            React.createElement('div', { className:'feature-icon', style:{background:f.color} }, f.icon),
            React.createElement('h3', null, f.title),
            React.createElement('p', null, f.desc)
          )
        )
      )
    ),
    // CTA
    React.createElement('section', { className:'cta-section' },
      React.createElement('h2', null, 'Ready to Analyse the Market?'),
      React.createElement('p', null, 'Access advanced charts, technical indicators and intraday signals right now.'),
      React.createElement('button', { className:'btn-primary', onClick:()=>setPage('dashboard') }, '📊 Go to Dashboard')
    ),
    // Footer
    React.createElement('footer', { className:'footer' },
      React.createElement('div', { className:'footer-content' },
        React.createElement('div', { className:'footer-brand' }, '📈 StockSense'),
        React.createElement('div', { className:'footer-links' },
          ['Dashboard','Scanner','Watchlist','News'].map(l=>React.createElement('a',{key:l,href:'#'},l))
        )
      ),
      React.createElement('div', { className:'footer-copy' }, '© 2026 StockSense · For educational purposes only · Not financial advice')
    )
  );
}

// ── DASHBOARD PAGE ────────────────────────────────────────────
function DashboardPage({ setPage, setSelectedStock, searchQuery }) {
  const [section, setSection] = React.useState('overview');
  const allStocks = window.MOCK.stocks;
  const filtered = searchQuery
    ? allStocks.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
    : allStocks;

  const handleSelect = (stock) => { setSelectedStock(stock); setPage('detail'); };

  let content;
  if (section === 'overview') {
    content = React.createElement('div', null,
      React.createElement('div', { className:'grid-2', style:{marginBottom:20} },
        React.createElement(PortfolioWidget),
        React.createElement(SentimentWidget)
      ),
      React.createElement('div', { className:'grid-2', style:{marginBottom:20} },
        React.createElement(TopMovers, { type:'gainers', onSelect:handleSelect }),
        React.createElement(TopMovers, { type:'losers', onSelect:handleSelect })
      ),
      React.createElement('h3', { style:{fontSize:16,fontWeight:700,marginBottom:14,color:'var(--text2)'} }, 'All Stocks'),
      React.createElement('div', { className:'grid-auto' },
        filtered.map((s,i) => React.createElement(StockCard, { key:s.symbol, stock:s, onClick:handleSelect, delay:i+1 }))
      )
    );
  } else if (section === 'watchlist') {
    content = React.createElement('div', { className:'grid-2' },
      React.createElement(WatchlistWidget, { onSelect:handleSelect }),
      React.createElement(NewsWidget)
    );
  } else if (section === 'portfolio') {
    content = React.createElement('div', null,
      React.createElement(PortfolioWidget),
      React.createElement('div', { style:{height:16} }),
      React.createElement('div', { className:'grid-3' },
        filtered.slice(0,6).map((s,i) => React.createElement(StockCard, { key:s.symbol, stock:s, onClick:handleSelect, delay:i+1 }))
      )
    );
  } else if (section === 'news') {
    content = React.createElement('div', { className:'grid-2' },
      React.createElement(NewsWidget),
      React.createElement(SentimentWidget)
    );
  } else {
    content = React.createElement('div', null,
      React.createElement('div', { className:'grid-2' },
        React.createElement(TopMovers, { type:'gainers', onSelect:handleSelect }),
        React.createElement(TopMovers, { type:'losers', onSelect:handleSelect })
      )
    );
  }

  return React.createElement('div', { className:'app-layout' },
    React.createElement(Sidebar, { activeSection:section, setActiveSection:setSection }),
    React.createElement('main', { className:'main-content' },
      React.createElement('div', { style:{marginBottom:20} },
        React.createElement('h2', { style:{fontSize:22,fontWeight:800,marginBottom:4} }, '📊 Market Dashboard'),
        React.createElement('p', { style:{color:'var(--text3)',fontSize:13} }, new Date().toLocaleDateString('en-IN',{weekday:'long',day:'2-digit',month:'long',year:'numeric'}) + ' · NSE/BSE')
      ),
      content
    )
  );
}

// ── STOCK DETAIL PAGE ─────────────────────────────────────────
function StockDetailPage({ stock, setPage }) {
  const [tf, setTf] = React.useState('1M');
  const [showEMA, setShowEMA] = React.useState(true);
  const [showSMA, setShowSMA] = React.useState(true);
  const [showBB, setShowBB] = React.useState(false);
  const [showCandle, setShowCandle] = React.useState(false);
  const [tab, setTab] = React.useState('price');

  if (!stock) { setPage('dashboard'); return null; }

  const allHist = window.MOCK.historical[stock.symbol] || [];
  const tfMap = { '1W':7,'2W':14,'1M':30,'3M':60 };
  const hist = allHist.slice(-(tfMap[tf]||30));
  const intra = window.MOCK.intraday[stock.symbol] || [];
  const isUp = stock.changePct >= 0;
  const rsiColor = stock.rsi > 70 ? 'var(--red)' : stock.rsi < 30 ? 'var(--green)' : 'var(--accent2)';

  return React.createElement('div', { style:{padding:'20px 24px'} },
    // Back
    React.createElement('button', { onClick:()=>setPage('dashboard'), style:{background:'var(--glass)',border:'1px solid var(--border)',color:'var(--text2)',padding:'8px 16px',borderRadius:8,fontSize:13,cursor:'pointer',marginBottom:20,display:'flex',alignItems:'center',gap:6} }, '← Back to Dashboard'),
    // Header
    React.createElement('div', { className:'detail-header' },
      React.createElement('div', null,
        React.createElement('div', { style:{display:'flex',alignItems:'center',gap:10,marginBottom:4} },
          React.createElement('h1', { className:'detail-name' }, stock.name),
          React.createElement('span', { className:'cap-badge '+(stock.cap==='Small Cap'?'cap-small':stock.cap==='Mid Cap'?'cap-mid':'cap-large') }, stock.cap)
        ),
        React.createElement('div', { className:'detail-symbol' }, stock.symbol + ' · ' + stock.sector),
        React.createElement('div', { className:'detail-price' }, '₹'+stock.price.toLocaleString('en-IN')),
        React.createElement('div', { className:'detail-change', style:{color:isUp?'var(--green)':'var(--red)'} },
          (isUp?'▲ +':'▼ ')+stock.change.toFixed(2)+' ('+(isUp?'+':'')+stock.changePct.toFixed(2)+'%) today'
        )
      ),
      React.createElement('div', { className:'detail-actions' },
        React.createElement('button', { className:'btn-buy' }, '▲ BUY'),
        React.createElement('button', { className:'btn-sell' }, '▼ SELL')
      )
    ),
    // Indicators summary
    React.createElement('div', { className:'indicator-grid fade-in' },
      [
        { label:'RSI (14)', value:stock.rsi, color:rsiColor },
        { label:'Day High', value:'₹'+stock.dayHigh, color:'var(--green)' },
        { label:'Day Low', value:'₹'+stock.dayLow, color:'var(--red)' },
        { label:'Volume', value:(stock.volume/1e5).toFixed(1)+'L', color:'var(--accent2)' },
        { label:'52W High', value:'₹'+stock.w52High, color:'var(--green)' },
        { label:'52W Low', value:'₹'+stock.w52Low, color:'var(--red)' },
        { label:'Mkt Cap', value:stock.mktCap, color:'var(--cyan)' },
        { label:'Signal', value:stock.signal, color:stock.signal==='BUY'?'var(--green)':stock.signal==='SELL'?'var(--red)':'var(--text2)' },
      ].map(ind=>
        React.createElement('div', { key:ind.label, className:'indicator-item' },
          React.createElement('div', { className:'ind-label' }, ind.label),
          React.createElement('div', { className:'ind-value', style:{color:ind.color} }, ind.value)
        )
      )
    ),
    // Chart tabs
    React.createElement('div', { className:'chart-container' },
      React.createElement('div', { className:'chart-header' },
        React.createElement('div', { className:'chart-controls' },
          ['price','intraday','candle'].map(t=>
            React.createElement('button', { key:t, className:'tf-btn'+(tab===t?' active':''), onClick:()=>setTab(t) }, t==='price'?'📈 Price':t==='intraday'?'⚡ Intraday':'🕯️ Candle')
          )
        ),
        React.createElement('div', { className:'chart-controls' },
          ['1W','2W','1M','3M'].map(t=>
            React.createElement('button', { key:t, className:'tf-btn'+(tf===t?' active':''), onClick:()=>setTf(t) }, t)
          )
        )
      ),
      tab==='price' && React.createElement('div', null,
        React.createElement('div', { style:{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12} },
          React.createElement('button', { className:'toggle-btn'+(showEMA?' on':''), onClick:()=>setShowEMA(v=>!v) }, 'EMA 20'),
          React.createElement('button', { className:'toggle-btn'+(showSMA?' on':''), onClick:()=>setShowSMA(v=>!v) }, 'SMA 50'),
          React.createElement('button', { className:'toggle-btn'+(showBB?' on':''), onClick:()=>setShowBB(v=>!v) }, 'Bollinger Bands')
        ),
        React.createElement(PriceVolumeChart, { data:hist, symbol:stock.symbol, showEMA, showSMA, showBollinger:showBB })
      ),
      tab==='intraday' && React.createElement(IntradayChart, { data:intra }),
      tab==='candle' && React.createElement(CandlestickChart, { data:hist })
    ),
    // RSI + MACD
    React.createElement('div', { className:'grid-2' },
      React.createElement('div', { className:'chart-container' },
        React.createElement('div', { className:'chart-header' }, React.createElement('span', { className:'chart-title' }, '📊 RSI (14)')),
        React.createElement(RSIChart, { data:hist })
      ),
      React.createElement('div', { className:'chart-container' },
        React.createElement('div', { className:'chart-header' }, React.createElement('span', { className:'chart-title' }, '📉 MACD')),
        React.createElement(MACDChart, { data:hist })
      )
    ),
    // Volume
    React.createElement('div', { className:'chart-container' },
      React.createElement('div', { className:'chart-header' }, React.createElement('span', { className:'chart-title' }, '📦 Volume Analysis')),
      React.createElement(VolumeChart, { data:hist })
    ),
    // Stock info table
    React.createElement('div', { className:'card fade-in', style:{marginBottom:20} },
      React.createElement('div', { className:'card-header' }, React.createElement('span', { className:'card-title' }, 'Stock Information')),
      React.createElement('div', { className:'info-grid' },
        [
          { label:'Previous Close', value:'₹'+stock.prevClose },
          { label:'Market Cap', value:stock.mktCap },
          { label:'P/E Ratio', value:stock.pe > 0 ? stock.pe : 'N/A (Loss)' },
          { label:'Avg Volume', value:(stock.avgVol/1e5).toFixed(1)+'L' },
          { label:'Sector', value:stock.sector },
          { label:'Confidence', value:stock.confidence+'%' },
        ].map(item=>
          React.createElement('div', { key:item.label, className:'info-item' },
            React.createElement('span', { className:'label' }, item.label),
            React.createElement('span', { className:'value' }, item.value)
          )
        )
      )
    )
  );
}

// ── INTRADAY SCANNER PAGE ─────────────────────────────────────
function ScannerPage({ setPage, setSelectedStock }) {
  const filters = ['All','BUY','SELL','HOLD','EMA Crossover','Breakout','Gap Up','Volume Spike','RSI Oversold','MACD Bullish'];
  const [active, setActive] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('confidence');
  const results = window.MOCK.scannerResults;

  let filtered = active === 'All' ? results : results.filter(r => r.signal === active || r.pattern === active);
  filtered = [...filtered].sort((a,b) => sortBy === 'confidence' ? b.confidence - a.confidence : sortBy === 'change' ? b.changePct - a.changePct : b.rsi - a.rsi);

  const handleSelect = (r) => {
    const stock = window.MOCK.stocks.find(s => s.symbol === r.symbol);
    if (stock) { setSelectedStock(stock); setPage('detail'); }
  };

  return React.createElement('div', { style:{padding:'20px 24px'} },
    React.createElement('div', { style:{marginBottom:24} },
      React.createElement('h1', { style:{fontSize:24,fontWeight:800,marginBottom:4} }, '🔍 Intraday Scanner'),
      React.createElement('p', { style:{color:'var(--text3)',fontSize:13} }, 'AI-powered signals updated every 5 minutes · ' + new Date().toLocaleTimeString('en-IN'))
    ),
    // Filters
    React.createElement('div', { className:'scanner-filters' },
      filters.map(f=>
        React.createElement('button', { key:f, className:'filter-chip'+(active===f?' active':''), onClick:()=>setActive(f) }, f)
      )
    ),
    // Sort
    React.createElement('div', { style:{display:'flex',gap:8,marginBottom:20,alignItems:'center'} },
      React.createElement('span', { style:{fontSize:12,color:'var(--text3)'} }, 'Sort by:'),
      ['confidence','change','rsi'].map(s=>
        React.createElement('button', { key:s, className:'tf-btn'+(sortBy===s?' active':''), onClick:()=>setSortBy(s) }, s==='confidence'?'Confidence':s==='change'?'% Change':'RSI')
      )
    ),
    // Stats bar
    React.createElement('div', { style:{display:'flex',gap:16,marginBottom:20,flexWrap:'wrap'} },
      [
        { label:'Total Signals', val:filtered.length, color:'var(--accent2)' },
        { label:'Buy Signals', val:filtered.filter(r=>r.signal==='BUY').length, color:'var(--green)' },
        { label:'Sell Signals', val:filtered.filter(r=>r.signal==='SELL').length, color:'var(--red)' },
        { label:'Avg Confidence', val:Math.round(filtered.reduce((s,r)=>s+r.confidence,0)/Math.max(filtered.length,1))+'%', color:'var(--cyan)' },
      ].map(stat=>
        React.createElement('div', { key:stat.label, className:'card', style:{flex:'1 1 120px',textAlign:'center',padding:'12px'} },
          React.createElement('div', { style:{fontSize:22,fontWeight:800,color:stat.color} }, stat.val),
          React.createElement('div', { style:{fontSize:11,color:'var(--text3)',marginTop:2} }, stat.label)
        )
      )
    ),
    // Results grid
    React.createElement('div', { className:'grid-auto' },
      filtered.map((r,i)=>
        React.createElement('div', { key:r.symbol, className:'card scanner-card', onClick:()=>handleSelect(r), style:{animationDelay:i*0.08+'s',cursor:'pointer'} },
          React.createElement('div', { style:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10} },
            React.createElement('div', null,
              React.createElement('div', { style:{fontSize:15,fontWeight:700} }, r.name),
              React.createElement('div', { style:{fontSize:11,color:'var(--text3)',marginTop:2} }, r.symbol + ' · ' + r.pattern)
            ),
            React.createElement('span', { className:'signal-badge signal-'+r.signal.toLowerCase() }, r.signal==='BUY'?'▲ BUY':r.signal==='SELL'?'▼ SELL':'◆ HOLD')
          ),
          React.createElement('div', { style:{fontSize:20,fontWeight:800,marginBottom:4} }, '₹'+r.price.toLocaleString('en-IN')),
          React.createElement('div', { style:{fontSize:13,fontWeight:600,color:r.changePct>=0?'var(--green)':'var(--red)',marginBottom:10} }, (r.changePct>=0?'+':'')+r.changePct.toFixed(2)+'%'),
          React.createElement('div', { style:{display:'flex',justifyContent:'space-between',fontSize:12,color:'var(--text3)',marginBottom:8} },
            React.createElement('span', null, 'RSI: ', React.createElement('span', { style:{color:r.rsi>70?'var(--red)':r.rsi<30?'var(--green)':'var(--text)',fontWeight:600} }, r.rsi)),
            React.createElement('span', null, 'Vol: ', React.createElement('span', { style:{color:'var(--text)',fontWeight:600} }, r.volume))
          ),
          React.createElement('div', { style:{display:'flex',justifyContent:'space-between',alignItems:'center'} },
            React.createElement('span', { style:{fontSize:12,color:'var(--text3)'} }, 'Confidence'),
            React.createElement('span', { style:{fontSize:13,fontWeight:700,color:'var(--accent2)'} }, r.confidence+'%')
          ),
          React.createElement('div', { className:'confidence-bar' },
            React.createElement('div', { className:'confidence-fill', style:{width:r.confidence+'%',background:r.signal==='BUY'?'var(--green)':r.signal==='SELL'?'var(--red)':'var(--accent2)'} })
          )
        )
      )
    )
  );
}
