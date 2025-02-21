import React from 'react';
import bannerImg from '../../assets/images/banner2.png';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div
            className="relative w-full md:h-[650px] h-[500px] flex items-center justify-center text-center"
            style={{
                backgroundImage: `url(${bannerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-black bg-opacity-50 rounded-lg p-8 md:p-20">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 md:mb-8  text-gray-300">Welcome to Our Platform</h1>
                <Link to='/add-task' className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-base-200 font-semibold rounded-md shadow-md">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Banner;
