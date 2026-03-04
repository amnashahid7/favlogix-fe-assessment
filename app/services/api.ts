import { Message, User } from "../types";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data.users.slice(0, 8);
}


export async function fetchMessages(userId: number): Promise<Message[]> {
  const res = await fetch("https://dummyjson.com/comments?limit=0");
  if (!res.ok) throw new Error("Failed to fetch messages");
  const data = await res.json();

  const filteredComments = data.comments.filter(
    (c: any) => c.user.id === userId
  );

  const fillCount = 12 - filteredComments.length;
  const extra = Array.from({ length: fillCount }, () => {
    const random = data.comments[Math.floor(Math.random() * data.comments.length)];
    return random;
  });

  const all = [...filteredComments, ...extra];

  return all.map((m: any, idx: number) => ({
id: m.id ?? idx,
    body: m.body,
    sender: idx % 2 === 0 ? "user" : "system",
    time: `${10 + Math.floor(idx/2)}:${(idx * 5 % 60).toString().padStart(2, "0")}`,
  }));
}