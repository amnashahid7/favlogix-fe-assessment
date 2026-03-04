"use client";

import { Message, Phase, Section, User } from "@/app/types";
import { motion } from "framer-motion";
import {
  Copy,
  Mic,
  Moon,
  MoreVertical,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";
import Image from "next/image";
import SkeletonBlock from "../Skeletons/SkeletonBlock";

export default function ChatSection({
  phase,
  messages,
    selectedUser,
  loadingSection,
}: {
  phase: Phase;
  messages: Message[];
    selectedUser: User | null;
  loadingSection?: Section | null;
}) {
  const isSectionLoading =
    (phase === "skeleton" || phase === "loading") &&
    loadingSection === "chat";
    console.log("ChatSection render - selectedUser:", selectedUser);
    console.log("ChatSection render - messages:", messages);

  return (
    <div className="h-full bg-gray-100">
     
  

      <div
        className={`flex flex-col h-[800px] bg-white rounded-xl shadow overflow-hidden ${
          isSectionLoading ? "opacity-50" : ""
        }`}
      >
       
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
         <h2 className="font-semibold text-gray-800">
  {selectedUser
    ? `${selectedUser.firstName} ${selectedUser.lastName}`
    : "Emily Johnson"}
</h2>

          <div className="flex items-center gap-3 text-gray-500">
            <button className="p-2 rounded-lg hover:bg-gray-200">
              <MoreVertical size={18} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-200">
              <Moon size={18} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-200 bg-black text-white">
              <Copy size={16} />
            </button>
          </div>
        </div>

     
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {(phase === "skeleton" || phase === "loading") &&
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBlock key={i} />
            ))}

          {phase === "loaded" && (
            <>
        
              <div className="flex justify-center">
                <span className="bg-gray-200 text-xs px-4 py-1 rounded-full text-gray-600">
                  28 August 2025
                </span>
              </div>

              {messages.map((msg, index) => {
                const isUser = msg.sender === "user";

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${
                      isUser ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div className="flex items-end gap-2 max-w-[70%]">
                    
                      {isUser && (
                        <>
                          <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-xl rounded-bl-none text-sm shadow-sm">
                            {msg.body}
                          </div>

                          <div className="text-xs text-gray-400">
                            {msg.time}
                          </div>
                        </>
                      )}

                    
                      {!isUser && (
                        <>
                          <div className="text-xs text-gray-400 text-right">
                            <div>{msg.time}</div>
                            <Image src="/svgs/tick.svg" alt="Bot" width={20} height={20}/>
                          </div>

                          <div className="bg-purple-200 text-gray-900 px-4 py-3 rounded-xl rounded-br-none text-sm shadow-sm">
                            {msg.body}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </>
          )}
        </div>

   
        <div className="border-t bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3">
              <Paperclip size={18} className="text-gray-500 cursor-pointer" />
              <Smile size={18} className="text-gray-500 cursor-pointer" />

              <input
                type="text"
                placeholder="Type something...."
                className="flex-1 bg-transparent outline-none text-sm text-black"
              />

              <Mic size={18} className="text-gray-500 cursor-pointer" />
            </div>

            <button className="bg-black text-white p-3 rounded-lg hover:opacity-80">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}