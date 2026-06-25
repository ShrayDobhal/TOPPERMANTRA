const fs = require('fs');
const path = require('path');
const dirs = ['./src/components', './src/pages'];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = content;

    // Reduce standard vertical padding across sections
    modified = modified.replace(/py-24 md:py-32/g, 'py-12 md:py-20');

    if (content !== modified) {
      fs.writeFileSync(filePath, modified);
      console.log('Modified', file);
    }
  });
});
