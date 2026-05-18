
// ============================================================
// SHARED COMPONENTS
// ============================================================
const { useState, useEffect, useRef, useCallback } = React;

// ── Market Ticker ────────────────────────────────────────────
function MarketTicker() {
  const items = window.MOCK.stocks;
  const double = [...items, ...items];
  return React.createElement('div', { className: 'ticker-wrap' },
    React.createElement('div', { className: 'ticker-track' },
      double.map((s, i) =>
        React.createElement('div', { key: i, className: 'ticker-item' },
          React.createElement('span', { className: 'sym' }, s.symbol),
          React.createElement('span', { className: 'price' }, '₹' + s.price.toLocaleString('en-IN')),
          React.createElement('span', { className: 'chg ' + (s.changePct >= 0 ? 'up' : 'dn') },
            (s.changePct >= 0 ? '+' : '') + s.changePct.toFixed(2) + '%'
          )
        )
      )
    )
  );
}

// ── Navbar ───────────────────────────────────────────────────
function Navbar({ page, setPage, searchQuery, setSearchQuery }) {
  const links = [
    { id: 'landing', label: '🏠 Home' },
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'scanner', label: '🔍 Scanner' },
  ];
  return React.createElement('nav', { className: 'navbar' },
    React.createElement('div', { className: 'nav-brand', onClick: () => setPage('landing'), style: { cursor:'pointer' } },
      React.createElement('div', { className: 'logo' }, '📈'),
      React.createElement('span', null, 'StockSense')
    ),
    React.createElement('div', { className: 'nav-links' },
      links.map(l =>
        React.createElement('div', { key: l.id, className: 'nav-link' + (page === l.id ? ' active' : ''), onClick: () => setPage(l.id) }, l.label)
      )
    ),
    React.createElement('div', { className: 'nav-right' },
      React.createElement('div', { className: 'search-box' },
        React.createElement('span', { className: 'search-icon' }, '🔎'),
        React.createElement('input', { type: 'text', placeholder: 'Search stocks...', value: searchQuery, onChange: e => setSearchQuery(e.target.value), onKeyDown: e => e.key === 'Enter' && setPage('dashboard') })
      )
    )
  );
}

// ── Sidebar ──────────────────────────────────────────────────
function Sidebar({ activeSection, setActiveSection }) {
  const items = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'watchlist', icon: '⭐', label: 'Watchlist' },
    { id: 'portfolio', icon: '💼', label: 'Portfolio' },
    { id: 'news', icon: '📰', label: 'News' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
  ];
  return React.createElement('aside', { className: 'sidebar' },
    React.createElement('div', { className: 'sidebar-label' }, 'Menu'),
    items.map(item =>
      React.createElement('div', { key: item.id, className: 'sidebar-item' + (activeSection === item.id ? ' active' : ''), onClick: () => setActiveSection(item.id) },
        React.createElement('span', { className: 'icon' }, item.icon),
        React.createElement('span', null, item.label)
      )
    )
  );
}

// ── Stock Card ───────────────────────────────────────────────
function StockCard({ stock, onClick, delay }) {
  const isUp = stock.changePct >= 0;
  const color = isUp ? '#00dc82' : '#ff4757';
  const hist = window.MOCK.historical[stock.symbol] || [];
  const capClass = stock.cap === 'Small Cap' ? 'cap-small' : stock.cap === 'Mid Cap' ? 'cap-mid' : 'cap-large';
  return React.createElement('div', { className: 'card stock-card stagger-' + (delay || 1), onClick: () => onClick && onClick(stock), style: { animationDelay: delay * 0.1 + 's' } },
    React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start' } },
      React.createElement('div', null,
        React.createElement('div', { className: 'stock-name' }, stock.name),
        React.createElement('div', { className: 'stock-symbol' }, stock.symbol)
      ),
      React.createElement('span', { className: 'cap-badge ' + capClass }, stock.cap)
    ),
    React.createElement('div', { className: 'stock-price' }, '₹' + stock.price.toLocaleString('en-IN')),
    React.createElement('div', { className: 'stock-change ' + (isUp ? 'up' : 'dn') },
      React.createElement('span', null, isUp ? '▲' : '▼'),
      React.createElement('span', null, (isUp ? '+' : '') + stock.change.toFixed(2)),
      React.createElement('span', null, ' (' + (isUp ? '+' : '') + stock.changePct.toFixed(2) + '%)'),
    ),
    hist.length > 0 && React.createElement(Sparkline, { data: hist, color }),
    React.createElement('div', { className: 'stock-meta' },
      React.createElement('span', null, 'Vol: ' + (stock.volume/1e5).toFixed(1) + 'L'),
      React.createElement('span', null, 'RSI: ' + stock.rsi),
      React.createElement('span', { style: { color: stock.signal === 'BUY' ? '#00dc82' : stock.signal === 'SELL' ? '#ff4757' : '#94a3b8', fontWeight: 700 } }, stock.signal)
    )
  );
}

// ── Portfolio Widget ─────────────────────────────────────────
function PortfolioWidget() {
  const p = window.MOCK.portfolio;
  const isUp = p.dayChange >= 0;
  const gainPct = ((p.totalValue - p.invested) / p.invested * 100).toFixed(2);
  return React.createElement('div', { className: 'card portfolio-card fade-in' },
    React.createElement('div', { className: 'card-header' },
      React.createElement('span', { className: 'card-title' }, '💼 Portfolio Value'),
      React.createElement('span', { style:{ fontSize:11,color:'var(--text3)' } }, 'Live')
    ),
    React.createElement('div', { className: 'pf-value' }, '₹' + p.totalValue.toLocaleString('en-IN')),
    React.createElement('div', { className: 'pf-change', style: { color: isUp ? 'var(--green)' : 'var(--red)' } },
      (isUp ? '▲ +' : '▼ ') + '₹' + Math.abs(p.dayChange).toLocaleString('en-IN') + ' (' + (isUp ? '+' : '') + p.dayChangePct.toFixed(2) + '%) today'
    ),
    React.createElement('div', { className: 'pf-stats' },
      React.createElement('div', { className: 'pf-stat' },
        React.createElement('span', { className: 'pf-stat-label' }, 'Invested'),
        React.createElement('span', { className: 'pf-stat-value' }, '₹' + p.invested.toLocaleString('en-IN'))
      ),
      React.createElement('div', { className: 'pf-stat' },
        React.createElement('span', { className: 'pf-stat-label' }, 'Total Gain'),
        React.createElement('span', { className: 'pf-stat-value', style: { color: 'var(--green)' } }, '+' + gainPct + '%')
      ),
      React.createElement('div', { className: 'pf-stat' },
        React.createElement('span', { className: 'pf-stat-label' }, 'Stocks'),
        React.createElement('span', { className: 'pf-stat-value' }, window.MOCK.stocks.length)
      )
    )
  );
}

// ── Watchlist Widget ─────────────────────────────────────────
function WatchlistWidget({ onSelect }) {
  const [watched, setWatched] = useState(['JBMA','TATAMOTORS','RELIANCE','OLAELEC','HDFCBANK']);
  const stocks = window.MOCK.stocks.filter(s => watched.includes(s.symbol));
  return React.createElement('div', { className: 'card fade-in' },
    React.createElement('div', { className: 'card-header' },
      React.createElement('span', { className: 'card-title' }, '⭐ Watchlist'),
      React.createElement('span', { style:{fontSize:12,color:'var(--accent2)',cursor:'pointer'} }, 'Edit')
    ),
    stocks.map(s =>
      React.createElement('div', { key: s.symbol, className: 'watchlist-item', onClick: () => onSelect(s), style:{cursor:'pointer'} },
        React.createElement('div', { className: 'wl-info' },
          React.createElement('span', { className: 'wl-name' }, s.symbol),
          React.createElement('span', { className: 'wl-sector' }, s.sector)
        ),
        React.createElement('div', { className: 'wl-price' },
          React.createElement('div', { className: 'price' }, '₹' + s.price.toLocaleString('en-IN')),
          React.createElement('div', { className: 'change', style:{color: s.changePct>=0?'var(--green)':'var(--red)'} }, (s.changePct>=0?'+':'')+s.changePct.toFixed(2)+'%')
        )
      )
    )
  );
}

// ── Market Sentiment Widget ───────────────────────────────────
function SentimentWidget() {
  const stocks = window.MOCK.stocks;
  const bull = stocks.filter(s => s.signal === 'BUY').length;
  const bear = stocks.filter(s => s.signal === 'SELL').length;
  const neutral = stocks.length - bull - bear;
  const total = stocks.length;
  return React.createElement('div', { className: 'card fade-in' },
    React.createElement('div', { className: 'card-header' },
      React.createElement('span', { className: 'card-title' }, '🌡️ Market Sentiment'),
      React.createElement('span', { style:{fontSize:12,color:'var(--green)',fontWeight:700} }, 'Bullish')
    ),
    React.createElement('div', { className: 'sentiment-bar' },
      React.createElement('div', { className: 'seg bull', style:{width:(bull/total*100)+'%'} }),
      React.createElement('div', { className: 'seg neutral', style:{width:(neutral/total*100)+'%'} }),
      React.createElement('div', { className: 'seg bear', style:{width:(bear/total*100)+'%'} })
    ),
    React.createElement('div', { className: 'sentiment-labels' },
      React.createElement('span', { style:{color:'var(--green)'} }, '▲ ' + bull + ' Buy'),
      React.createElement('span', null, neutral + ' Hold'),
      React.createElement('span', { style:{color:'var(--red)'} }, bear + ' Sell ▼')
    ),
    React.createElement('div', { style:{marginTop:16,display:'flex',flexDirection:'column',gap:8} },
      [
        { label:'Nifty 50', val:'+0.82%', up:true },
        { label:'Sensex', val:'+0.76%', up:true },
        { label:'Bank Nifty', val:'+0.44%', up:true },
        { label:'India VIX', val:'-3.2%', up:false }
      ].map(item =>
        React.createElement('div', { key:item.label, style:{display:'flex',justifyContent:'space-between',fontSize:13} },
          React.createElement('span', { style:{color:'var(--text2)'} }, item.label),
          React.createElement('span', { style:{color:item.up?'var(--green)':'var(--red)',fontWeight:600} }, item.val)
        )
      )
    )
  );
}

// ── News Widget ──────────────────────────────────────────────
function NewsWidget() {
  return React.createElement('div', { className: 'card fade-in' },
    React.createElement('div', { className: 'card-header' },
      React.createElement('span', { className: 'card-title' }, '📰 Market News'),
      React.createElement('span', { style:{fontSize:11,color:'var(--text3)'} }, 'Live Feed')
    ),
    window.MOCK.news.slice(0,6).map(n =>
      React.createElement('div', { key:n.id, className: 'news-item' },
        React.createElement('div', { className: 'news-dot ' + n.sentiment }),
        React.createElement('div', null,
          React.createElement('div', { className: 'news-title' }, n.title),
          React.createElement('div', { className: 'news-meta' }, n.source + ' · ' + n.time)
        )
      )
    )
  );
}

// ── Top Gainers / Losers ─────────────────────────────────────
function TopMovers({ type, onSelect }) {
  const sorted = [...window.MOCK.stocks].sort((a,b) => type === 'gainers' ? b.changePct - a.changePct : a.changePct - b.changePct).slice(0,5);
  const isGainer = type === 'gainers';
  return React.createElement('div', { className: 'card fade-in' },
    React.createElement('div', { className: 'card-header' },
      React.createElement('span', { className: 'card-title', style:{color: isGainer?'var(--green)':'var(--red)'} }, isGainer ? '🚀 Top Gainers' : '📉 Top Losers')
    ),
    sorted.map((s,i) =>
      React.createElement('div', { key:s.symbol, className:'watchlist-item', onClick:()=>onSelect(s), style:{cursor:'pointer'} },
        React.createElement('div', { className:'wl-info' },
          React.createElement('span', { className:'wl-name' }, s.symbol),
          React.createElement('span', { className:'wl-sector' }, s.sector)
        ),
        React.createElement('div', { className:'wl-price' },
          React.createElement('div', { className:'price' }, '₹'+s.price.toLocaleString('en-IN')),
          React.createElement('div', { className:'change', style:{color:isGainer?'var(--green)':'var(--red)',fontWeight:700} }, (isGainer?'+':'')+s.changePct.toFixed(2)+'%')
        )
      )
    )
  );
}
