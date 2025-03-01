"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const currentLanguage = i18n.language;

  const NavButton = ({
    path,
    iconSrc,
    label,
  }: {
    path: string;
    iconSrc: string;
    label: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => router.push(path)}
            variant="ghost"
            className="text-sm font-medium"
          >
            {label}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-4">
          <div className="space-y-2">
            <Image
              width={150}
              height={150}
              src={iconSrc}
              alt={`${label} Icon Large`}
              className="mx-auto"
            />
            <p className="text-center font-medium">{label}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/kindle_books.svg"
              alt="Easy Kindle App"
              width={70}
              height={70}
              className="text-primary"
            />
            <h1 className={`text-2xl font-bold text-[#d2b48c]`}>Easy Kindle</h1>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              <NavButton
                path="/library"
                iconSrc="/icon_app.svg"
                label={currentLanguage === "en" ? "Library" : "Thư Viện"}
              />
              <NavButton
                path="/add-book"
                iconSrc="/kindle_books.svg"
                label={currentLanguage === "en" ? "Add Book" : "Thêm Sách"}
              />
              <Button
                className={`px-2 py-1 rounded ${
                  i18n.language === "en"
                    ? `bg-[#d2b48c] text-white`
                    : "bg-gray-900 text-white"
                }`}
                onClick={
                  i18n.language === "en"
                    ? () => changeLanguage("vi")
                    : () => changeLanguage("en")
                }
              >
                {i18n.language === "en" ? "EN" : "VI"}
              </Button>
              {/* <NavButton path="/about" iconSrc="/about.svg" label="About" />
              <NavButton
                path="/settings"
                iconSrc="/settings.svg"
                label="Settings"
              /> */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
