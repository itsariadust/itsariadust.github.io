import type { UserConfig } from "@11ty/eleventy";

export default function (eleventyConfig: UserConfig) {
  // Recognize .11ty.ts files as template files
  eleventyConfig.addExtension("11ty.ts", {
    key: "11ty.js",
  });

  eleventyConfig.addTemplateFormats("11ty.ts");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}

