const fs = require('fs');

const extractAndFix = (filename) => {
    let content = fs.readFileSync(filename, 'utf8');
    const startIdx = content.indexOf('    const InputField =');
    if (startIdx === -1) return;
    const endStr = '    );\n';
    const endIdx = content.indexOf(endStr, startIdx);

    if (endIdx === -1) return;

    const block = content.substring(startIdx, endIdx + endStr.length);
    let originalComponent = content.replace(block, '');

    // Add import clsx if not exists
    if (!originalComponent.includes("import clsx")) {
        originalComponent = originalComponent.replace(/import .*?;\n/, match => match + "import clsx from 'clsx';\n");
    }

    const unindentedBlock = block.replace(/^    /gm, '');
    const finalContent = originalComponent.replace(/export default function/, unindentedBlock + '\nexport default function');

    fs.writeFileSync(filename, finalContent, 'utf8');
    console.log("Fixed " + filename);
};

['src/pages/collegeadmin/Department.jsx', 'src/pages/collegeadmin/Professor.jsx', 'src/pages/collegeadmin/Subjects.jsx', 'src/pages/collegeadmin/AINotes.jsx'].forEach(extractAndFix);
