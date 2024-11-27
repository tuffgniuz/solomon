"use client";
import { FC, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import CreateChecklistForm from "./create-checklist-form";

const CreateChecklist: FC<{ className?: string | undefined }> = ({
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-aurora-purple px-4 py-2 rounded-lg"
      >
        <MdAddCircleOutline size={18} />
        Create new checklist
      </button>

      <CreateChecklistForm show={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default CreateChecklist;
