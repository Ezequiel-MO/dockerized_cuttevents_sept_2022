import { useState } from "react";
import RestaurantCards from "./RestaurantCards";

const Meals = ({ restaurants }) => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {restaurants.map((restaurant, index) => (
              <li key={restaurant._id} className="mr-2 last:mr-0 flex-auto">
                <a
                  className="text-sm font-bold uppercase px-5 py-3 shadow-sm rounded block leading-normal bg-white-100 hover:bg-gray-100 dark:bg-gray-50 dark:hover:bg-green-50 dark:hover:text-black-50 focus:outline-none focus:shadow-outline"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(index + 1);
                  }}
                  href={`#tab${index + 1}`}
                  role="tablist"
                >
                  {restaurant.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {restaurants.map((restaurant, index) => (
                  <div
                    key={restaurant._id}
                    className={openTab === index + 1 ? "block" : "hidden"}
                    id={`tab${index + 1}`}
                  >
                    <RestaurantCards restaurant={restaurant} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meals;
