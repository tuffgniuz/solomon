import { FC } from "react";
import Link from "next/link";
import { PiBrainLight } from "react-icons/pi";
import { MdChecklist } from "react-icons/md";

const Navbar: FC = () => {
  return (
    <div className="flex items-center justify-between border-b border-b-shadow h-16 px-4 mb-10">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl">
          Solomon
        </Link>
        <span className="bg-shadow px-2 py-1 rounded-xl text-xs">
          asvs v4.0.3
        </span>
      </div>
      <nav>
        <ul className="flex items-center gap-5">
          <li>
            <Link href="/knowledge-base" className="flex items-center gap-2">
              <PiBrainLight /> Knowledge Base
            </Link>
          </li>
          <li>
            <Link href="/checklists" className="flex items-center gap-2">
              <MdChecklist /> Checklists{" "}
              <span className="bg-aurora-purple rounded-full h-6 w-6 flex items-center justify-center">
                0
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
