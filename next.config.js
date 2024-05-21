/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    },
    images: {
        domains: ['aefsitlkirjpwxayubwd.supabase.co'],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/overview/week',
                permanent: true,
            },
        ]
    },
};
