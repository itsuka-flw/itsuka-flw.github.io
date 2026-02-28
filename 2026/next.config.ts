import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.1.8:3000", "http://localhost:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js と Three.js/PixiJS に必要
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // インラインスタイルとGoogle Fonts
              "img-src 'self' data: blob: https://drive.google.com https://lh3.googleusercontent.com", // 画像ソース
              "font-src 'self' data: https://fonts.gstatic.com", // フォント
              "connect-src 'self'", // API接続
              "frame-src 'none'", // iframeを無効化
              "object-src 'none'", // objectタグを無効化
              "base-uri 'self'", // base URLを制限
              "form-action 'self'", // フォーム送信先を制限
              "frame-ancestors 'none'", // クリックジャッキング対策
              "upgrade-insecure-requests", // HTTPをHTTPSにアップグレード
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
