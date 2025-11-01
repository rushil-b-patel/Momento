import Card from "@/components/Card";

export default function Home() {
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
  ];

  return (
    <main className="px-4 sm:px-6 md:px-10 py-10 max-w-3xl mx-auto flex flex-col gap-10">
      {posts.map((post, i) => (
        <Card key={i} {...post} />
      ))}
    </main>
  );
}
