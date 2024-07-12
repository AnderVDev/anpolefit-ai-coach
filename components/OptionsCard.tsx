type OptionsCardProps = {
  name: string;
  description?: string;
  image: string;
  selected: boolean;
  onSelect: () => void;
};

const selectedStyle = "ring-2 ring-yellow-500 bg-yellow-500 bg-opacity-10";
const unselectedStyle = "hover:bg-gray-100";

const OptionsCard = ({
  name,
  description = "Some Default description",
  image,
  selected,
  onSelect,
}: OptionsCardProps) => {
  const overlayStyles = `p-5 absolute z-30 flex
      inset-0 flex-col items-center justify-center
      whitespace-normal bg-grey-500 text-center 
      opacity-0 transition duration-500 hover:opacity-90`;

  return (
    // <div className="relative mx-5 inline-block h-[380px] w-[450px]">
    <div
      className={`relative flex-grow inline-block h-80 w-80 sm:h-[300px] sm:w-[350px] md:h-[380px] md:w-[450px] ${
        selected ? selectedStyle : unselectedStyle
      }`}
      onClick={onSelect}
    >
      <div className={overlayStyles}>
        <h2
          className={`font-bold text-xl mb-2 ${
            selected ? "text-yellow-500" : ""
          }`}
        >
          {name}
        </h2>
        <p className="text-gray-500">{description}</p>
      </div>
      {/* <img src={image} alt={`${image}`} className="h-full w-full object-cover" /> */}
    </div>
  );
};

export default OptionsCard;
