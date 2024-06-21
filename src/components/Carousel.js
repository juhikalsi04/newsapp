import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import newsData from '../headlines.json'; // Update this path to your actual JSON file path

const defaultImage = '/images/news-wallpapers.jpg';

const CarouselComponent = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = () => {
            // Combine all articles into a single array
            let fetchedNews = newsData.articles.filter(article => article.urlToImage); // Filter out articles without urlToImage
            setNews(fetchedNews);
            setLoading(false);
        };

        loadNews();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {news.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {news.map((article, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img src={article.urlToImage} className="d-block w-100" alt={article.title} onError={(e) => e.target.src = defaultImage} />
                        <div className="carousel-caption d-md-block">
                            <h5>{article.title}</h5>
                            <p>{article.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default CarouselComponent;
