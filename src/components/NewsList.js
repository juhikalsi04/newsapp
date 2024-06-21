import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';

const NewsList = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/category/${category}.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                const filteredArticles = data.articles.filter(article => article.urlToImage);
                setArticles(filteredArticles);
            } catch (error) {
                console.error('Error fetching the news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    const handleHeadlineClick = (index) => {
        setCurrentArticleIndex(index);
    };

    const handlePreviousClick = () => {
        setCurrentArticleIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const handleNextClick = () => {
        setCurrentArticleIndex((prevIndex) => (prevIndex < articles.length - 1 ? prevIndex + 1 : prevIndex));
    };

    if (loading) {
        return <Loader />;
    }

    const currentArticle = articles[currentArticleIndex];

    return (
        <div className="news">
            <div className="news-list">
                <div className="lhs">
                    {currentArticle && (
                        <div className="main-news-item">
                            <NewsItem {...currentArticle} />
                        </div>
                    )}
                </div>
                <div className="rhs">
                    <h3><b>Top Headlines</b></h3>
                    <div className="news-headlines">
                        <div className="headlines-list">
                            {articles.slice(0, 10).map((article, index) => (
                                <div key={index} className="headline-item" onClick={() => handleHeadlineClick(index)}>
                                    {article.title}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pagination">
                <button onClick={handlePreviousClick} disabled={currentArticleIndex === 0}>
                    Previous
                </button>
                <span>
                    {currentArticleIndex + 1}
                </span>
                <button onClick={handleNextClick} disabled={currentArticleIndex === articles.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default NewsList;
