"use client";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Checklist, SecurityControl } from "../../types/models";
import { GoChevronDown } from "react-icons/go";
import { LuPlusCircle } from "react-icons/lu";

import { getControlsByChecklistId } from "../../utils/indexeddb";

const ChecklistPicker: FC<{
  checklists: Checklist[] | undefined;
  selectedChecklist: Checklist | undefined;
  setSelectedChecklist: Dispatch<SetStateAction<Checklist | undefined>>;
}> = ({ checklists, selectedChecklist, setSelectedChecklist }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checklistControls, setChecklistControls] = useState<
    SecurityControl[] | undefined
  >([]);

  console.log("Checklist controls length:", checklistControls?.length);

  useEffect(() => {
    (async () => {
      const controls = await getControlsByChecklistId(selectedChecklist?.id);
      setChecklistControls(controls);
    })();
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 bg-shadow text-frost-blue px-4 py-2 rounded-lg mb-10"
      >
        {selectedChecklist ? (
          <>
            {selectedChecklist.name}{" "}
            <span className="w-4 h-4 text-xs bg-snowstorm-0 text-polar-night-0 rounded-lg">
              {checklistControls?.length}
            </span>
          </>
        ) : (
          "Choose checklist"
        )}
        <GoChevronDown color="#BFC9DB" size={14} />
      </button>
      {isOpen && (
        <div className="absolute -mt-8 z-20 w-96 bg-shadow rounded-lg shadow-lg drop-shadow-xl">
          {/* Create Checklist Button */}
          <div className="border-b border-b-polar-night-0 p-3">
            <button className="flex items-center justify-center gap-2 bg-aurora-purple px-4 py-2 rounded-lg w-full">
              <LuPlusCircle size={16} />
              Create checklist
            </button>
          </div>
          {/* List of checklists */}
          {checklists!.length > 0 ? (
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
                  <div className="hover:bg-polar-night-1 flex items-center justify-between px-2 py-2 -m-1 rounded-lg transition-all duration-300 ">
                    <span className="ease-in-out truncate w-3/4">
                      {checklist.name}
                    </span>
                    <span className="text-center w-4 h-4 text-xs bg-snowstorm-0 text-polar-night-0 rounded-lg">
                      {checklistControls?.length}
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
          ) : (
            <p className="text-frost-blue text-center p-3">
              You haven't created any checklists
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ChecklistPicker;
