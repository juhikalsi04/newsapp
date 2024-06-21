import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultImage from '../images/news-wallpapers.jpg';
import SportsImg from '../images/sports.jpg';
import EntertainmentImg from '../images/entertainment.jpg';
import BusinessImg from '../images/business.jpg';
import HealthImg from '../images/health.jpg';
import ScienceImg from '../images/science.jpg';
import TechImg from '../images/technology.jpg';

const categories = [
    {
        title: 'General',
        path: '/general',
        img: DefaultImage
    },
    {
        title: 'Entertainment',
        path: '/entertainment',
        img: EntertainmentImg
    },
    {
        title: 'Sports',
        path: '/sports',
        img: SportsImg
    },
    {
        title: 'Technology',
        path: '/technology',
        img: TechImg
    },
    {
        title: 'Health',
        path: '/health',
        img: HealthImg
    },
    {
        title: 'Business',
        path: '/business',
        img: BusinessImg
    },
    {
        title: 'Science',
        path: '/science',
        img: ScienceImg
    }
];

export default function Category() {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className="heading-category mx-4"><h2><b>Choose Your Topic..</b></h2></div>
            <div className="card-container">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="card text-bg-dark"
                        onClick={() => handleCardClick(category.path)}
                    >
                        <img src={category.img} className="card-img" alt={category.title} />
                        <div className="card-img-overlay">
                            <h5 className="card-title">{category.title}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
