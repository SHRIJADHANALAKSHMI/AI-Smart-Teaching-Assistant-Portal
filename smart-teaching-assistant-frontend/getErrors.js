const { execSync } = require('child_process');
const fs = require('fs');
try {
    const output = execSync('npx eslint src --quiet --format json').toString();
    fs.writeFileSync('lint.json', output);
} catch (e) {
    fs.writeFileSync('lint.json', e.stdout ? e.stdout.toString() : '');
}
console.log("Done");
