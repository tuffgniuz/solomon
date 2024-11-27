import { FC, useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { MdAdd, MdCheck, MdOutlinePlaylistAdd } from "react-icons/md";

import { SecuritySection } from "@prisma/client";
import { Checklist, SecurityControl } from "../../types/models";

import {
  addControlToChecklist,
  getControlsByChecklistId,
} from "../../utils/indexeddb";

const SecuritySectionList: FC<{
  sections: SecuritySection[];
  searchTerm: string;
  selectedChecklist: Checklist | undefined;
}> = ({ sections, searchTerm, selectedChecklist }) => {
  const [addedControls, setAddedControls] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchAddedControls = async () => {
      if (selectedChecklist) {
        try {
          const controls = await getControlsByChecklistId(selectedChecklist.id);
          setAddedControls(
            new Set(controls.map((control) => control.control_id)),
          );
        } catch (error) {
          console.error("Error fetching controls for checklist: ", error);
        }
      }
    };
    fetchAddedControls();
  }, [selectedChecklist]);

  const highlightText = (text: string, term: string) => {
    if (!term) return text;

    const parts = text.split(new RegExp(`(${term})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} className="bg-aurora-yellow text-polar-night-0">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const handleAddControl = async (control: SecurityControl) => {
    if (selectedChecklist) {
      try {
        if (!addedControls.has(control.control_id)) {
          const checklistControl: SecurityControl = {
            checklistId: selectedChecklist.id,
            control_id: control.control_id,
            description: control.description,
            level1: control.level1,
            level2: control.level2,
            level3: control.level3,
            id: control.id,
          };

          await addControlToChecklist(checklistControl);
          setAddedControls((prev) => new Set(prev).add(control.control_id));

          console.log("controlId added:", control.control_id);
        }
      } catch (error) {
        console.error("Error adding control to checklist");
      }
    } else {
      console.warn("No checklist selected");
    }
  };

  return (
    <>
      {sections.map((section) => (
        <div key={section.id} className="border border-shadow rounded-lg mb-10">
          <div className="bg-polar-night-1 border-b border-b-shadow px-2 py-4 rounded-t-lg">
            <h3 className="text-secondary mb-2 text-lg">
              {section.security_section_id} {section.security_section_name}
            </h3>
            <p className="text-frost-blue">{section.summary}</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-b-shadow">
                <th className="p-2">ID</th>
                <th className="p-2">Description</th>
                <th className="p-2">L1</th>
                <th className="p-2">L2</th>
                <th className="p-2">L3</th>
                <th className="p-2">
                  <button className="border border-aurora-green rounded-lg p-2 transition-all duration-300 ease-in-out">
                    {/* A button to bookmark all controls for this section */}
                    <MdOutlinePlaylistAdd color="#A3BE8C" size={14} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {section.securityControls.map((control: SecurityControl) => (
                <tr key={control.id} className="border-b border-b-shadow">
                  <td className="p-2 text-frost-blue">
                    {highlightText(control.control_id, searchTerm)}
                  </td>
                  <td className="p-2">
                    {highlightText(control.description, searchTerm)}
                  </td>
                  <td className="p-2">
                    {control.level1 && <LuCheck color="#A3BE8C" />}
                  </td>
                  <td className="p-2">
                    {control.level2 && <LuCheck color="#A3BE8C" />}
                  </td>
                  <td className="p-2">
                    {control.level3 && <LuCheck color="#A3BE8C" />}
                  </td>
                  <td className="p-2">
                    {addedControls.has(control.control_id) ? (
                      <button
                        className="bg-aurora-green p-2 transition-all duration-300 ease-in-out rounded-lg"
                        onClick={() =>
                          console.log("Already added to checklist")
                        }
                      >
                        <MdCheck size={14} />
                        {/*<MdBookmarkAdded color="#D8DEE9" size={18} />*/}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddControl(control)}
                        className="border border-aurora-green rounded-lg p-2 transition-all duration-300 ease-in-out"
                      >
                        <MdAdd color="#A3BE8C" size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default SecuritySectionList;
