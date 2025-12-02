import { Database } from "@/supabase/supabase";

// Base database types
export type Product = Database["public"]["Tables"]["product"]["Row"];
export type Certificate = Database["public"]["Tables"]["certificates"]["Row"];
export type ProductProfile =
  Database["public"]["Tables"]["product_profile"]["Row"];
export type ProductCategory =
  Database["public"]["Tables"]["product_category"]["Row"];
export type ProductItem = Database["public"]["Tables"]["product_item"]["Row"];
export type ProductBadge =
  Database["public"]["Tables"]["product_badges"]["Row"];
export type ProductCertificate =
  Database["public"]["Tables"]["product_certificates"]["Row"];
export type ProfileBadge =
  Database["public"]["Tables"]["product_profile_badges"]["Row"];
export type ProfileCertificate =
  Database["public"]["Tables"]["product_profile_certificates"]["Row"];

// Relation types
export type ProfileCertificatesRelation = ProfileCertificate & {
  certificates?: Certificate;
};

export type ProductBadgePartial = Pick<
  ProductBadge,
  "id" | "name" | "image" | "order"
>;

export type ProfileBadgeRelation = ProfileBadge & {
  product_badges?: ProductBadgePartial;
};

export type ProductCategoryPartial = Pick<
  ProductCategory,
  "id" | "name" | "subtitle" | "subtitle_id" | "order"
>;

export type ProductProfileRelations = ProductProfile & {
  product_profile_badges?: ProfileBadgeRelation[];
  product_profile_certificates?: ProfileCertificatesRelation[];
  product_category?: ProductCategoryPartial[];
};

export type ProductDataWithItems = Product & {
  product_category?: ProductCategoryPartial[];
  product_profile?: ProductProfileRelations[];
  product_item?: ProductItem[];
  product_badges?: ProductBadge[];
  product_certificates?: ProductCertificate[];
};

// Dimension and specification types
export type TDimension = {
  rows: { label: { en: string; id: string }; values: string[] }[];
  headers: string[];
};

export type TProfileSpesifications = {
  label: { en: string; id: string };
  value: string;
};

// Exported aliases for backward compatibility
export type TProductItem = ProductItem;
export type TProductProfile = ProductProfileRelations;
