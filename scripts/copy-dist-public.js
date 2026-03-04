const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const name = entry.name;
    if (name === '_worker.js' || name === 'public') continue;
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

(async () => {
  const repoRoot = path.resolve(__dirname, '..');
  const src = path.join(repoRoot, 'dist');
  const dest = path.join(src, 'public');
  try {
    await copyDir(src, dest);
    console.log(`Copied static assets to ${dest}`);
  } catch (err) {
    console.error('Failed to copy assets:', err);
    process.exit(1);
  }
})();
