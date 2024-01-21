"use client";
import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import Link from "next-intl/link";
import { usePathname } from "next-intl/client";

const languages = [
  {
    code: "en",
    name: "EN",
  },
  {
    code: "bn",
    name: "BN",
  },
];

const LanguageSelector = ({ locale }) => {
  // const [selectedLanguage, setSelectedLanguage] = useState(locale); // Default language
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility state
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const handleLanguageChange = (language) => {
    // setSelectedLanguage(language);
    setIsDropdownOpen(false); // Close the dropdown after selecting a language
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1 font-title rounded-md text-sm font-medium text-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="uppercase">{locale}</span>
        <FiChevronDown className="" />
      </button>
      {isDropdownOpen && (
        <ul className="absolute w-full z-10 top-full bg-white rounded shadow-lg divide-y divide-gray-200">
          {languages.map((lang) => (
            <li key={lang.code}>
              <Link
                href={pathname}
                className=" text-black pl-1"
                onClick={() => handleLanguageChange(lang.code)}
                locale={lang.code}
              >
                <span className="">{lang.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
