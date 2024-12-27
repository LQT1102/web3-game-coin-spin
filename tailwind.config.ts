import type { Config } from "tailwindcss";

const spacing = {} as any;
for (let i = 0; i <= 128; i++) {
  spacing[i] = `${i * 4}px`;
}

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing,
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          info: "#ffbf00",
          "base-100": "#fafafa",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-content": "#fff",
          "neutral-content": "#a6adbb", //Màu cho các phần không cần nổi bật
          "base-100": "#060019", //Màu nền chính
          "base-200": "#1D232A", //Nền sáng hơn nền chính
          neutral: "#130D25", //Màu nền phụ không nổi bật (section )
          success: "#1BB96B",
          warning: "#B98D1B",
          error: "#B91B5D",
          info: "#B98D1B",
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
} satisfies Config;

