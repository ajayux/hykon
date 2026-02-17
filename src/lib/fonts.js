/**
 * Font configuration and utilities
 * Centralized font management for the application
 */

import { Inter } from "next/font/google";

// Inter font for all routes
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"],
  adjustFontFallback: true,
});

/**
 * Get the font variable
 * @returns {string} Font variable class name
 */
export function getFontVariable() {
  return inter.variable;
}

/**
 * Get the font class name
 * @returns {string} Font class name
 */
export function getFontClassName() {
  return "font-inter";
}
