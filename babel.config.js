module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: [">0.25%"],
          },
        },
      ],
      [
        "@babel/preset-react",
        {
          development: process.env.NODE_ENV !== "production",
          runtime: "automatic",
        },
      ],
    ],
  };
};
