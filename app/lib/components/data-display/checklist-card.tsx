"use client";
import { FC, useEffect, useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { Checklist, SecurityControl } from "../../types/models";
import ChecklistDetailModal from "./checklist-detail-modal";
import { getControlsByChecklistId } from "../../utils/indexeddb";

const ChecklistCard: FC<{ checklist: Checklist | undefined }> = ({
  checklist,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checklistControls, setChecklistControls] = useState<
    SecurityControl[] | undefined
  >([]);

  useEffect(() => {
    (async () => {
      const controls = await getControlsByChecklistId(checklist?.id);
      setChecklistControls(controls);
    })();
  }, []);

  return (
    <>
      <div
        key={checklist?.id}
        className="w-1/5 bg-polar-night-1 p-4 rounded-lg hover:cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="font-semibold mb-4">{checklist?.name}</h3>
        <p className="text-frost-blue mb-4">{checklist?.description}</p>
        <div className="flex checklists-center justify-between">
          <div className="flex checklists-center gap-2">
            <GoShieldCheck color="#BFC9DB" size={18} />{" "}
            <span className="bg-frost-blue text-polar-night-0 rounded-full h-5 w-5 flex checklists-center justify-center">
              {checklistControls?.length}
            </span>
          </div>

          <span className="border border-aurora-green text-aurora-green px-4 py-1 rounded-lg">
            {checklist?.level == "level1" && "Level 1"}
            {checklist?.level == "level2" && "Level 2"}
            {checklist?.level == "level3" && "Level 3"}
          </span>
        </div>
      </div>

      <ChecklistDetailModal
        show={isOpen}
        onClose={() => setIsOpen(false)}
        checklist={checklist}
        checklistControls={checklistControls}
      />
    </>
  );
};

export default ChecklistCard;
