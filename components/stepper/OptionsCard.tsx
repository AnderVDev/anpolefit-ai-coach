import Image, { StaticImageData } from "next/image";

type OptionsCardProps = {
  name: string;
  description?: string;
  image: StaticImageData | string;
  selected: boolean;
  onSelect: () => void;
};

const selectedStyle = "opacity-90";
const unselectedStyle = "opacity-0";

const OptionsCard = ({
  name,
  description = "Some Default description",
  image,
  selected,
  onSelect,
}: OptionsCardProps) => {
  const overlayStyles = `absolute z-30 inset-0 flex flex-col items-center justify-center bg-gray-500 text-center ${
    selected ? selectedStyle : unselectedStyle
  } transition duration-500 hover:opacity-90 focus:opacity-90 shadow-md p-4 sm:p-6 md:p-8 overflow-hidden`;

  return (
    // <div className="relative mx-5 inline-block h-[380px] w-[450px]">
    <div
      className={`relative   flex-grow inline-block h-80 w-80 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
      onClick={onSelect}
    >
      <div className={overlayStyles}>
        <h2 className="mb-2 font-bold text-lg text-gray-20">{name}</h2>
        <p className="text-gray-20 leading-normal">{description}</p>
      </div>
      <Image
        src={image}
        alt={`${image}`}
        className="h-full w-full object-cover"
        
      />
    </div>
  );
};

export default OptionsCard;
