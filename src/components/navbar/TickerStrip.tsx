import React from 'react';
import { useStockQuotes, StockQuote } from "../../hooks/useStockQuotes";
import "./navbar.css";

// Chip-based ticker component - Light theme design
const TickerChip = ({ quote, isLoading }: { quote: StockQuote; isLoading?: boolean }) => {
  return (
    <div className="group flex h-10 shrink-0 items-center gap-2 rounded-full bg-white border border-gray-200 shadow-sm pl-2 pr-3.5 hover:shadow-md transition-all">
      {/* Logo in gray circle */}
      <div className="flex w-7 h-7 items-center justify-center rounded-full bg-gray-100 shrink-0 overflow-hidden">
        {quote.logo ? (
          <img
            src={quote.logo}
            alt={`${quote.displaySymbol} logo`}
            className="w-4 h-4 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span className="text-[10px] font-bold text-gray-600">{quote.displaySymbol.charAt(0)}</span>
        )}
      </div>
      {/* Stock symbol - use displaySymbol for cleaner display */}
      <span className="text-[12px] font-bold text-gray-800 leading-none">{quote.displaySymbol}</span>
      {/* Percent change with arrow */}
      <div className={`ml-0.5 flex items-center gap-0.5 ${quote.isUp ? 'text-green-600' : 'text-red-500'}`}>
        <span className="text-[10px]">{quote.isUp ? '▲' : '▼'}</span>
        <span className={`text-[11px] font-semibold ${isLoading ? 'animate-pulse' : ''}`}>
          {Math.abs(quote.percentChange).toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

interface TickerStripProps {
  isVisible: boolean;
}

const TickerStrip = ({ isVisible }: TickerStripProps) => {
  // Fetch real-time stock quotes (refreshes every 2 minutes for 27 stocks)
  const { quotes, loading: quotesLoading, lastUpdated } = useStockQuotes(120000);

  if (!isVisible) return null;

  return (
    <section className="relative w-full bg-[#F8F9FA] py-2.5 border-b border-gray-200">
      {/* Ticker Marquee with Fade Mask */}
      <div className="ticker-mask relative flex w-full overflow-hidden">
        <div className="ticker-track flex items-center gap-3 px-4">
          {/* First set of tickers */}
          {quotes.map((quote, idx) => (
            <TickerChip 
              key={`first-${quote.symbol}-${idx}`} 
              quote={quote} 
              isLoading={quotesLoading && quotes.length === 0}
            />
          ))}
          {/* Duplicate for seamless loop */}
          {quotes.map((quote, idx) => (
            <TickerChip 
              key={`second-${quote.symbol}-${idx}`} 
              quote={quote}
              isLoading={quotesLoading && quotes.length === 0}
            />
          ))}
        </div>
      </div>

      {/* Live Indicator - Small dot on right */}
      {lastUpdated && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[9px] font-medium text-gray-500">
            {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      )}
    </section>
  );
};

export default TickerStrip;
