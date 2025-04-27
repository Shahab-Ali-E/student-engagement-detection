// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig();
//   const { assetExts } = defaultConfig.resolver;
//   return {
//     resolver: {
//       // Add bin to assetExts
//       assetExts: [...assetExts, 'bin'],
//     }
//   };
// })();

// metro.config.js
// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname);

// // Add custom extensions
// config.resolver.assetExts.push('bin', 'json', 'pb', 'txt', 'tflite');

// // Fix 'react-native-fs' mapping (you're correctly doing this)
// config.resolver.extraNodeModules = {
//   ...config.resolver.extraNodeModules,
//   'react-native-fs': require.resolve('expo-file-system'),
// };

// // Ensure images/fonts are handled correctly
// config.transformer.assetPlugins = config.transformer.assetPlugins || [];
// config.transformer.assetPlugins.push('expo-asset/tools/hashAssetFiles');

// config.transformer.getTransformOptions = async () => ({
//   transform: {
//     experimentalImportSupport: false,
//     inlineRequires: true,
//   },
// });

// module.exports = config;


// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');  // Expo SDK 51

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  'tflite',
  'bin',
  'pb',
  'txt',
  'json'
);

module.exports = config;
