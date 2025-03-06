const PackageCard = ({ image, name }) => {
    return (
        <div className="bg-white rounded-2xl w-72 p-3 gap-y-10">
            <img
                src={image}
                alt={name}
                className="w-72 h-64 object-cover rounded-2xl"
            />
            <div className="p-4 flex flex-col items-center text-center">
                <h2 className="text-lg font-base text-gray-800">{name}</h2>
                <button className="mt-3 bg-black text-white px-3 py-1 rounded-lg cursor-pointer text-sm">
                    View package details
                </button>
            </div>
        </div>
    );
};

export default PackageCard;
