import React, { useEffect, useState } from 'react';

// Import your local JSON data
import headlinesData from '../headlines.json';

const Ticker = () => {
    const [headlines, setHeadlines] = useState([]);
    const [tickerIndex, setTickerIndex] = useState(0);

    useEffect(() => {
        // Extract articles array from headlinesData
        const articles = headlinesData.articles.map(article => article.title);
        setHeadlines(articles);
    }, []);

    useEffect(() => {
        const tickerTimer = setInterval(() => {
            setTickerIndex(prevIndex => (prevIndex + 1) % headlines.length);
        }, 2000);

        return () => clearInterval(tickerTimer);
    }, [headlines]);

    return (
        <div className="ticker">
            {headlines.length > 0 && (
                <div className="ticker-content">
                    {headlines.map((headline, index) => (
                        <span key={index} className={index === tickerIndex ? 'ticker-item active' : 'ticker-item'}>
                            {headline}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Ticker;
