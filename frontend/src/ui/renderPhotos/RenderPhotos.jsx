import { useState } from "react";
import Modal from "./Modal";

const RenderPhotos = ({ images }) => {
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleClick = (item, index) => {
    setClickedImg(item);
    setCurrentIndex(index);
  };

  const handelRotationRight = () => {
    const totalLength = images.length;
    if (currentIndex === totalLength - 1) {
      setCurrentIndex(0);
      const newUrl = images[0];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = images.filter((item) => images.indexOf(item) === newIndex);
    const newItem = newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    const totalLength = images.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = images[totalLength - 1];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = images.filter((item) => {
      return images.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className="m-auto w-full">
        <div className="w-full flex justify-start flex-wrap pt-10">
          {images.map((item, index) => (
            <div
              className="m-2 p-2 scale-125 hover:scale-150 ease-in duration-200 hover:z-50"
              key={index}
            >
              <img
                src={item}
                alt="items-gallery"
                onClick={() => handleClick(item, index)}
                className="block cursor-pointer w-28 h-28 border-solid hover:border-orange-50 border-2 rounded-md"
              />
            </div>
          ))}
        </div>

        {clickedImg && (
          <Modal
            clickedImg={clickedImg}
            handelRotationRight={handelRotationRight}
            setClickedImg={setClickedImg}
            handelRotationLeft={handelRotationLeft}
          />
        )}
      </div>
    </>
  );
};

export default RenderPhotos;
