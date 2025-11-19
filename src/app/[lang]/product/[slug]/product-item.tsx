"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TProductItem } from "./product-detail-page";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function ProductItem(item: TProductItem) {
  const specs = item.spec_info as {
    label: { en: string; id: string };
    value: string;
  }[];
  const { lang = "en" } = useParams<{ lang: "en" | "id" }>();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div
          className="relative"
          aria-label={`Product ${item.name}`}
          role="button"
        >
          <div className="aspect-square relative bg-app-light-gray overflow-hidden">
            {item.image && (
              <img
                alt={item.name}
                src={item.image}
                className="block size-full object-cover object-center scale-125"
              />
            )}
          </div>
          <div className="text-subheading break-words mt-3 text-left">
            {item.name}
          </div>
          <div className="mt-3 space-y-1">
            {specs &&
              specs.map((item, n) => (
                <div
                  key={n}
                  className="flex justify-strat items-center text-sm font-exo-2 gap-2"
                >
                  <span className="font-bold">{item.label[lang]}:</span>
                  <span className="">{item.value}</span>
                </div>
              ))}
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="relative size-full">
          <AlertDialogTitle>{item.name}</AlertDialogTitle>
          <AlertDialogCancel
            asChild
            className="absolute right-0 top-0 text-app-black"
          >
            <Button>
              <X className="size-4" />
            </Button>
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
