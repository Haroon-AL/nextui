export default function Button({
  onClick,
  children,
  type = "button",
}: Readonly<{
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}>) {
  return (
    <button
      type={type} 
      onClick={onClick}
      className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-2 rounded font-medium px-2"
    >
      {children}
    </button>
  );
}
