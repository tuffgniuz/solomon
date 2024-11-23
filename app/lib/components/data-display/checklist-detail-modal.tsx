import { FC } from "react";
import { Checklist } from "../../types/models";
import BaseModal from "./base-modal";
import { VscExport } from "react-icons/vsc";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { GrExpand } from "react-icons/gr";
import { LuExpand } from "react-icons/lu";

const ChecklistDetailModal: FC<{
  show: boolean;
  onClose: () => void;
  checklist: Checklist | undefined;
}> = ({ show, onClose, checklist }) => {
  return (
    <BaseModal
      show={show}
      onClose={onClose}
      position="side-r"
      className="w-1/2 p-10"
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
      <div className="mb-5">
        <span className="border border-aurora-green text-aurora-green px-4 py-1 rounded-lg">
          {checklist?.level == "level1" && "Level 1"}
          {checklist?.level == "level2" && "Level 2"}
          {checklist?.level == "level3" && "Level 3"}
        </span>
      </div>
      {/* render component that shows security controls for this checklist */}
    </BaseModal>
  );
};

export default ChecklistDetailModal;
