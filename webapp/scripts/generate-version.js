const fs = require('fs');
const packageJson = require('../package.json');

let version = '';

try {
  version = `${packageJson.version}+${fs.readFileSync('../.git/refs/heads/main').toString().trim().substring(0, 7)}`;
} catch (_) {
  version = `${packageJson.version}+${fs.readFileSync('../.git/refs/heads/master').toString().trim().substring(0, 7)}`;
}

// eslint-disable-next-line no-console
console.log(`Writing version ${version} to local .env file.`);

fs.writeFileSync('.env', `VITE_APP_VERSION=${version}`);
