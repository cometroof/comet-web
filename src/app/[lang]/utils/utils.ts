export function stripHTML(htmlString: string) {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
}
