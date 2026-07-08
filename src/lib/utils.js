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



// lib/linkify-phone.jsx

/**
 * Extracts continuous phone numbers from a support string and returns
 * React nodes: numbers become clickable tel: links, all other text
 * (labels like "Mob:", commas, spacing) is preserved and shown as-is.
 */
export function linkifyPhoneNumbers(text) {
  if (!text) return null;

  const phoneRegex = /(\+?\d[\d\s-]{5,}\d)/g;
  const isPhonePart = /^\+?\d[\d\s-]{5,}\d$/;

  const parts = text.split(phoneRegex);

  return parts.map((part, i) => {
    if (isPhonePart.test(part)) {
      const cleanNumber = part.replace(/[\s-]/g, "");
      return (
        <a
          key={i}
          href={`tel:${cleanNumber}`}
        >
          {part}
        </a>
      );
    }
    return part ? <span key={i}>{part}</span> : null;
  });
}