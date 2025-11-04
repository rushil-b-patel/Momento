import Feed from "@/components/feed/Feed";

export default async function Home() {
  // In production, fetch from your backend:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { cache: "no-store" });
  // const posts = await res.json();

  const posts = [
    {
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      description: "A calm morning over the lake.",
      location: "Lake Tahoe",
      date: "2023-09-10",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      description: "Golden sands under a pink sky.",
      location: "Goa Beach",
      date: "2024-03-18",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
      description: "Still waters, soft breeze.",
      location: "Hampi",
      date: "2024-12-12",
    },
  ];

  return (
    <main>
      <Feed posts={posts} />
    </main>
  );
}
