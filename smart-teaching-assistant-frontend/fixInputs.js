import fs from 'fs';
const files = [
    'src/pages/collegeadmin/Department.jsx',
    'src/pages/collegeadmin/Professor.jsx',
    'src/pages/collegeadmin/Subjects.jsx',
    'src/pages/collegeadmin/AINotes.jsx'
];
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    // Match the entire InputField declaration
    const match = content.match(/[ \t]*const InputField = \(\{[\s\S]*?\}\) => \([\s\S]*?\n[ \t]*\);\n/);
    if (match) {
        console.log("Matched in " + f);
        content = content.replace(match[0], ''); // remove from inside
        content = content.replace(/export default function/, match[0].replace(/^[ \t]+/gm, '') + '\nexport default function');
        fs.writeFileSync(f, content);
    } else {
        console.log("No match in " + f);
    }
});
console.log("Done");
