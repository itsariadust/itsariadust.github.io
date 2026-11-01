export const data = {
  title: "My TypeScript 11ty Site",
  layout: "" // Add a layout path if you have one
};

export function render(data: { title: string }): string {
  return `
    <!xltype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${data.title}</title>
    </head>
    <body>
      <h1>${data.title}</h1>
      <p>Generated dynamically using TypeScript!</p>
    </body>
    </html>
  `;
}

