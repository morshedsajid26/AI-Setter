"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Dropdown = ({
  label = "",
  placeholder = "",
  options = [],
  onSelect,
  className = "",
  inputClass = "",
  spanClass = "",
  optionClass = "",
  labelClass = "",
  icon = "",
  value = "",
}) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (selectedValue) => {
    setShow(false);
    if (onSelect) onSelect(selectedValue);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-2 relative ${className}`}
    >
      {/* Label */}
      {label && (
        <label className={`font-inter text-[#364153] ${labelClass}`}>
          {label}
        </label>
      )}

      {/* Input Box */}
      <div className="relative">
        <div onClick={() => setShow(!show)}>
          <input
            readOnly
            value={value || ""}
            className={`w-full  outline-none  rounded-lg cursor-pointer ${
              !value ? "text-[#717182]" : "text-[#364153]"
            } ${inputClass}`}
            placeholder={placeholder}
          />

          {/* Arrow Icon */}
          <div
            className={`w-6 h-6 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 text-[#000000] ${icon}`}
          >
            {show ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute left-0 top-[105%] w-full bg-white border border-[#D1D5DC] rounded-md shadow-md text-[#000000] z-30 transition-all duration-300 text-center overflow-y-scroll hide-scrollbar ${optionClass} ${
            show
              ? "opacity-100 visible max-h-40 overflow-auto"
              : "opacity-0 invisible max-h-0 overflow-hidden"
          }`}
        >
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="py-2 px-3 hover:bg-[#900616] hover:text-white cursor-pointer text-left"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;




