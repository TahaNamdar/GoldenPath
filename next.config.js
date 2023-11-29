// @type {import('next').NextConfig}

module.exports = {
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
