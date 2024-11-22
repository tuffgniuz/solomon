"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const KnowledgeBaseSearch: FC<{
  onSearch: (query: string) => void;
}> = ({ onSearch }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsVisible((prev) => !prev);
      }
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-10">
      {isVisible ? (
        <div className="relative">
          <input
            autoFocus
            placeholder="Search knowledge base..."
            className="bg-polar-night-1 border-none outline-none focus:outline focus:outline-1 focus:outline-aurora-purple transition-all duration-300 ease-in-out w-full rounded-lg p-4"
            onBlur={() => setIsVisible(false)}
            onChange={handleSearch}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-polar-night-1 text-frost-blue outline-none hover:outline hover:outline-1 hover:outline-aurora-purple transition-all duration-300 ease-in-out flex items-center justify-between p-4 rounded-lg w-full"
        >
          <span className="flex items-center gap-2">
            <CiSearch size={20} /> Search knowledge base...
          </span>
          <span>Ctrl+K</span>
        </button>
      )}
    </div>
  );
};

export default KnowledgeBaseSearch;
