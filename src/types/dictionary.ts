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

// Legacy dictionary structure
export interface Dictionary {
  home?: HomeDictionary;
  contact?: ContactDictionary;
  common?: CommonDictionary;
  [pageName: string]: PageDictionary | undefined;
}
