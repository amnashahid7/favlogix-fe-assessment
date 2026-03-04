"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Pencil } from "lucide-react";
import { Phase } from "@/app/types";
import SkeletonBlock from "../Skeletons/SkeletonBlock";
import { div } from "framer-motion/client";

type ChatUser = {
  id: string;
  name: string;
  message: string;
  time: string;
};

const chats: ChatUser[] = [
  {
    id: "1",
    name: "Olivia Mckinsey",
    message: "Oh my god 😍 I'll try it ASAP, thank...",
    time: "23:23",
  },
  {
    id: "2",
    name: "Sara Williams",
    message: "Good Evening, Emily! Hope you are...",
    time: "23:16",
  },
  {
    id: "3",
    name: "Frank Thompson",
    message: "Thank you for signing up Frank! If t...",
    time: "22:28",
  },
  {
    id: "4",
    name: "Grace Lee",
    message: "I am sending you the report right a...",
    time: "20:43",
  },
  {
    id: "5",
    name: "Henry Adams",
    message: "Thank you for filling out our survey!",
    time: "17:37",
  },
];

export default function ChatSidebar({
  phase,
  onSelectChat,
}: {
  phase: Phase;
  onSelectChat?: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string>("1");

  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);
  const avatarColors = [
    "bg-red-200 text-red-700",
    "bg-green-200 text-green-700",
    "bg-blue-200 text-blue-700",
    "bg-yellow-200 text-yellow-700",
    "bg-pink-200 text-pink-700",
    "bg-purple-200 text-purple-700",
    "bg-indigo-200 text-indigo-700",
    "bg-teal-200 text-teal-700",
  ];

  return (
    <div className="w-[320px] min-h-screen bg-white rounded-xl shadow flex flex-col overflow-hidden z-40">


      {(phase === "skeleton" || phase === "loading") && (
        <div className="w-[320px] h-full bg-white">
          <div className="p-4 space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonBlock key={i} />
            ))}
          </div>
        </div>
      )}


      {phase === "loaded" && (
        <>

          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold text-lg text-black">
              Michael Johnson
            </h2>
            <Pencil
              size={18}
              className="text-gray-600 cursor-pointer"
            />
          </div>

          
          <div className="p-4 border-b">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2">
              <Search size={16} className="text-black" />
              <input
                type="text"
                placeholder="Search Chat"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1 text-black"
              />
              <SlidersHorizontal
                size={16}
                className="text-gray-500 cursor-pointer"
              />
            </div>
          </div>

       
          <div className="flex items-center justify-between px-4 py-3 text-sm border-b">
            <span className="font-medium cursor-pointer text-black">
              Open ▾
            </span>
            <span className="text-gray-500 cursor-pointer">
              Newest ▾
            </span>
          </div>

      
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat, index) => {
              const isActive = chat.id === activeId;
              const colorClass = avatarColors[index % avatarColors.length];
              return (
                <motion.div
                  key={chat.id}
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  onClick={() => {
                    setActiveId(chat.id);
                    onSelectChat?.(chat.id);
                  }}
                  className={`flex items-start gap-3 p-4 cursor-pointer transition ${isActive ? "bg-gray-100" : ""
                    }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${colorClass}`}>
                    {chat.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate text-black">
                        {chat.name}
                      </p>
                      <span className="text-xs text-gray-500">
                        {chat.time}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 truncate">
                      {chat.message}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {filteredChats.length === 0 && (
              <div className="p-4 text-sm text-gray-400">
                No chats found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}