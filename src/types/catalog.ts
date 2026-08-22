export type ProductForm = "vial" | "spray" | "supply";

export type ProductCategory = "peptides" | "blends" | "sprays" | "supplies";

export type ProductVariant = {
  id: string;
  label: string;
  price: number;
  sku: string;
};

export type Product = {
  slug: string;
  name: string;
  alsoKnownAs: string[];
  tagline: string;
  description: string;
  category: ProductCategory;
  form: ProductForm;
  featured?: boolean;
  cas?: string;
  sequence?: string;
  storage: string;
  variants: ProductVariant[];
};

export type CartLine = {
  productSlug: string;
  variantId: string;
  quantity: number;
};

export type CheckoutPayload = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  lines: CartLine[];
  researchAcknowledged: boolean;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: "Documentation" | "Handling" | "Quality" | "Compliance";
  body: string[];
};
