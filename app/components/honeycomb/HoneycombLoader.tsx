"use client";

import { fetchUsers, fetchMessages } from "@/app/services/api";
import { User, Message, Section } from "@/app/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phase } from "@/app/types";
import { useState } from "react";

interface Props {
  phase: Phase;
  setPhase: (p: Phase) => void;
  setUsers: (u: User[]) => void;
  setMessages: (m: Message[]) => void;
  setSelectedUser: (u: User) => void;
  onSectionChange?: (section: Section | null) => void;
}

export default function HoneycombLoader({
  phase,
  setPhase,
  setUsers,
  setMessages,
  setSelectedUser,
  onSectionChange,
}: Props) {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const sections = [
    {
      id: "inbox" as Section,
      src: "/images/left1.png",
      position: "absolute -right-104 top-50",
    },
    {
      id: "chat" as Section,
      src: "/images/left2.png",
      position: "absolute -right-35 top-16",
    },
    {
      id: "details" as Section,
      src: "/images/left3.png",
      position: "absolute -right-35 top-110",
    },
  ];
  const sections2 = [
    {
      id: "inbox" as Section,
      src: "/images/right1.png",
      position: "absolute -left-104 top-50",
    },
    {
      id: "chat" as Section,
      src: "/images/right2.png",
      position: "absolute -left-35 top-16",
    },
    {
      id: "details" as Section,
      src: "/images/right3.png",
      position: "absolute -left-35 top-110",
    },
  ];

  const handleStart = async (section: Section) => {
    setSelectedSection(section);
    if (onSectionChange) onSectionChange(section);
    setPhase("loading");

    const users = await fetchUsers();

    setUsers(users);

    if (users.length > 0) {
      const firstUser = users[0];
      setSelectedUser(firstUser);

      const messages = await fetchMessages(firstUser.id);
      setMessages(messages);
    }
    setSelectedUser(users[0]);

    setPhase("animating");

    setTimeout(() => {
      setPhase("loaded");
      if (onSectionChange) onSectionChange(null);
    }, 800);
  };

  if (phase === "loaded") return null;

  const isFetching = phase === "loading" || phase === "animating";

  const renderImageTile = (item: typeof sections[number]) => {
    const isSelected = selectedSection === item.id;

    const moveX = isSelected
      ? item.id === "inbox"
        ? -300
        : item.id === "details"
          ? 300
          : 0
      : 0;

    return (
      <motion.div
        key={item.id}
        className={`${item.position} cursor-pointer`}
        whileHover={
          phase === "skeleton"
            ? { scale: 1.05, y: -4 }
            : undefined
        }
        onClick={
          phase === "skeleton"
            ? () => handleStart(item.id)
            : undefined
        }
        animate={
          phase === "animating" && isSelected
            ? { x: moveX, y: -40, scale: 0.4, opacity: 0 }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.8 }}
      >
        <Image
          src={item.src}
          alt={item.id}
          width={120}
          height={120}
          className="object-contain animate-[float_4s_ease-in-out_infinite]"
        />
      </motion.div>
    );
  };

  return (
    <>

      <div className=" relative h-full p-4 bg-[url('/images/left.png'),url('/images/right.png'),linear-gradient(90deg,#0b0f1a_0%,#0f1c2f_25%,#102a4c_50%,#0d3c78_75%,#155ea8_100%)] bg-no-repeat bg-[position:left_center,right_center,center] bg-[size:auto,auto,cover]">




        <div className="container-fluid border-white/10 border-2 rounded-lg h-full mx-auto bg-[rgba(255,255,255,0.04)]">

          <div className="relative flex flex-col items-center">

            <div className="relative flex items-center justify-center">


              {sections.map((item) => renderImageTile(item))}




              <div className="relative w-[350px] h-[350px]">
                <Image
                  src="/images/circle.gif"
                  alt="animation"
                  fill
                  className="object-contain mix-blend-screen"
                />
              </div>


              {sections2.map((item) => renderImageTile(item))}

            </div>



            <h2 className=" text-4xl font-bold">
              Extracting Information...
            </h2>
            <p className="text-lg mt-4">
              We are extracting information from the above honey combs to your system
            </p>
          </div>

          <div className="relative mt-32 w-[80%]">

          </div>


        </div>
      </div>
    </>
  );
}