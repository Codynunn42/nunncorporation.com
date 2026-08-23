const fs = require('fs').promises;
const path = require('path');

// Directories in the build output that are known or likely to contain server-only code
const SERVER_ONLY_DIRS = new Set(['server', 'functions', 'api']);

// File extensions that are safe to serve as static assets
const STATIC_EXTENSIONS = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.css',
  '.html',
  '.htm',
  '.map',
  '.json',
  '.txt',
  '.xml',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
  '.avif',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.eot',
  '.wasm'
]);

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const name = entry.name;
    // Skip the worker script, the existing public directory, and known server-only directories
    if (name === '_worker.js' || name === 'public' || SERVER_ONLY_DIRS.has(name)) continue;
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (entry.isDirectory()) {
      // Recurse into subdirectories, where per-file filtering will still apply
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      const ext = path.extname(name).toLowerCase();
      // Only copy files that look like static/client assets
      if (STATIC_EXTENSIONS.has(ext)) {
        await fs.copyFile(srcPath, destPath);
      }
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
