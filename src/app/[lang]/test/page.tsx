import React from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, MessageCircle } from "lucide-react";
import Header from "@/components/app/header";
import Footer from "@/components/app/footer";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  month: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Why Metal Roofs Are the Future of Modern Homes",
    excerpt:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here's why they're changing...",
    date: "14",
    month: "AUG",
    image: "/images/article5.png",
  },
  {
    id: 2,
    title: "Choosing the Right Roof Profile for Your Project",
    excerpt:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here's why they're changing...",
    date: "28",
    month: "JUL",
    image: "/images/article1.png",
  },
  {
    id: 3,
    title: "How to Keep Your Roof Looking Great for Years",
    excerpt:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here's why they're changing...",
    date: "12",
    month: "JUL",
    image: "/images/article3.png",
  },
  {
    id: 4,
    title: "Roof Accessories you have to know",
    excerpt:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here's why they're changing...",
    date: "14",
    month: "JUN",
    image: "/images/article2-78c4b9.png",
  },
  {
    id: 5,
    title: "How we make high quality roof from scratch",
    excerpt:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here's why they're changing...",
    date: "28",
    month: "MEI",
    image: "/images/article4-dd1f77.png",
  },
  {
    id: 6,
    title: "How to reconize each type of roof",
    excerpt:
      "From sleek looks to unbeatable durability, metal roofs are becoming the top choice for homeowners. Here's why they're changing...",
    date: "25",
    month: "JUN",
    image: "/images/article6-411a83.png",
  },
];

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex">
        <div className="flex-shrink-0 mr-6">
          <div className="text-4xl font-medium text-gray-600 leading-none">
            {article.date}
          </div>
          <div className="text-lg font-semibold text-gray-600 mt-1 tracking-wide">
            {article.month}
          </div>
          <div className="mt-4">
            <ChevronRight className="w-8 h-4 text-red-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-medium text-gray-800 mb-3 leading-tight">
            {article.title}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="flex items-center justify-center space-x-8 mt-12">
      <button className="flex items-center text-red-600 hover:text-red-700 transition-colors">
        <ChevronLeft className="w-8 h-4 mr-2" />
      </button>
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <button
            key={num}
            className={`text-lg font-semibold ${
              num === 1 ? "text-red-600" : "text-gray-600 hover:text-red-600"
            } transition-colors`}
          >
            {num}
          </button>
        ))}
      </div>
      <button className="flex items-center text-red-600 hover:text-red-700 transition-colors">
        <ChevronRight className="w-8 h-4 ml-2" />
      </button>
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

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="text-sm font-medium tracking-[6px] text-white mb-6">
              ARTICLES
            </div>
            <h1 className="text-4xl md:text-5xl font-medium leading-tight max-w-2xl mx-auto">
              Expert roofing articles to guide your home improvement decisions
            </h1>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <Pagination />
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
