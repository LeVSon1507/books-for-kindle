"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const SearchBar = ({
  setSearch,
}: {
  setSearch: (value: string) => void;
}) => {
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="w-full max-w-5xl mb-7 mx-auto">
      <div className="relative w-full">
        <Search className=" cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search books..."
          className="pl-10 w-full py-5"
        />
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            src="/search_icon.svg"
            alt="search"
            className="cursor-pointer"
            width={200}
            height={200}
            priority
          />
        </TooltipTrigger>
        <TooltipContent className="text-sm" side="right">
          <p>Search</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default SearchBar;
