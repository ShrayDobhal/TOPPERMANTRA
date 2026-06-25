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

    modified = modified.replace(/A Clear Path\./g, 'A Clear Path');
    modified = modified.replace(/Talent Exists Everywhere\./g, 'Talent Exists Everywhere');
    modified = modified.replace(/One Ecosystem\./g, 'One Ecosystem');
    
    // Also remove the zero-width joiner from MentorsSection
    modified = modified.replace(/‍INDUSTRY MENTORS/g, 'INDUSTRY MENTORS');

    if (content !== modified) {
      fs.writeFileSync(filePath, modified);
      console.log('Modified', file);
    }
  });
});
