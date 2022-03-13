const { execSync } = require('child_process');

export const uiStart = () => {
  execSync('npm run build:ui');
  execSync('npm run start:ui');
};
