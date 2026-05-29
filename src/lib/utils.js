import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import parse, { Element } from "html-react-parser";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



const options = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      delete domNode.attribs.class;
    }
  },
};

export const ParsedContent = ({ html }) => {
  return <div>{parse(html, options)}</div>;
};

export function getYoutubeVideoId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

