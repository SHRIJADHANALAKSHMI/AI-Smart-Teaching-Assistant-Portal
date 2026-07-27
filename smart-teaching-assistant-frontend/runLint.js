import fs from 'fs';
import { ESLint } from 'eslint';

(async function main() {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(['src/**/*.jsx', 'src/**/*.js']);
    const errorsOnly = ESLint.getErrorResults(results);

    const formatted = errorsOnly.map(file => {
        return {
            file: file.filePath,
            errors: file.messages.map(m => `Line ${m.line}: ${m.message}`)
        };
    });

    fs.writeFileSync('lint-output-node.json', JSON.stringify(formatted, null, 2));
    console.log('Linting complete');
})().catch((error) => {
    console.error(error);
});
