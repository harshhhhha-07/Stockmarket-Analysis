
// ============================================================
// ROOT APP — Router + State
// ============================================================
function App() {
  const [page, setPage] = React.useState('landing');
  const [selectedStock, setSelectedStock] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Animate on page change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'landing':
        return React.createElement(LandingPage, { setPage });
      case 'dashboard':
        return React.createElement(DashboardPage, { setPage, setSelectedStock, searchQuery });
      case 'detail':
        return React.createElement(StockDetailPage, { stock: selectedStock, setPage });
      case 'scanner':
        return React.createElement(ScannerPage, { setPage, setSelectedStock });
      default:
        return React.createElement(LandingPage, { setPage });
    }
  };

  return React.createElement('div', null,
    React.createElement(MarketTicker),
    React.createElement(Navbar, { page, setPage, searchQuery, setSearchQuery }),
    React.createElement('div', { key: page, style: { animation: 'fadeIn 0.4s ease both' } },
      renderPage()
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
