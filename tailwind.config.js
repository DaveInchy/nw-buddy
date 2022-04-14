module.exports = {
  content: ["./src/**/*.{html,js}", "./src/**/*.{css,scss}", "./src/**/*.{png,jpg,jpeg,svg,gif}"],
  theme: {
    colors: {
      "blue": "#1fb6ff",
      "purple": "#7e5bef",
      "pink": "#ff49db",
      "orange": "#ff7849",
      "green": "#13ce66",
      "yellow": "#c5a100",
      "red": "#ff4949",
      "gray": "#8492a6",
      "white": "#ffffff",
      "black": "#000000",
      "light": "#eeeeee",
      "dark": "#333333",
    },
    extend: {
      fontFamily: {
        "new-world": ["'New World'", "consolas", "monospace"],
      },
      color: {
        "gray-dark": "#273444",
        "gray-light": "#d3dce6",
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
        "10xl": "8rem",
      },
      spacing: {
        "7xl": "72rem",
        "8xl": "96rem",
        "9xl": "128rem",
        "10xl": "148rem",
      },
    },
  },
};