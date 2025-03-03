import PropTypes from "prop-types";

const PackageCatCards = ({ packageItem }) => {
  const { title, imageUrl } = packageItem;
  return (
    <div className="rounded-lg overflow-hidden transition-shadow duration-300">
      {/* Responsive image height */}
      <div className="pl-2">{title}</div>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 md:h-100 lg:h-120 object-cover rounded-lg"
      />
      {/* Card Content */}
      <div className="p-2">
        <button className="mt-2 py-2 text-black rounded-lg transition cursor-pointer">
          see more details &rarr;
        </button>
      </div>
    </div>
  );
};

PackageCatCards.propTypes = {
  packageItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default PackageCatCards;
