module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx$': 'ts-jest',
      '^.+\\.ts$': 'ts-jest',
      "^.+\\.js$": "babel-jest",
    },
    testMatch: ['**/App.test.tsx'],
    moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx'],
    globals: {
        "API": require('./src/environment/api')
    }
}