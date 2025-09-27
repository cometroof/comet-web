import React from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Call to Action Section */}
      <div className="relative bg-red-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium leading-tight max-w-2xl">
              Reach out to us and let's build something great together.
            </h2>
          </div>
          <div>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-sm font-semibold tracking-[6px]"
            >
              CONTACT US
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-black py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Company Info */}
            <div className="lg:col-span-1">
              <div className="w-40 h-10 bg-red-600 rounded mb-8"></div>
            </div>

            {/* Products Column 1 */}
            <div>
              <div className="space-y-4">
                <FooterLink text="Residential" />
                <FooterLink text="Private Residential" />
                <FooterLink text="Government" />
                <FooterLink text="Hotel & Villa" />
                <FooterLink text="Warehouse & Commercial" />
                <FooterLink text="Public Buildings" />
              </div>
            </div>

            {/* Products Column 2 */}
            <div>
              <div className="space-y-4">
                <FooterLink text="ZIGZAG" />
                <FooterLink text="Regency" />
                <FooterLink text="Ruvin" />
                <FooterLink text="Durastone" />
                <FooterLink text="Kiya" />
                <FooterLink text="Accessories" />
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <div className="space-y-4">
                <FooterLink text="PROJECTS" hasArrow />
                <FooterLink text="PRODUCTS" hasArrow />
                <FooterLink text="ABOUT US" hasArrow />
                <FooterLink text="ARTICLES" hasArrow />
                <FooterLink text="CONTACT US" hasArrow />
                <FooterLink text="GUARANTEE" hasArrow />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                Copyright 2025 © All Rights Reserved • Designed by Designata Studio
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <SocialIcon />
                <SocialIcon />
                <SocialIcon />
                <SocialIcon />
                <SocialIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, hasArrow = false }: { text: string; hasArrow?: boolean }) => {
  return (
    <div className="flex items-center space-x-3 cursor-pointer hover:text-red-500 transition-colors">
      {hasArrow && <ChevronRight className="w-3 h-3 text-red-500" />}
      <span className="text-sm font-semibold tracking-[6px]">{text}</span>
    </div>
  );
};

const SocialIcon = () => {
  return (
    <div className="w-6 h-6 bg-red-500 rounded cursor-pointer hover:bg-red-400 transition-colors"></div>
  );
};

export default Footer;
