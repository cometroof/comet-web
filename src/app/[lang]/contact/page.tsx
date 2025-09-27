import React from "react";
import Image from "next/image";
import { Phone, Mail, ChevronDown, MessageCircle } from "lucide-react";
import Header from "@/components/app/header";
import Footer from "@/components/app/footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiry: string;
  message: string;
}

const ContactForm = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Form */}
      <div className="space-y-6">
        <div>
          <div className="text-sm font-medium tracking-[6px] text-gray-600 mb-6">
            CONTACT US
          </div>
          <h1 className="text-4xl md:text-5xl font-medium leading-tight text-gray-600 mb-8">
            Were here to assist you. Connect with us for more information.
          </h1>
        </div>

        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="flex text-sm font-medium text-gray-600 mb-2">
              Name <span className="text-red-600 ml-1">*</span>
            </label>
            <Input
              placeholder="Type your name here..."
              className="w-full h-12 px-3 border border-gray-400 rounded-none"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="flex text-sm font-medium text-gray-600 mb-2">
              E-Mail <span className="text-red-600 ml-1">*</span>
            </label>
            <Input
              type="email"
              placeholder="Type your e-mail here..."
              className="w-full h-12 px-3 border border-gray-400 rounded-none"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="flex text-sm font-medium text-gray-600 mb-2">
              Phone Number <span className="text-red-600 ml-1">*</span>
            </label>
            <Input
              type="tel"
              placeholder="Type your phone number here..."
              className="w-full h-12 px-3 border border-gray-400 rounded-none"
            />
          </div>

          {/* Inquiry Field */}
          <div>
            <label className="flex text-sm font-medium text-gray-600 mb-2">
              Inquiry <span className="text-red-600 ml-1">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full h-12 px-3 border border-gray-400 rounded-none">
                <SelectValue placeholder="Select your inquiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="product">Product Information</SelectItem>
                <SelectItem value="quote">Request Quote</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>

      {/* Right Column - Message and Submit */}
      <div className="space-y-6">
        {/* Message Field */}
        <div>
          <label className="flex text-sm font-medium text-gray-600 mb-2">
            Message <span className="text-red-600 ml-1">*</span>
          </label>
          <textarea
            placeholder="Type your message here..."
            rows={10}
            className="w-full px-3 py-3 border border-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* CAPTCHA */}
        <div>
          <div className="border border-gray-300 rounded-sm p-4 bg-gray-50">
            <Image
              src="./images/captcha-3ded5b.png"
              alt="CAPTCHA"
              width={296}
              height={80}
              className="w-full max-w-sm"
              unoptimized
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 text-sm font-semibold tracking-[6px]"
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Contact Details */}
          <div className="space-y-8">
            <h2 className="text-3xl font-medium text-red-600">Head Office</h2>

            <div className="space-y-6">
              <div className="text-base">
                Jl. Raya Pasir Putih
                <br />
                Komp. Pergudangan Angkasa III
                <br />
                Blok A No. 5-7
                <br />
                Pekanbaru - Riau - Indonesia
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-red-600" />
                  <span>+62 761-8410-075</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-red-600" />
                  <span>+62 761-8410-603</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-red-600" />
                  <span>sales@comet-roof.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div>
            <Image
              src="./images/office-map-4b8a51.png"
              alt="Office Location Map"
              width={782}
              height={347}
              className="w-full h-auto rounded-lg"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CoverageAreas = () => {
  const areas = [
    {
      region: "Jawa",
      cities:
        "jakarta | bogor | bandung | tasikmalaya | garut sukabumi | bekasi | serang | cirebon | surabaya malang | jember | banyuwangi | kediri | lombok | denpasar | semarang | tegal | solo | purwokerto",
    },
    {
      region: "Sumatera",
      cities:
        "medan | pekan Baru | padang | palembang | jambi | bengkulu | lampung",
    },
    {
      region: "Bangka Belitung",
      cities: "pangkal Pinang | Tanjung Pandan",
    },
    {
      region: "Sulawesi",
      cities: "makassar | manado | gorontalo | palu | kendari",
    },
    {
      region: "Kalimantan",
      cities: "Banjarmasin | Palangkaraya | pontianak | samarinda | balikpapan",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Title */}
          <div>
            <h2 className="text-4xl md:text-5xl font-medium leading-tight text-gray-600">
              Our roofing products are accessible in the following areas.
            </h2>
          </div>

          {/* Right Side - Areas */}
          <div className="space-y-8">
            {areas.map((area, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-2xl font-medium text-red-600">
                  {area.region}
                </h3>
                <p className="text-base text-gray-600 capitalize leading-relaxed">
                  {area.cities}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16 flex justify-center space-x-12">
          <Image
            src="./images/mitra-10-logo.png"
            alt="Mitra 10"
            width={153}
            height={70}
            className="h-16 w-auto"
            unoptimized
          />
          <Image
            src="./images/csa-logo.png"
            alt="CSA"
            width={148}
            height={108}
            className="h-16 w-auto"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="bg-green-500 hover:bg-green-600 transition-colors rounded-full p-4 shadow-lg">
        <MessageCircle className="w-8 h-8 text-white" fill="white" />
      </button>
    </div>
  );
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Contact Form Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <ContactForm />
        <hr className="my-16 border-gray-300" />
      </div>

      {/* Contact Info Section */}
      <ContactInfo />

      {/* Coverage Areas Section */}
      <CoverageAreas />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
