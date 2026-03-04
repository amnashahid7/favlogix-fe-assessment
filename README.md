🚀 Tech Stack

Next.js (App Router)

TypeScript

React

Framer Motion (animations)

Modular Component Architecture

Typed API Layer

📂 Project Structure & File Responsibilities
app/
│
├── layout.tsx
├── page.tsx
├── globals.css
│
├── components/
├── hooks/
├── services/
└── types/

🏗 Root Files
layout.tsx

Root layout wrapper for the entire application

Defines global layout structure

Loads global styles and persistent UI (if any)

page.tsx

Main entry page

Renders the dashboard layout and main sections

globals.css

Global styling

Base resets and shared styles

🧩 Components
📂 components/layout/
DashdoardLayout.tsx

Main dashboard structure

Wraps:

Chat Sidebar

Chat Section

Details Panel

Navbar.tsx

Top navigation bar

Contains header actions / branding

📂 components/dashboardSections/
ChatSidebar.tsx

Left panel

Displays inbox conversation list

InboxList.tsx

Renders list of chat previews

Likely maps conversation data

ChatSection.tsx

Center chat window

Displays active conversation messages

Handles message rendering & alignment logic

DetailsPanel.tsx

Right-side contextual panel

Shows selected user/chat details

Additional metadata display

📂 components/sections/ (Reusable UI blocks)
SectionHeader.tsx

Standard section title component

DataRow.tsx

Displays label-value pairs

InfoRow.tsx

Informational structured row

TagBadge.tsx

Small badge/tag UI component

📂 components/Skeletons/
SkeletonBlock.tsx

Loading placeholder component

Used while data is fetching

📂 components/honeycomb/
HoneycombLoader.tsx

Custom animated loading indicator

🔌 Services Layer
📂 services/api.ts

Handles API logic

Manages chat/message fetching

Contains typed response mapping

🔌 API Service Logic
services/api.ts

This file handles fetching and transforming dummy data to simulate a chat system.

fetchUsers()

Fetches users from https://dummyjson.com/users

Returns only the first 8 users

Used to populate the chat sidebar list

fetchMessages(userId: number)

Fetches all comments from https://dummyjson.com/comments

Filters comments based on selected userId

Ensures a minimum of 12 messages per conversation (fills with random comments if needed)

Transforms API response into the app’s Message type

Alternates sender (user / system) to simulate real chat

Generates mock timestamps for UI display

Purpose

This API layer simulates a real chat backend using public dummy data, allowing UI development without needing a custom server.


🧠 Types
📂 types/index.ts

Centralized TypeScript types

Defines:

Message

Section

Phase

Chat-related interfaces

Improves:

Type safety

Scalability

Maintainability