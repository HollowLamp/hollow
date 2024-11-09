import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  {
    title: "关于 - 空心灯的星空",
    description: "本站简介与个人信息。",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">关于我</h1>

      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="max-w-2xl text-lg text-gray-700 leading-relaxed">
          <p>普通人，爱摸鱼</p>
          <p>经常出没在这些地方</p>
          <p>因为评论功能未实现，需要联系请通过知乎私信</p>
        </div>

        <div className="flex space-x-4 mt-8">
          <a
            href="https://github.com/HollowLamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://space.bilibili.com/430275215"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/bilibili.svg"
              alt="Bilibili"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://www.zhihu.com/people/dang-shi-zhi-dao-shi-xun-chang-40-48"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zhihu.svg"
              alt="Zhihu"
              className="w-8 h-8"
            />
          </a>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center mt-8">关于本站</h1>
        <div className="max-w-2xl text-lg text-gray-700 leading-relaxed">
          <p>remix, react, tailwind, nest + chatgpt堆出来的东西</p>
        </div>
      </div>
    </div>
  );
}
