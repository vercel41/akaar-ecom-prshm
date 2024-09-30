"use client";
import React from "react";
import DrawerRight from "@/components/elements/DrawerRight";
import ResponsiveSearch from "../navigation/header/main-nav/ResponsiveSearch";
import Search from "../elements/Search";

const Searchbar = ({ isSearchbarOpen, closeSearchbar }) => {
  return (
    <DrawerRight show={isSearchbarOpen} setShow={closeSearchbar}>
      {isSearchbarOpen && (
        <div className="p-5">
          <Search />
        </div>
      )}
    </DrawerRight>
  );
};

export default Searchbar;
