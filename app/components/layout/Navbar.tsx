
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cog, Inbox, Sparkles, Target, Users, Workflow } from "lucide-react";

const navItems = [
  { name: "Inbox", icon: <Inbox /> },
  { name: "Contact", icon: <Users /> },
  { name: "AI Employees", icon: <Sparkles /> },
  { name: "Workflows", icon: <Workflow /> },
  { name: "Campaigns", icon: <Target /> },
];

export default function Navbar() {
  const [active, setActive] = useState("Inbox");

  return (
    <nav className=" flex items-center justify-between bg-white rounded-xl p-4 shadow-md mx-4 mt-2">

      <div className="flex items-center space-x-6">
        <div className="font-bold text-xl cursor-pointer text-[#007AEC]">BOXpad</div>

        <div className="flex space-x-4">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer text-black
                         ${active === item.name ? "bg-gray-100" : "hover:bg-gray-100"}`}
              onClick={() => setActive(item.name)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-lg">{item.icon}</div>
              <div className="font-medium">{item.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
  
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
            A
          </div>
          <span className="font-medium text-black">Amna Shahid</span>
        </div>


        <div className="text-gray-600 cursor-pointer hover:text-gray-900">
          <Cog size={20} />
        </div>
      </div>
    </nav>
  );
}