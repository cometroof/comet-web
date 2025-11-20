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

export const reheading = (html: string) => {
  if (!html) return "";
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const headings = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6"));
    headings.forEach((node) => {
      const tag = node.tagName.toLowerCase();
      const level = Number(tag.slice(1));
      const newLevel = Math.min(6, level + 1);
      const newTag = `h${newLevel}`;

      if (newTag === tag) return; // keep h6 as h6

      const newEl = doc.createElement(newTag);
      // copy attributes
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        newEl.setAttribute(attr.name, attr.value);
      }
      newEl.innerHTML = node.innerHTML;
      node.parentNode?.replaceChild(newEl, node);
    });

    return doc.body.innerHTML;
  } catch {
    return html;
  }
};

export const cleanHTML = (html?: string | null) => {
  if (html) return reheading(html?.replace(/<p[^>]*>\s*<\/p>/g, "<br />"));
  return "";
  // .replace(/<p[^>]*>\s*<\/p>/g, '');
};
