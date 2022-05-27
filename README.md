# React Chrome Extension Boilerplate

"devDependencies": {
    "@types/chrome": "^0.0.134",
    "@types/react": "^17.0.3",
    "@types/react-dom": "^17.0.3",
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^7.0.0",
    "css-loader": "^5.2.4",
    "html-webpack-plugin": "^4.5.2",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "style-loader": "^2.0.0",
    "terser-webpack-plugin": "^5.1.1",
    "ts-loader": "^8.1.0",
    "typescript": "^4.2.4",
    "webpack": "^5.34.0",
    "webpack-cli": "^4.6.0",
    "webpack-merge": "^5.7.3"
  }

## Getting Started

1. `npm i` to install dependancies
2. `npm start` to start running the fast development mode Webpack build process that bundle files into the `dist` folder
3. `npm i --save-dev <package_name>` to install new packages

## Loading The Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder

# Important Initial Steps

1. `git init` to start a new git repo for tracking your changes, do an initial base commit with all the default files
2. Update `package.json`, important fields include `author`, `version`, `name` and `description`
3. Update `manifest.json`, important fields include `version`, `name` and `description`
4. Update `webpack.commmon.js`, the title in the `getHtmlPlugins` function should be your extension name

# Production Build

1. `npm run build` to generate a minimized production build in the `dist` folder
2. ZIP the entire `dist` folder (e.g. `dist.zip`)
3. Publish the ZIP file on the Chrome Web Store Developer Dashboard!

## Important Default Boilerplate Notes

- Folders get flattened, static references to images from HTML do not need to be relative (i.e. `icon.png` instead of `../static/icon.png`)
- Importing local ts/tsx/css files should be relative, since Webpack will build a dependancy graph using these paths
- Update the manifest file as per usual for chrome related permissions, references to files in here should also be flattened and not be relative
