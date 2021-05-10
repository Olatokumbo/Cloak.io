module.exports = {
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  purge: {
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
      "./sections/**/*.{js,jsx,ts,tsx}",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    zIndex: {
      "-1": -1,
    },
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      inherit: "inherit",
      none: "none",
      2: "2 2 0%",
      3: "3 3 0%",
      4: "4 4 0%"
    },
    // height: {
    //   fit: "fit-content",
    //   full: "100%",
    //   screen: "100vh",
    //   sm: "8px",
    //   md: "16px",
    //   lg: "24px",
    //   xl: "48px",
    // },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
