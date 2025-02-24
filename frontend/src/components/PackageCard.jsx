import React from 'react';
import PropTypes from 'prop-types';

const PackageCard = ({ title, description, imageUrl, onExplore }) => {
    return (
        <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden flex flex-col">
            {/* Image */}

            <img
                src={imageUrl}
                alt={title}
                className="w-full h-[350px] object-cover rounded-t-2xl"
            />


            {/* Text Content */}
            <div className="p-1 flex flex-col flex-grow mt-8">
                <h2 className="text-xl font-base mb-2">{title}</h2>
                <p className="text-sm text-black flex-grow">{description}</p>
                <button
                    onClick={onExplore}
                    className="mt-4 w-32 px-2 py-2 bg-black text-white hover:bg-white hover:text-black transition-colors duration-200"
                >
                    Explore Now
                </button>

            </div>
        </div>
    );
};

PackageCard.propTypes = {
    /** Title of the package */
    title: PropTypes.string.isRequired,
    /** Short description of the package */
    description: PropTypes.string.isRequired,
    /** Image URL for the package card */
    imageUrl: PropTypes.string.isRequired,
    /** Callback when "Explore Now" is clicked */
    onExplore: PropTypes.func,
};

PackageCard.defaultProps = {
    onExplore: () => { },
};

export default PackageCard;
