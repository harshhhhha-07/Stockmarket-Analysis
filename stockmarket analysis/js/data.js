// ============================================================
// STOCK MARKET DASHBOARD — Mock Data
// ============================================================

function _genHist(base, vol, trend, n) {
  var d = [], p = base * (1 - trend * n * 0.002);
  for (var i = 0; i < n; i++) {
    var dt = new Date(); dt.setDate(dt.getDate() - (n - i));
    var ch = (Math.random() - 0.45 + trend * 0.015) * vol * p;
    var o = p, c = p + ch;
    var h = Math.max(o, c) + Math.random() * vol * p * 0.4;
    var l = Math.min(o, c) - Math.random() * vol * p * 0.4;
    var v = Math.floor(600000 + Math.random() * 900000);
    var rsi = 35 + Math.random() * 30 + (c > o ? 8 : -8);
    rsi = Math.min(85, Math.max(15, rsi));
    var ema20 = p * (1 + (Math.random() - 0.5) * 0.01);
    var sma50 = p * (1 - trend * 0.008 + (Math.random() - 0.5) * 0.005);
    var macdL = (Math.random() - 0.4) * vol * p * 8;
    var macdS = macdL * 0.7 + (Math.random() - 0.5) * 2;
    var bUpper = h + Math.random() * vol * p * 0.8;
    var bLower = l - Math.random() * vol * p * 0.8;
    d.push({
      date: dt.toLocaleDateString('en-IN', { day:'2-digit', month:'short' }),
      open: +o.toFixed(2), high: +h.toFixed(2), low: +l.toFixed(2), close: +c.toFixed(2),
      volume: v, rsi: +rsi.toFixed(1),
      ema20: +ema20.toFixed(2), sma50: +sma50.toFixed(2),
      macdLine: +macdL.toFixed(2), macdSignal: +macdS.toFixed(2), macdHist: +(macdL - macdS).toFixed(2),
      bollingerUpper: +bUpper.toFixed(2), bollingerLower: +bLower.toFixed(2),
      bollingerMiddle: +((bUpper + bLower) / 2).toFixed(2),
      vwap: +((o + h + l + c) / 4).toFixed(2)
    });
    p = c;
  }
  return d;
}

function _genIntraday(base, vol, n) {
  var d = [], p = base;
  for (var i = 0; i < n; i++) {
    var hr = 9 + Math.floor((i * 5 + 15) / 60);
    var mn = (i * 5 + 15) % 60;
    var ch = (Math.random() - 0.48) * vol * p;
    p += ch;
    d.push({
      time: (hr < 10 ? '0' : '') + hr + ':' + (mn < 10 ? '0' : '') + mn,
      price: +p.toFixed(2),
      volume: Math.floor(20000 + Math.random() * 80000)
    });
  }
  return d;
}

window.MOCK = {
  stocks: [
    { symbol:'JBMA', name:'JBM Auto', sector:'Automobile', cap:'Small Cap', price:1847.30, prevClose:1812.50, change:34.80, changePct:1.92, dayHigh:1865, dayLow:1810, volume:1243500, avgVol:980000, mktCap:'19,200 Cr', pe:42.5, w52High:2150, w52Low:1180, rsi:62.4, signal:'BUY', confidence:72 },
    { symbol:'OLAELEC', name:'Ola Electric', sector:'EV / Auto', cap:'Small Cap', price:82.15, prevClose:84.90, change:-2.75, changePct:-3.24, dayHigh:85.40, dayLow:80.50, volume:8945000, avgVol:7200000, mktCap:'36,400 Cr', pe:-12.3, w52High:157.40, w52Low:62.00, rsi:38.2, signal:'SELL', confidence:65 },
    { symbol:'TATAMOTORS', name:'Tata Motors', sector:'Automobile', cap:'Large Cap', price:748.60, prevClose:735.20, change:13.40, changePct:1.82, dayHigh:755, dayLow:732, volume:5620000, avgVol:4800000, mktCap:'2,76,000 Cr', pe:8.4, w52High:810, w52Low:580, rsi:58.7, signal:'BUY', confidence:68 },
    { symbol:'RELIANCE', name:'Reliance Industries', sector:'Conglomerate', cap:'Large Cap', price:2948.50, prevClose:2935.00, change:13.50, changePct:0.46, dayHigh:2960, dayLow:2928, volume:3450000, avgVol:3100000, mktCap:'19,95,000 Cr', pe:28.6, w52High:3218, w52Low:2420, rsi:55.3, signal:'HOLD', confidence:58 },
    { symbol:'HDFCBANK', name:'HDFC Bank', sector:'Banking', cap:'Large Cap', price:1682.40, prevClose:1675.80, change:6.60, changePct:0.39, dayHigh:1690, dayLow:1672, volume:4120000, avgVol:3800000, mktCap:'12,80,000 Cr', pe:19.2, w52High:1795, w52Low:1430, rsi:52.1, signal:'HOLD', confidence:55 },
    { symbol:'INFY', name:'Infosys', sector:'IT', cap:'Large Cap', price:1518.90, prevClose:1530.40, change:-11.50, changePct:-0.75, dayHigh:1535, dayLow:1510, volume:2890000, avgVol:2500000, mktCap:'6,30,000 Cr', pe:22.8, w52High:1680, w52Low:1310, rsi:44.6, signal:'SELL', confidence:60 },
    { symbol:'BAJFINANCE', name:'Bajaj Finance', sector:'NBFC', cap:'Large Cap', price:7215.00, prevClose:7180.00, change:35.00, changePct:0.49, dayHigh:7250, dayLow:7165, volume:1560000, avgVol:1400000, mktCap:'4,47,000 Cr', pe:31.5, w52High:7990, w52Low:5980, rsi:57.8, signal:'BUY', confidence:63 },
    { symbol:'ZOMATO', name:'Zomato', sector:'Food Tech', cap:'Mid Cap', price:244.80, prevClose:248.60, change:-3.80, changePct:-1.53, dayHigh:250, dayLow:242, volume:6780000, avgVol:5900000, mktCap:'2,15,000 Cr', pe:320, w52High:285, w52Low:148, rsi:46.2, signal:'HOLD', confidence:52 },
    { symbol:'ADANIPORTS', name:'Adani Ports', sector:'Infrastructure', cap:'Large Cap', price:1348.70, prevClose:1320.00, change:28.70, changePct:2.17, dayHigh:1360, dayLow:1318, volume:3210000, avgVol:2800000, mktCap:'2,91,000 Cr', pe:35.2, w52High:1560, w52Low:1020, rsi:64.5, signal:'BUY', confidence:70 },
    { symbol:'IRFC', name:'IRFC', sector:'Finance', cap:'Mid Cap', price:164.50, prevClose:161.80, change:2.70, changePct:1.67, dayHigh:166, dayLow:160, volume:12400000, avgVol:10500000, mktCap:'2,14,000 Cr', pe:28.9, w52High:195, w52Low:98, rsi:60.8, signal:'BUY', confidence:66 }
  ],
  historical: {},
  intraday: {},
  news: [
    { id:1, title:'JBM Auto bags ₹800Cr EV bus order from Delhi Transport', time:'2h ago', source:'ET', sentiment:'positive' },
    { id:2, title:'Ola Electric faces quality concerns; stock under pressure', time:'3h ago', source:'Moneycontrol', sentiment:'negative' },
    { id:3, title:'Tata Motors JLR division reports record Q4 margins', time:'4h ago', source:'LiveMint', sentiment:'positive' },
    { id:4, title:'Reliance Jio adds 8M subscribers in April', time:'5h ago', source:'NDTV Profit', sentiment:'positive' },
    { id:5, title:'HDFC Bank credit growth at 15% YoY in April', time:'6h ago', source:'Business Standard', sentiment:'positive' },
    { id:6, title:'Infosys faces headwinds as US tech spending slows', time:'7h ago', source:'Reuters', sentiment:'negative' },
    { id:7, title:'Nifty 50 crosses 25,000 mark for the first time', time:'1h ago', source:'ET', sentiment:'positive' },
    { id:8, title:'FII inflows surge to ₹12,000 Cr in May so far', time:'30m ago', source:'CNBC-TV18', sentiment:'positive' }
  ],
  scannerResults: [
    { symbol:'JBMA', name:'JBM Auto', pattern:'EMA Crossover', signal:'BUY', confidence:72, rsi:62.4, volume:'High', price:1847.30, changePct:1.92 },
    { symbol:'ADANIPORTS', name:'Adani Ports', pattern:'Breakout', signal:'BUY', confidence:70, rsi:64.5, volume:'High', price:1348.70, changePct:2.17 },
    { symbol:'TATAMOTORS', name:'Tata Motors', pattern:'Gap Up', signal:'BUY', confidence:68, rsi:58.7, volume:'Above Avg', price:748.60, changePct:1.82 },
    { symbol:'IRFC', name:'IRFC', pattern:'Volume Spike', signal:'BUY', confidence:66, rsi:60.8, volume:'Very High', price:164.50, changePct:1.67 },
    { symbol:'OLAELEC', name:'Ola Electric', pattern:'RSI Oversold', signal:'SELL', confidence:65, rsi:38.2, volume:'High', price:82.15, changePct:-3.24 },
    { symbol:'BAJFINANCE', name:'Bajaj Finance', pattern:'MACD Bullish', signal:'BUY', confidence:63, rsi:57.8, volume:'Normal', price:7215.00, changePct:0.49 },
    { symbol:'INFY', name:'Infosys', pattern:'Bearish Divergence', signal:'SELL', confidence:60, rsi:44.6, volume:'Normal', price:1518.90, changePct:-0.75 },
    { symbol:'RELIANCE', name:'Reliance', pattern:'Consolidation', signal:'HOLD', confidence:58, rsi:55.3, volume:'Normal', price:2948.50, changePct:0.46 }
  ],
  portfolio: { totalValue:1284500, dayChange:18420, dayChangePct:1.46, invested:1150000 }
};

// Generate historical & intraday for each stock
var _volMap = { JBMA:0.025, OLAELEC:0.04, TATAMOTORS:0.02, RELIANCE:0.012, HDFCBANK:0.01, INFY:0.015, BAJFINANCE:0.018, ZOMATO:0.03, ADANIPORTS:0.022, IRFC:0.028 };
var _trendMap = { JBMA:0.6, OLAELEC:-0.5, TATAMOTORS:0.5, RELIANCE:0.2, HDFCBANK:0.15, INFY:-0.2, BAJFINANCE:0.25, ZOMATO:-0.1, ADANIPORTS:0.55, IRFC:0.4 };
window.MOCK.stocks.forEach(function(s) {
  window.MOCK.historical[s.symbol] = _genHist(s.price, _volMap[s.symbol] || 0.02, _trendMap[s.symbol] || 0, 60);
  window.MOCK.intraday[s.symbol] = _genIntraday(s.price, _volMap[s.symbol] || 0.02, 48);
});
