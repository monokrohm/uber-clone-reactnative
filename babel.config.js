module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ["nativewind/babel", ["module:react-native-dotenv", {"moduleName": "@env",
    "path": ".env.local",}]],
    presets: ['babel-preset-expo'],
  };
};
