"use client";
import { FC, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import { Checklist } from "../../types/models";
import { addChecklist } from "../../utils/indexeddb";

import BaseModal from "../data-display/base-modal";

const CreateChecklist: FC<{ className?: string | undefined }> = ({
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [level, setLevel] = useState<"level1" | "level2" | "level3">("level1");

  const handleSave = async () => {
    try {
      const newChecklist: Checklist = {
        id: Date.now(),
        name,
        description,
        level,
        created_at: new Date().toISOString(),
      };
      await addChecklist(newChecklist);
      setName("");
      setDescription("");
      setLevel("level1");
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding checklist: ", error);
    }
  };

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-aurora-purple px-4 py-2 rounded-lg"
      >
        <MdAddCircleOutline size={18} />
        Create new checklist
      </button>
      <BaseModal
        show={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-1/4 p-4"
      >
        <h1 className="text-lg font-semibold mb-5">Create checklist</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-frost-blue">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Checklist name..."
              className="
                  bg-polar-night-1 
                  border-none 
                  outline-polar-night-1 focus:outline focus:outline-1 focus:outline-aurora-purple 
                  transition-all duration-300 ease-in-out
                  rounded-lg 
                  w-full
                  p-2
                "
            />
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-frost-blue">Description</label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              className="
                  bg-polar-night-1 
                  border-none 
                  outline-polar-night-1 focus:outline focus:outline-1 focus:outline-aurora-purple 
                  transition-all duration-300 ease-in-out
                  rounded-lg 
                  w-full
                  p-2
                "
            />
          </div>
          <div className="flex gap-2 mb-5">
            <select
              name="level"
              value={level}
              onChange={(e) =>
                setLevel(e.target.value as "level1" | "level2" | "level3")
              }
              className="bg-polar-night-1 px-4 py-2 rounded-lg"
            >
              <option value="level1">Level 1</option>
              <option value="level2">Level 2</option>
              <option value="level3">Level 3</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-aurora-purple px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </BaseModal>
    </div>
  );
};

export default CreateChecklist;
