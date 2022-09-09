import { useState } from "react";
import { Icon } from "@iconify/react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <button
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      <Icon icon="bxs:up-arrow" color="#ea5933" width="30" height="30" />
    </button>
  );
};

export default ScrollToTopButton;
