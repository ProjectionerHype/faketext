import { useEffect } from "react";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo(opts: { title: string; description: string; path?: string }) {
  useEffect(() => {
    document.title = opts.title;
    setMeta("description", opts.description);
    setMeta("og:title", opts.title, "property");
    setMeta("og:description", opts.description, "property");
    setMeta("twitter:title", opts.title);
    setMeta("twitter:description", opts.description);
    if (opts.path) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = `https://faketext.fun${opts.path}`;
      setMeta("og:url", `https://faketext.fun${opts.path}`, "property");
    }
  }, [opts.title, opts.description, opts.path]);
}
