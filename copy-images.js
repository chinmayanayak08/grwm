const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Chinmaya nayak\\.gemini\\antigravity\\brain\\c62e6701-bf8e-4118-b2fe-9f766ad284f3';
const destDir = path.join(process.cwd(), 'public', 'outfits');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);

for (const f of files) {
  if (
    f.endsWith('.png') && 
    !f.startsWith('landing') && 
    !f.startsWith('studio') && 
    !f.startsWith('recommendations') && 
    !f.startsWith('test_image') &&
    !f.includes('feedback')
  ) {
    // Strip timestamp _177... suffix
    const baseName = f.substring(0, f.lastIndexOf('_'));
    if (baseName) {
      fs.copyFileSync(path.join(srcDir, f), path.join(destDir, `${baseName}.png`));
      console.log(`Copied ${baseName}.png`);
    }
  }
}
