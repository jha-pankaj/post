const fs = require('fs');
const path = require('path');

const browserPath = path.join(__dirname, 'dist/blog-frontend', 'browser');
const oldFile = path.join(browserPath, 'index.csr.html');
const newFile = path.join(browserPath, 'index.html');

if (fs.existsSync(oldFile)) {
    fs.renameSync(oldFile, newFile);
    console.log('Renamed index.csr.html to index.html');
} else {
    console.error('index.csr.html not found');
}