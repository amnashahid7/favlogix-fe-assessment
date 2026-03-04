"use client";

import { useState } from "react";
import { Phase, User, Section } from "@/app/types";
import SkeletonBlock from "../Skeletons/SkeletonBlock";
import { motion } from "framer-motion";
import { Inbox, LayoutDashboardIcon, Users, ChevronDown } from "lucide-react";
import Image from "next/image";

interface Props {
  phase: Phase;
  users: User[];
  onSelectUser: (u: User) => void;
  loadingSection?: Section | null;
}

export default function Sidebar({
  phase,
  users,
  onSelectUser,
  loadingSection,
}: Props) {

  const [teamsOpen, setTeamsOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);
  const [channelsOpen, setChannelsOpen] = useState(true);

  return (
    <div className="bg-white text-black p-4 rounded-xl shadow w-64 z-40">
      
 
      <div>
        <h2 className="font-bold text-gray-700 mb-2">Inbox</h2>
        <ul className="space-y-1">
          <li className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <div className="flex items-center space-x-2">
              <Image src="/svgs/myinbox.svg" alt="Inbox" width={16} height={16} />
              <span>My Inbox</span>
            </div>
            <span className="text-gray-500">5</span>
          </li>
          <li className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <div className="flex items-center space-x-2">
               <Image src="/svgs/assign.svg" alt="Inbox" width={16} height={16} />
              <span>All</span>
            </div>
            <span className="text-gray-500">12</span>
          </li>
          <li className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <div className="flex items-center space-x-2">
               <Image src="/svgs/all.svg" alt="Inbox" width={16} height={16} />
              <span>Unassigned</span>
            </div>
            <span className="text-gray-500">3</span>
          </li>
        </ul>
      </div>

   
      <div className="mt-4">
        <button
          onClick={() => setTeamsOpen(!teamsOpen)}
          className="w-full flex justify-between items-center p-2 hover:bg-gray-100 rounded font-semibold text-gray-700"
        >
          Teams
          <ChevronDown className="w-4 h-4" />
        </button>

        {teamsOpen && (
          <ul className="mt-2 ml-4 space-y-1">
            <li className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <div className="flex items-center space-x-2">
                    <Image src="/svgs/sales.svg" alt="Inbox" width={16} height={16} />
                <span>Sales</span>
              </div>
              <span className="text-gray-500">4</span>
            </li>
            <li className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <div className="flex items-center space-x-2">
                   <Image src="/svgs/sales.svg" alt="Inbox" width={16} height={16} />
                <span>Customer Support</span>
              </div>
              <span className="text-gray-500">6</span>
            </li>
          </ul>
        )}
      </div>

  
      <div className="mt-4">
        <button
          onClick={() => setUsersOpen(!usersOpen)}
          className="w-full flex justify-between items-center p-2 hover:bg-gray-100 rounded font-semibold text-gray-700"
        >
          Users
          <ChevronDown className="w-4 h-4" />
        </button>

        {usersOpen && (
          <div className="mt-2 ml-4 space-y-1">

       

            {(phase === "skeleton" || phase === "loading") &&
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBlock key={i} />
              ))}

            {phase === "loaded" &&
              users.map((user, index) => (
                <motion.div
                  key={user.id}
                  onClick={() => onSelectUser(user)}
                  className="py-2 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 * index,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <div className="flex gap-2">
                    <Image src="/svgs/user.svg" alt="User" width={18} height={18} />
                  <span>
                      
                    {user.firstName} {user.lastName}
                  </span>
                  </div>
                  <span className="text-gray-500">{user.id}</span>
                </motion.div>
              ))}

          </div>
        )}
      </div>

    
      <div className="mt-4">
        <button
          onClick={() => setChannelsOpen(!channelsOpen)}
          className="w-full flex justify-between items-center p-2 hover:bg-gray-100 rounded font-semibold text-gray-700"
        >
          Channels
          <ChevronDown className="w-4 h-4" />
        </button>

        {channelsOpen && (
          <ul className="mt-2 ml-4 space-y-1">
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <LayoutDashboardIcon className="text-green-500 w-4 h-4" />
              <span>Fit4Life</span>
            </li>
          </ul>
        )}
      </div>

    </div>
  );
}