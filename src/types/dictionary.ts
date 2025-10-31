export type PageDictionary = Record<string, unknown>;

// Home page dictionary structure
export interface HomeDictionary extends PageDictionary {
  cover: {
    heading: string;
    description: string;
    poet: string;
    about_us_title: string;
    about_us_warranty: string;
    about_us_precision: string;
    about_us_lightweight: string;
    about_us_environmentally: string;
    about_us_combustible: string;
    about_us_disaster: string;
    about_us_design: string;
  };
  product: {
    head: string;
    title: string;
    description: string;
    cta: string;
  };
  certifications: {
    blueScopeDescription: string;
    opening: string;
    cta: string;
  };
  project: {
    title: string;
    description: string;
    noteText: string;
    cta: string;
  };
  distribution: {
    title: string;
    description: string;
    cta: string;
  };
  article: {
    title: string;
    note: string;
    cta: string;
  };
}

// Contact page dictionary structure
export interface ContactDictionary extends PageDictionary {
  form: {
    title: string;
    heading: string;
    name: string;
    email: string;
    phone: string;
    inquiry: string;
    message: string;
    submit: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    selectInquiry: string;
    inquiryOptions: {
      general: string;
      product: string;
      quote: string;
      support: string;
    };
  };
  office: {
    title: string;
    address: string;
  };
  coverage: {
    heading: string;
    regions: {
      jawa: string;
      sumatera: string;
      bangkaBelitung: string;
      sulawesi: string;
      kalimantan: string;
    };
    cities: {
      jawa: string;
      sumatera: string;
      bangkaBelitung: string;
      sulawesi: string;
      kalimantan: string;
    };
  };
}

// Common dictionary structure
export interface CommonDictionary extends PageDictionary {
  navigation: {
    home: string;
    about: string;
    products: string;
    projects: string;
    contact: string;
    articles: string;
    guarantee: string;
  };
  footer: {
    rights: string;
    address: string;
    contact: string;
    subscribe: string;
    followUs: string;
    privacy: string;
    terms: string;
    reach_text: string;
    reach_cta: string;
  };
  buttons: {
    readMore: string;
    viewAll: string;
    learnMore: string;
    download: string;
    close: string;
  };
  languageSelector: {
    english: string;
    indonesian: string;
  };
  breadcrumbs: {
    home: string;
    currentPage: string;
  };
  cta: {
    getQuote: string;
    contactUs: string;
    findDistributor: string;
  };
  search: {
    placeholder: string;
    button: string;
    noResults: string;
  };
  errors: {
    notFound: string;
    serverError: string;
    tryAgain: string;
  };
}

export interface ProductDictionary extends PageDictionary {
  cover: {
    title: string;
    head: string;
  };
  guarantee: {
    title: string;
    description: string;
    claim_cta: string;
  };
  sticker: {
    title: string;
    sticker_bluescope_title: string;
    sticker_bluescope_description: string;
    sticker_brandlogo_title: string;
    sticker_brandlogo_description: string;
    sticker_qr_title: string;
    sticker_qr_description: string;
    sticker_corrosion_warranty_title: string;
    sticker_corrosion_warranty_description: string;
    sticker_colors_warranty_title: string;
    sticker_colors_warranty_description: string;
    sticker_thickness_title: string;
    sticker_thickness_description: string;
    available_thickness: string;
    thickness_s: string;
    thickness_m: string;
    thickness_l: string;
    thickness_xl: string;
    thickness_xxl: string;
  };
  metalRoofTable: {
    title: string;
    col_feature: string;
    col_metalRoof: string;
    col_concrete: string;
    col_bitumen: string;
    rowElegentTitle: string;
    rowElegantDesc: string;
    rowLifetimeTitle: string;
    rowLifetimeDesc: string;
    rowLightWeightTitle: string;
    rowLightWeightDesc: string;
    rowRecycleTitle: string;
    rowRecycleDesc: string;
  };
  detail: {
    otherBrandsTitle: string;
  };
}

export interface ProductDetailDictionary extends PageDictionary {
  suitables_title: string;
}

// Legacy dictionary structure
export interface Dictionary {
  home?: HomeDictionary;
  contact?: ContactDictionary;
  common?: CommonDictionary;
  product?: ProductDictionary;
  [pageName: string]: PageDictionary | undefined;
}
