"use client";
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { DropdownOption } from ".";
import { FaAngleUp } from "react-icons/fa";

interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  label: string;
  onChange: (value: string | number) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  mandatory?: boolean;
  invalid?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  disabled = false,
  searchPlaceholder = "Search...",
  mandatory = false,
  invalid,
}: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const handleSelect = (optionValue: string | number): void => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 flex gap-1/2 font-medium tracking-[0.02em]">
          {label}
          {mandatory && <span className="text-red-500">*</span>}
        </label>
        <div
          className={`flex items-center justify-between rounded ring ${
            invalid ? "ring-red-500" : "ring-gray-400"
          }  p-2 ${
            disabled
              ? "cursor-not-allowed bg-gray-300 text-gray-600"
              : "cursor-pointer"
          }`}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {selectedOption ? (
            <span className="text-sm">{selectedOption.label}</span>
          ) : (
            <span className="text-sm text-gray-500 select-none">
              {placeholder}
            </span>
          )}
          <FaAngleUp
            className={`w-5 h-5 text-gray-500 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {invalid && <span className="text-xs text-red-500">{invalid}</span>}
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1/2 rounded-md bg-white flex flex-col border border-gray-300">
          <div className="w-full p-4 bg-gray-200 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full px-2 py-1 bg-white ring ring-gray-400 rounded"
            />
          </div>

          <div className="flex flex-col max-h-60 overflow-y-auto">
            {" "}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="p-2 hover:cursor-pointer text-sm hover:bg-gray-200 hover:font-bold"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-1 py-2 text-center text-sm text-gray-500">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
