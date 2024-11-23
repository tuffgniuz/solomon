"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Checklist } from "../../types/models";
import { GoChevronDown } from "react-icons/go";

const ChecklistPicker: FC<{
  checklists: Checklist[] | undefined;
  selectedChecklist: Checklist | undefined;
  setSelectedChecklist: Dispatch<SetStateAction<Checklist | undefined>>;
}> = ({ checklists, selectedChecklist, setSelectedChecklist }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 bg-shadow text-frost-blue px-4 py-2 rounded-lg mb-10"
      >
        {selectedChecklist ? selectedChecklist.name : "Choose checklist"}
        <GoChevronDown color="#BFC9DB" size={14} />
      </button>
      {isOpen && (
        <div className="absolute -mt-8 z-20 w-96 bg-shadow rounded-lg shadow-lg drop-shadow-xl">
          <ul className="flex flex-col max-h-60 overflow-y-auto">
            {checklists?.map((checklist) => (
              <li
                key={checklist.id}
                onClick={() => {
                  setSelectedChecklist(checklist);
                  setIsOpen(false);
                }}
                className="text-frost-blue p-3 cursor-pointer"
              >
                <div className="hover:bg-polar-night-1 flex items-center justify-between p-1 -m-1 rounded-lg transition-all duration-300 ">
                  <span className="ease-in-out truncate w-3/4">
                    {checklist.name}
                  </span>
                  <span className="border border-aurora-green text-aurora-green px-3 py-1 rounded-lg text-xs">
                    {checklist?.level == "level1" && "Level 1"}
                    {checklist?.level == "level2" && "Level 2"}
                    {checklist?.level == "level3" && "Level 3"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ChecklistPicker;
