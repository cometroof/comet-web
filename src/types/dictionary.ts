import PageLoader from "next/dist/client/page-loader";

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
      other: string;
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
  contactUs: string;
  weHere: string;
  withUs: string;
}

// Guarantee Claim Form dictionary structure
export interface GuaranteeDictionary extends PageDictionary {
  title: string;
  description: string;
  claim_steps: {
    title: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3title: string;
    step3Description: string;
    step4title: string;
    step4Description: string;
    step5title: string;
    step5Description: string;
  };
  authorization: {
    title: string;
    description: string;
  };
  claim_form: {
    title: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    issues: string;
    name_placeholder: string;
    email_placeholder: string;
    phone_placeholder: string;
    address_placeholder: string;
    city_placeholder: string;
    postal_code_placeholder: string;
    issues_placeholder: string;
    submit_button: string;
    success_message: string;
    error_message: string;
    captcha_error: string;
    generic_error: string;
    validation: {
      name_required: string;
      email_invalid: string;
      phone_required: string;
      address_required: string;
      city_required: string;
      postal_code_required: string;
      issues_min_length: string;
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
  availableSize: string;
  certifications: string;
  profileType: string;
  warrantyContent: {
    title: string;
    description: string;
  };
  interlockingContent: {
    title: string;
    description: string;
  };
  lightweightContent: {
    title: string;
    description: string;
    weightPanel: string;
  };
  sustainableContent: {
    title: string;
    description: string;
  };
  nonCombustible: {
    title: string;
    description: string;
  };
  lowerNoise: {
    title: string;
    description: string;
  };
  disasterResistant: {
    title: string;
    description: string;
  };
  modernDesign: {
    title: string;
    description: string;
  };
}

export interface ProductDetailDictionary extends PageDictionary {
  suitables_title: string;
}

export interface ProjectDetailDictionary extends PageDictionary {
  detail: {
    location: string;
    roofType: string;
    backToAll: string;
  };
}

export interface AboutUsDictionary extends PageDictionary {
  innovation: {
    title: string;
    description: string;
    roofProfileTitle: string;
    roofProfileDescripton: string;
    integratedSystemTitle: string;
    integratedSystemDescription: string;
    finishingTitle: string;
    finishingDescription: string;
  };
  cover: {
    title: string;
    description: string;
    letter: string;
    cta: string;
  };
  vision_mission: {
    vision_title: string;
    vision_description: string;
    mission_title: string;
    mission_letter_1: string;
    mission_letter_2: string;
    mission_letter_3: string;
    mission_letter_4: string;
    misstion_letter_5: string;
  };
  discovery: {
    title: string;
    description: string;
  };
  superior: {
    title: string;
    description: string;
    cta: string;
  };
  trust: {
    title: string;
    description1: string;
    description2: string;
    description3: string;
  };
  inclusive: {
    title: string;
    description1: string;
    description2: string;
  };
  distribution: {
    title: string;
    description: string;
    label_partners: string;
    desc_partners: string;
  };
}

export interface ArticleDictionary extends PageDictionary {
  pageTitle: string;
  pageDescription: string;
}

export interface ProjectDictionary extends PageDictionary {
  allProject: string;
  title: string;
  description: string;
  detail: {
    location: string;
    roofType: string;
    backToAll: string;
  };
}

// Legacy dictionary structure
export interface Dictionary {
  home?: HomeDictionary;
  contact?: ContactDictionary;
  common?: CommonDictionary;
  product?: ProductDictionary;
  guarantee?: GuaranteeDictionary;
  [pageName: string]: PageDictionary | undefined;
}
