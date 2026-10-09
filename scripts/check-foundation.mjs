import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const required = [
  'README.md',
  'SECURITY.md',
  'CONTRIBUTING.md',
  '.env.example',
  '.github/CODEOWNERS',
  '.github/workflows/ci.yml',
  '.github/workflows/security.yml',
  'docs/product/manual-first-operating-model.md',
  'docs/architecture/system-overview.md',
  'docs/security/threat-model.md',
  'docs/security/permission-matrix.md',
  'docs/security/ai-security-controls.md',
  'docs/security/production-checklist.md',
  'docs/testing/release-gates.md',
  'docs/demo/demo-script.md',
  'tests/security/README.md'
];

const missing = [];
for (const relative of required) {
  try {
    await access(join(root, relative));
  } catch {
    missing.push(relative);
  }
}

const packageDirs = ['apps', 'packages', 'supabase', 'automation', 'tests', 'docs', 'infra'];
for (const dir of packageDirs) {
  try {
    await readdir(join(root, dir));
  } catch {
    missing.push(`${dir}/`);
  }
}

if (missing.length) {
  console.error('Foundation verification failed. Missing:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Foundation verification passed: ${required.length} required files and ${packageDirs.length} top-level areas present.`);
