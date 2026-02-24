const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            const ext = path.extname(file);
            if (['.js', '.jsx', '.css'].includes(ext)) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

function removeComments(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // A more robust regex for stripping comments while preserving strings
    // This handles // and /* */ but tries to avoid matching them inside " " or ' ' or ` `
    const cleanedContent = content.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*|(?<=['"`].*)\/\/.*(?=.*['"`])/g, (match) => {
        // If it looks like a URL (preceded by :), don't remove it
        // But we handled that with lookbehind mostly
        if (match.startsWith('//')) {
            // Check if it's potentially a URL inside a string by checking for :
            // But actually simple regex is safer for this massive task
            return "";
        }
        return "";
    });

    // Actually, a simpler and safer approach for stripping comments in JS:
    const finalContent = content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');

    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`Cleaned: ${filePath}`);
}

try {
    const allFiles = getAllFiles(srcDir);
    allFiles.forEach(removeComments);
    console.log('Cleanup complete!');
} catch (err) {
    console.error('Error during cleanup:', err);
}
