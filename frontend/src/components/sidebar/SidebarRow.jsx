import { Icon } from "@iconify/react";
import { Link } from "react-scroll";
import ReactTooltip from "react-tooltip";

function SidebarRow({ iconText, title, modal = false, handleOpen }) {
  if (modal) {
    return (
      <div
        data-for="main"
        data-tip={title}
        data-iscapture="true"
        className="flex items-center space-x-2 px-4 py-3 rounded-full hover:bg-green-50 cursor-pointer transition-all duration-200 group"
        onClick={() => handleOpen(`${title}`)}
      >
        <Icon icon={iconText} color="#ea5933" width="40" />
        <p className="group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg">
          {title.replace(/^\w/, (c) => c.toUpperCase())}
        </p>
        <ReactTooltip id="main" />
      </div>
    );
  }

  return (
    <>
      <Link
        to={`${title}_id`}
        spy={true}
        smooth={true}
        duration={500}
        offset={-100}
        className="flex items-center space-x-2 px-4 py-3 rounded-full hover:bg-green-50 cursor-pointer transition-all duration-200 group"
      >
        <div
          className="flex-shrink-0"
          data-for="main"
          data-tip={title}
          data-iscapture="true"
        >
          <Icon icon={iconText} color="#ea5933" width="40" />
        </div>
        <p className="group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg">
          {title.replace(/^\w/, (c) => c.toUpperCase())}
        </p>
        <ReactTooltip id="main" />
      </Link>
    </>
  );
}

export default SidebarRow;
