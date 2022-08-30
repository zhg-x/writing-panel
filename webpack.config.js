const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: "production",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: "writingPanel",
        libraryTarget: "umd",
        clean: true
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: "ts-loader"}
        ]
    }
};
