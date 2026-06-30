const fs = require('fs');
const path = require('path');

function replaceInDir(dir, replacements) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceInDir(fullPath, replacements);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const [from, to] of replacements) {
                if (content.includes(from)) {
                    content = content.split(from).join(to);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceInDir('src/modules/projects/pages', [
    ["from '../../lib/mockProjects'", "from '../../../lib/mockProjects'"],
]);

replaceInDir('src/modules/community/pages', [
    ["from '../../lib/mockCommunity'", "from '../../../lib/mockCommunity'"],
]);
