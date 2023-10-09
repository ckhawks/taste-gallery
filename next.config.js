module.exports = {
  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
    };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "taste-gallery.s3.us-west-1.amazonaws.com",
        port: "",
        pathname: "/**", // remove first slash?
      },
      {
        protocol: "https",
        hostname: "taste-images.stlr.cx",
        port: "",
        pathname: "/**", // remove first slash?
      },
    ], // https://taste-gallery.s3.us-west-1.amazonaws.com/photog/016pv4ndnwna1.webp
  },
};
