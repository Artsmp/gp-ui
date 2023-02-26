module.exports = {
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
    '*.{css,scss,less}': ['prettier --write'],
    '*.vue': ['eslint --fix', 'prettier --write'],
    'package.json': ['prettier --write'],
};
