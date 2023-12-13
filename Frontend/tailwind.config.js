const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      colorRoyalton: '#004A63',
      colorHover: '#3486a2',
    },
  },
  plugins: [],
});

