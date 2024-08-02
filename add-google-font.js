const fs = require('fs');
const path = require('path');

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
const FONT_NAME = 'Roboto';

const documentDir = path.join('pages');
const documentPath = path.join(documentDir, '_document.js');
const stylesDir = path.join('styles');
const globalsCSSPath = path.join(stylesDir, 'globals.css');

const documentContent = `
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="${FONT_URL}"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
`;

const globalCSSContent = `
/* styles/globals.css */
body {
  font-family: '${FONT_NAME}', sans-serif;
}
`;

// Ensure pages directory exists
if (!fs.existsSync(documentDir)) {
  fs.mkdirSync(documentDir, { recursive: true });
  console.log('Created pages directory.');
}

// Create or update _document.js
if (!fs.existsSync(documentPath)) {
  fs.writeFileSync(documentPath, documentContent.trim());
  console.log('Created _document.js with Google Fonts link.');
} else {
  let existingContent = fs.readFileSync(documentPath, 'utf-8');
  if (!existingContent.includes(FONT_URL)) {
    existingContent = existingContent.replace(
      '<Head>',
      `<Head>
        <link
          href="${FONT_URL}"
          rel="stylesheet"
        />`
    );
    fs.writeFileSync(documentPath, existingContent);
    console.log('Updated _document.js with Google Fonts link.');
  }
}

// Ensure styles directory exists
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true });
  console.log('Created styles directory.');
}

// Create or update globals.css
if (!fs.existsSync(globalsCSSPath)) {
  fs.writeFileSync(globalsCSSPath, globalCSSContent.trim());
  console.log('Created globals.css with font-family definition.');
} else {
  let existingCSSContent = fs.readFileSync(globalsCSSPath, 'utf-8');
  if (!existingCSSContent.includes(`font-family: '${FONT_NAME}'`)) {
    existingCSSContent += `\n${globalCSSContent.trim()}`;
    fs.writeFileSync(globalsCSSPath, existingCSSContent);
    console.log('Updated globals.css with font-family definition.');
  }
}

console.log('Google Fonts integration completed successfully.');
