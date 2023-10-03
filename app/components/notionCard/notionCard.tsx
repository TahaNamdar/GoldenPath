export default function NotionCard({
  cardName,
  children,
}: {
  cardName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-[34rem] mr-[2.2rem] pl-[2.4rem] h-[29.9rem] mb-[4.7rem] bg-white rounded-[1.5rem] list-none pb-[2.4rem]">
      <input
        value={cardName}
        className="text-3xl font-medium pt-[1.5rem] pl-[2.4rem] mb-[1.6rem] border-none"
      />
      {children}
    </div>
  );
}
