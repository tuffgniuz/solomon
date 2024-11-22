import { FC } from "react";
import { MdBookmarkAdd, MdBookmarks } from "react-icons/md";
import { LuCheck } from "react-icons/lu";
import { SecuritySection } from "@prisma/client";

const SecuritySectionList: FC<{
  sections: SecuritySection[];
  searchTerm: string;
}> = ({ sections, searchTerm }) => {
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
                    <MdBookmarks color="#A3BE8C" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {section.securityControls.map((control) => (
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
                    <button className="border border-aurora-green rounded-lg p-2 transition-all duration-300 ease-in-out">
                      <MdBookmarkAdd color="#A3BE8C" />
                    </button>
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