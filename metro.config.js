const { getDefaultConfig } = require("expo/metro-config");
const { mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const config = {
  resolver: {
    assetExts: ["ttf", ...defaultConfig.resolver.assetExts],
    sourceExts: ["jsx", "js", "ts", "tsx", "json"],
  },
  transformer: {
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
  },
  server: {
    port: 8081,
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // Add CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        return middleware(req, res, next);
      };
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
