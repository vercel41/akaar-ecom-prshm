import {
  useGetPopularSearchQuery,
  useGetSearchHistoriesQuery,
  useRemoveSearchHistoryMutation,
} from "@/store/features/api/searchAPI";
import { getSlicedText } from "@/utils/formatText";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

// ** Import Icons
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Search = () => {
  const [showSuggestionResults, setShowSuggestionResults] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { translations } = useSelector((state) => state.common);

  const [searchTerm, setSearchTerm] = useState("");
  const { data: popularSearch } = useGetPopularSearchQuery(null, {
    skip: !showSuggestionResults,
  });
  let popular = popularSearch?.data || [];

  const { data: userSearch } = useGetSearchHistoriesQuery(user?.id, {
    skip: !user || !showSuggestionResults,
  });
  let searchHistory = userSearch?.data || [];

  //filtering suggestion based on search
  if (searchHistory?.length && searchTerm) {
    searchHistory = searchHistory.filter((keyword) =>
      keyword.search_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  //filtering suggestion based on search
  if (popular?.length && searchTerm) {
    popular = popular.filter((keyword) =>
      keyword.search_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const [removeHistory] = useRemoveSearchHistoryMutation();

  const router = useRouter();

  const handleSearch = (text) => {
    if (user) {
      router.push(`/products?text=${text}&reference_id=${user.id}`);
      return;
    }
    router.push(`/products?text=${text}`);
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(searchTerm);
    }
  };

  let blurTimeout; // Variable to store the timeout

  const handleSuggestionsSelect = (suggestion) => {
    // console.log(suggestion);
    setSearchTerm(suggestion); // Set the selected suggestion as the search term
    handleSearch(suggestion); // Perform the search
  };

  const handleBlur = () => {
    // Use a timeout to delay hiding the results
    blurTimeout = setTimeout(() => {
      setShowSuggestionResults(false);
    }, 200); // Adjust the delay time as needed
  };

  const handleFocus = () => {
    clearTimeout(blurTimeout); // Clear the timeout if the input is focused again
    setShowSuggestionResults(true);
  };

  const handleDeleteHistoryItem = (itemId) => {
    const payload = {
      historyId: itemId,
      userId: user.id,
    };
    removeHistory(payload)
      .unwrap()
      .then((response) => {
        // Handle the successful response if necessary
        console.log(response);
        toast.success("Search history removed!");
      })
      .catch((error) => {
        // Handle the error if necessary
        toast.error("Failed to remove search history");
        console.log(error);
      });
  };

  return (
    <div className="nav-search relative">
      <form>
        <input
          value={searchTerm}
          onKeyDown={handleInput}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          placeholder={translations["search-for-your-desired-product"]}
          className="border-r-0"
        />

        <button type="submit" className="search-btn">
          <HiMagnifyingGlass size={24} color="#fff" />
        </button>
      </form>
      {showSuggestionResults && (searchHistory?.length || popular?.length) ? (
        <div className="z-20 absolute font-title text-slate-600 mt-2 py-2 w-full overflow-hidden rounded-md bg-white">
          {searchHistory?.length ? (
            <div className="px-4 mb-4">
              <h3 className="mb-2">{translations["recently-searched"]}</h3>
              {searchHistory.map((keyword) => (
                <div
                  key={keyword.id}
                  className="cursor-pointer py-2 flex gap-4 hover:bg-slate-100"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3334 10C18.3334 14.6 14.6001 18.3334 10.0001 18.3334C5.40008 18.3334 2.59175 13.7 2.59175 13.7M2.59175 13.7H6.35842M2.59175 13.7V17.8667M1.66675 10C1.66675 5.40002 5.36675 1.66669 10.0001 1.66669C15.5584 1.66669 18.3334 6.30002 18.3334 6.30002M18.3334 6.30002V2.13335M18.3334 6.30002H14.6334"
                      stroke="#94A3B8"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 6V10.5L14 12"
                      stroke="#94A3B8"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>

                  <p
                    className="text-sm font-medium"
                    onClick={() => handleSuggestionsSelect(keyword.search_name)}
                  >
                    {getSlicedText(keyword.search_name, 30)}
                  </p>
                  <div className="flex-1 text-right">
                    <span
                      onClick={() => handleDeleteHistoryItem(keyword.id)}
                      className="text-slate-600"
                    >
                      X
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {popular?.length ? (
            <div className="px-4">
              <h3 className="mb-2">{translations["popular-keywords"]}</h3>
              {popular.map((keyword) => (
                <div
                  key={keyword.id}
                  className="cursor-pointer py-2 flex gap-4 hover:bg-slate-100"
                  onClick={() => handleSuggestionsSelect(keyword.search_name)}
                >
                  <FiSearch />
                  <p className="text-sm font-medium">
                    {getSlicedText(keyword.search_name, 40)}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
