import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import path from "path";
import fs from "fs/promises";

type FriendLink = {
  name: string;
  url: string;
  description: string;
  avatar: string;
};

export const meta: MetaFunction = () => [
  {
    title: "友链 - 空心灯的星空",
    description: "本站友链",
  },
];

export const loader = async () => {
  const filePath = path.resolve("resources/links.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  const links: FriendLink[] = JSON.parse(fileContents);
  return json(links);
};

export default function FriendsPage() {
  const links = useLoaderData<FriendLink[]>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">友链</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-white border rounded-lg shadow hover:bg-gray-100 transition"
          >
            <img
              src={link.avatar}
              alt={`${link.name} 的头像`}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">{link.name}</h2>
            <p className="text-sm text-gray-600 text-center">
              {link.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
