import React, { useRef } from "react";

export const SearchBar = () => {
  const debounceRef = useRef(null);

  const onQueryChanged = (e) => {
    const query = e.target.value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      console.log(query);
    }, 350);
  };

  return (
    <div className="absolute top-10 left-2 z-50 bg-white-50 w-[150px] md:w-[250px] shadow-lg p-2 rounded-md">
      <input
        onChange={onQueryChanged}
        type="text"
        placeholder="Search Function ... "
        className="w-full rounded-md px-2 cursor-pointer"
      />
    </div>
  );
};
