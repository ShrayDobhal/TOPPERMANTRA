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

    // 1. Remove emojis from badges
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}-\u{2454}\u{20D0}-\u{20FF}][\uFE00-\uFE0F]*\s*/gu;
    
    modified = modified.replace(/<Badge([^>]*)>([^<]*)<\/Badge>/g, (match, p1, p2) => {
      let newText = p2.replace(emojiRegex, '').trim();
      return `<Badge${p1}>${newText}</Badge>`;
    });

    // 2. Remove full stops from headings
    modified = modified.replace(/Begin\.<\/motion\.span>/g, 'Begin</motion.span>');
    modified = modified.replace(/One Decision\.<\/motion\.span>/g, 'One Decision</motion.span>');
    modified = modified.replace(/Infinite Opportunities\.<\/motion\.span>/g, 'Infinite Opportunities</motion.span>');
    modified = modified.replace(/Already Walked The Path\.<\/motion\.span>/g, 'Already Walked The Path</motion.span>');
    modified = modified.replace(/That Shape Careers\.<\/motion\.span>/g, 'That Shape Careers</motion.span>');
    modified = modified.replace(/Opportunity Doesn't\.<\/motion\.span>/g, "Opportunity Doesn't</motion.span>");
    modified = modified.replace(/Products\.<\/motion\.span>/g, 'Products</motion.span>');
    modified = modified.replace(/Build Together\.<\/motion\.span>/g, 'Build Together</motion.span>');
    modified = modified.replace(/Career Ready\.<\/motion\.span>/g, 'Career Ready</motion.span>');
    
    // For old components:
    modified = modified.replace(/A community that shows up for each other\./g, 'A community that shows up for each other');
    modified = modified.replace(/Finally — the communityyou've been looking for\./g, "Finally — the community you've been looking for");
    modified = modified.replace(/From your first login to launching what's next\./g, "From your first login to launching what's next");
    modified = modified.replace(/Mentors from companies you dream of joining\./g, 'Mentors from companies you dream of joining');
    modified = modified.replace(/From idea to incubation\./g, 'From idea to incubation');
    modified = modified.replace(/Everything you need to grow — in one ecosystem\./g, 'Everything you need to grow — in one ecosystem');

    // 3. Fix spacing to consistent py-24 md:py-32
    if (file === 'FinalCta.jsx') {
      modified = modified.replace(/py-32 md:py-48/g, 'py-24 md:py-32');
    }

    if (content !== modified) {
      fs.writeFileSync(filePath, modified);
      console.log('Modified', file);
    }
  });
});
