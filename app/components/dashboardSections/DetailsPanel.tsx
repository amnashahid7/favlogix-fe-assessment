"use client";

import { User, Section, Phase } from "@/app/types";
import SkeletonBlock from "../Skeletons/SkeletonBlock";
import { motion } from "framer-motion";
import {
  Users,
  User as UserIcon,
  Plus,
  MessageCircle,
} from "lucide-react";
import { DataRow } from "../sections/DataRow";
import { InfoRow } from "../sections/InfoRow";
import { SectionHeader } from "../sections/SectionHeader";
import { TagBadge } from "../sections/TagBadge";

export default function DetailsPanel({
  phase,
  user,
  loadingSection,
}: {
  phase: Phase;
  user: User | null;
  loadingSection?: Section | null;
}) {
  const isSectionLoading =
    (phase === "skeleton" || phase === "loading") &&
    loadingSection === "details";

  return (
    <div
      className={`bg-white p-4 rounded-xl shadow text-black w-full max-w-sm z-50 ${
        isSectionLoading ? "opacity-50" : ""
      }`}
    >
    
      {(phase === "skeleton" || phase === "loading") && (
        <div className="space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonBlock key={i} />
          ))}
        </div>
      )}


      {phase === "loaded" && user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
       
          <h2 className="text-lg font-semibold">Details</h2>

      
          <SectionHeader title="Chat Data" />
          <div className="space-y-3 text-sm">
            <InfoRow
              icon={<UserIcon size={16} />}
              label="Assignee"
              value="James West"
            />
            <InfoRow
              icon={<Users size={16} />}
              label="Team"
              value="Sales Team"
            />
          </div>

       
          <SectionHeader title="Contact Data" />
          <div className="space-y-2 text-sm">
            <DataRow label="First Name" value={user.firstName} />
            <DataRow label="Last Name" value={user.lastName} />
            <DataRow label="Phone number" value="+1 (312) 555-0134" />
            <DataRow label="Email" value={user.email} />
            <p className="text-sm text-blue-600 cursor-pointer">See all</p>
          </div>

      
          <SectionHeader title="Contact Labels" />
          <div className="flex flex-wrap gap-2">
            <TagBadge text="Closed Won" />
            <TagBadge text="Chicago" />
            <button className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100">
              <Plus size={16} />
            </button>
          </div>

      
          <SectionHeader title="Notes" />
          <div className="space-y-2">
            <div className="bg-yellow-200 rounded-lg px-3 py-2 text-sm text-gray-700">
              Add a note
            </div>
            <div className="bg-yellow-200 rounded-lg px-3 py-2 text-sm">
              Strong potential for future upgrades
            </div>
          </div>

       
          <SectionHeader title="Other Chats" />
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-pink-500" />
              <div>
                <p className="font-medium">Fit4Life</p>
                <p className="text-gray-500 text-xs">On my way!</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">08/08/25</span>
          </div>
        </motion.div>
      )}

      
      {phase === "loaded" && !user && (
        <div className="text-gray-400 text-sm">
          Select a user to see details
        </div>
      )}
    </div>
  );
}