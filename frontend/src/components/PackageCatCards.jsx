import PropTypes from "prop-types";

const PackageCatCards = ({ packageItem }) => {
  const { title, imageUrl } = packageItem;
  return (
    <div className="rounded-lg overflow-hidden transition-shadow duration-300">
      {/* Responsive image height */}
      <div className="pl-2 text-emerald-950">{title}</div>
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="w-full h-48 md:h-100 lg:h-100 object-cover rounded-xl"
      />
      {/* Card Content */}

      <button className=" py-2 text-emerald-950 rounded-lg transition cursor-pointer">
        see more details &rarr;
      </button>
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
