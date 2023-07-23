module.exports = {
    testEnvironment: 'jest-environment-jsdom', // Define o ambiente de teste para executar em um ambiente JS DOM
    // setupFilesAfterEnv: ['<rootDir>/src/__tests__/.jest/setup-jest.js'], // Importa as extensões de expect da Testing Library
    setupFilesAfterEnv:['@testing-library/jest-dom'],
    moduleNameMapper: {
        // '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/.jest/mocks/fileMock.js',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__tests__/.jest/mocks/fileMock.js',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      },
};