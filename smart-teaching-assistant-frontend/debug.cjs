const { execSync } = require('child_process');
const fs = require('fs');
try {
    execSync('npx vite build', { stdio: 'pipe' });
} catch (e) {
    fs.writeFileSync('vite-error-full.log', e.stdout.toString() + '\n' + e.stderr.toString() + '\n' + e.message);
}
