export function stripHTML(htmlString: string) {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
}

export const sanitizeHTML = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Fix nested p tags
  doc.querySelectorAll("p p").forEach((nested) => {
    const parent = nested.parentElement;
    parent?.insertAdjacentElement("afterend", nested);
  });

  return doc.body.innerHTML;
};

export const cleanHTML = (html?: string | null) => {
  if (html) return html?.replace(/<p[^>]*>\s*<\/p>/g, "<br />");
  return "";
  // .replace(/<p[^>]*>\s*<\/p>/g, '');
};
