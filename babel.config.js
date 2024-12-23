module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        development: process.env.BABEL_ENV === "development",
      },
    ],
  ],
};
