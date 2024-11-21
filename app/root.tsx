import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useNavigation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "image/x-icon",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style>
          {`
            @keyframes pulseBlur {
              0%, 100% {
                filter: blur(2px);
                opacity: 0.7;
              }
              50% {
                filter: blur(3px);
                opacity: 0.5;
              }
            }

            .pulse-blur {
              animation: pulseBlur 1.5s infinite;
            }
          `}
        </style>
      </head>
      <body>
        <nav className="mx-4 flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0 py-4 border-b">
          <div className="flex items-center space-x-3">
            <img
              src="/avatar.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-800">空心灯的星空</h1>
          </div>

          <div className="flex flex-wrap justify-center space-x-4 text-center sm:ml-8 text-gray-700">
            <Link to="/" className="hover:text-blue-400">
              首页
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/categories" className="hover:text-blue-400">
              分类
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/notes" className="hover:text-blue-400">
              随笔
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/thoughts" className="hover:text-blue-400">
              说说
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/friends" className="hover:text-blue-400">
              友链
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/comments" className="hover:text-blue-400">
              留言
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/about" className="hover:text-blue-400">
              关于
            </Link>
          </div>
        </nav>

        <div className={isLoading ? "pulse-blur" : ""}>{children}</div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
