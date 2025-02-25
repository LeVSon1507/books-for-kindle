"use client";

import React from "react";
import {
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { format } from "date-fns";

export const Footer = () => {
  const currentYear = format(new Date(), "yyyy");

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/lev._.son/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/i-am-le-van-son/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:sonlvs1507@gmail.com",
      label: "Email",
    },
    {
      icon: Github,
      href: "https://github.com/LeVSon1507",
      label: "Github",
    },
  ];

  return (
    <footer className="border-t mt-auto bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left section - Copyright and Author */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">About</h3>
            <div
              className="text-sm text-muted-foreground flex"
              suppressHydrationWarning
            >
              Easy Kindle application helps you download books onto your kindle
              easily.
            </div>
            <div
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              © {currentYear} Created by Sol Lee. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>using</span>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                NextJS
              </a>
            </div>
          </div>

          {/* Middle section - Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:sonlvs1507@gmail.com">0982055105</a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Vietnam</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:sonlvs1507@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  sonlvs1507@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right section - Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect</h3>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                {socialLinks.map((link) => (
                  <Tooltip key={link.label}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        passHref
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-primary"
                        >
                          <link.icon className="h-5 w-5" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
