import type { UserConfig } from "@11ty/eleventy";

export default function (eleventyConfig: UserConfig) {
  // Keep support for TypeScript templates when needed.
  eleventyConfig.addExtension("11ty.ts", {
    key: "11ty.js",
  });
  eleventyConfig.addTemplateFormats("11ty.ts");

  // Copy these files without processing them as templates.
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("readableDate", (date: Date) => {
    return new Intl.DateTimeFormat().format(date);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}