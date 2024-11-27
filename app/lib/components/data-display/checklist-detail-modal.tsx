"use client";
import { FC, useState } from "react";
import { VscExport } from "react-icons/vsc";
import { MdCheck, MdClose, MdDeleteForever } from "react-icons/md";
import { LuExpand } from "react-icons/lu";

import { Checklist, SecurityControl } from "../../types/models";
import { deleteControl } from "../../utils/indexeddb";

import BaseModal from "./base-modal";

const ChecklistDetailModal: FC<{
  show: boolean;
  onClose: () => void;
  checklist: Checklist | undefined;
  checklistControls: SecurityControl[] | undefined;
}> = ({ show, onClose, checklist, checklistControls }) => {
  const [localChecklistControls, setChecklistControls] = useState<
    SecurityControl[] | undefined
  >(checklistControls);

  const handleDeleteControl = async (controlId: number) => {
    try {
      await deleteControl(controlId);

      if (checklistControls) {
        setChecklistControls((prevControls) =>
          prevControls.filter((control) => control.id !== controlId),
        );
      }

      console.log("Control deleted:", controlId);
    } catch (error) {
      console.error("Error deleting control:", error);
    }
  };

  return (
    <BaseModal
      show={show}
      onClose={onClose}
      position="side-r"
      className="w-1/2 p-10 overflow-scroll"
    >
      <div className="flex justify-end gap-2 mb-2">
        <button className="bg-aurora-purple flex items-center gap-2 px-4 py-2 rounded-lg">
          <VscExport size={18} /> Export
        </button>
        <button className="hover:bg-polar-night-1 transition-all duration-300 ease-in-out rounded-lg p-2">
          <LuExpand color="#BFC9DB" />
        </button>
        <button
          onClick={onClose}
          className="hover:bg-polar-night-1 transition-all duration-300 ease-in-out rounded-lg p-2"
        >
          <MdClose color="#BFC9DB" size={18} />
        </button>
      </div>
      <h1 className="font-semibold text-2xl mb-5">{checklist?.name}</h1>
      <p className="text-frost-blue mb-7">{checklist?.description}</p>
      <div className="mb-7">
        <span className="border border-aurora-green text-aurora-green px-4 py-1 rounded-lg">
          {checklist?.level === "level1" && "Level 1"}
          {checklist?.level === "level2" && "Level 2"}
          {checklist?.level === "level3" && "Level 3"}
        </span>
      </div>
      {/* render component that shows security controls for this checklist */}
      <div className="flex flex-col gap-2">
        {checklistControls?.map((control) => (
          <div
            key={control.control_id}
            className="bg-polar-night-1 p-4 rounded-lg"
          >
            <div className="flex item-center justify-between mb-3">
              <h6 className="text-xs text-frost-blue">{control.control_id}</h6>
              {/* TODO: show delete button only when hovering over the card */}
              <button
                onClick={() => handleDeleteControl(control.id)}
                className="hover:bg-polar-night-0 p-1 -m-1 rounded-lg transition-all duration-300 ease-in-out"
              >
                <MdDeleteForever color="#BF616A" />
              </button>
            </div>
            <p className="mb-3">{control.description}</p>
            <div className="flex items-center gap-2">
              {control.level1 && (
                <span className="flex items-center gap-2 text-xs">
                  <MdCheck /> L1
                </span>
              )}
              {control.level2 && (
                <span className="flex items-center gap-2 text-xs">
                  <MdCheck /> L2
                </span>
              )}
              {control.level3 && (
                <span className="flex items-center gap-2 text-xs">
                  <MdCheck /> L3
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </BaseModal>
  );
};

export default ChecklistDetailModal;
