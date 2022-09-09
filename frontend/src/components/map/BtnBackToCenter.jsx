export const BtnBackToCenter = () => {
  const handleClick = () => {};

  return (
    <div className="flex space-x-2 justify-center absolute top-[40px] right-[20px] z-[100]">
      <button
        type="button"
        onClick={handleClick}
        className="inline-block px-6 py-2.5 bg-brown-50 text-white-100 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-50 hover:shadow-lg focus:bg-gray-50 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black-50 active:shadow-lg transition duration-150 ease-in-out"
      >
        Back to Center
      </button>
    </div>
  );
};
