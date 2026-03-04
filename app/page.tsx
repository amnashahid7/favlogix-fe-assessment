"use client";

import { useState } from "react";
import ChatSection from "./components/dashboardSections/ChatSection";
import ChatSidebar from "./components/dashboardSections/ChatSidebar";
import DetailsPanel from "./components/dashboardSections/DetailsPanel";
import InboxList from "./components/dashboardSections/InboxList";
import HoneycombLoader from "./components/honeycomb/HoneycombLoader";
import DashboardLayout from "./components/layout/DashdoardLayout";
import { fetchMessages } from "./services/api";
import { Message, Phase, Section, User } from "./types";


export default function DashboardPage() {
  const [phase, setPhase] = useState<Phase>("skeleton");
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingSection, setLoadingSection] = useState<Section | null>(null);

const handleSelectUser = async (user: User) => {
  setSelectedUser(user);
  setLoadingSection("chat");

  const userMessages = await fetchMessages(user.id);
  setMessages(userMessages);

  setLoadingSection(null);
};
  return (


    <div className="min-h-screen flex flex-col bg-gray-50">

      {phase !== "loaded" &&
        <div className="h-[70vh]">
        <HoneycombLoader
          phase={phase}
          setPhase={setPhase}
          setUsers={setUsers}
          setMessages={setMessages}
          setSelectedUser={setSelectedUser}
          onSectionChange={setLoadingSection}
        />
        </div>
      }

      {(phase === "skeleton" || phase === "loading") && (
            <div className="h-[30vh]">
        <DashboardLayout phase={phase} >
          <InboxList phase={phase} users={users} onSelectUser={setSelectedUser} loadingSection={loadingSection} />
          <ChatSidebar phase={phase} />
          <ChatSection phase={phase} messages={messages} loadingSection={loadingSection} selectedUser={selectedUser}/>
          <DetailsPanel phase={phase} user={selectedUser} loadingSection={loadingSection} />
        </DashboardLayout>
        </div>
      )}


      {phase === "loaded" && (
        <DashboardLayout phase={phase}>
          <InboxList phase={phase} users={users} onSelectUser={handleSelectUser} loadingSection={loadingSection} />
          <ChatSidebar phase={phase} />
          <ChatSection phase={phase} messages={messages} loadingSection={loadingSection}  selectedUser={selectedUser} />
          <DetailsPanel phase={phase} user={selectedUser} loadingSection={loadingSection} />
        </DashboardLayout>
      )}
    </div>


  );
}