// @type {import('next').NextConfig}

module.exports = {
    webpackDevMiddleware: (config) => {
        // Solve compiling problem via vagrant
        config.watchOptions = {
            poll: 1000, // Check for changes every second
            aggregateTimeout: 300, // delay before rebuilding
        };
        return config;
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    reactStrictMode: false, // React Strict Mode is off
};
