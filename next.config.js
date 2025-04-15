module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net"
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/figures/**"
      },
      {
        protocol: "https",
        hostname: "pollrose-fastapi.onrender.com",
        pathname: "/figures/**"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path",
        destination: "http://127.0.0.1:8000/:path*" // Proxy requests to FastAPI
      }
    ];
  }
};
