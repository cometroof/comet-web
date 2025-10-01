export interface Dictionary {
  home: {
    cover: {
      heading: string;
      description: string;
      poet: string;
    };
  };
  contact: {
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
  };
}
