"use client";
import { FC } from "react";
import { LuCheck } from "react-icons/lu";

const BookmarkedControlsList: FC = () => {
  const filteredTopics = topics.filter((topic) =>
    topic.securitySections.some((section) =>
      section.securityControls.some((control) =>
        bookmarkedControls.includes(control.id),
      ),
    ),
  );

  return (
    <>
      {filteredTopics.map((topic) => (
        <div key={topic.id} className="mb-10">
          <h1 className="text-xl font-bold mb-5">
            {topic.security_topic_name}
          </h1>
          {topic.securitySections.map((section) =>
            section.securityControls.some((control) =>
              bookmarkedControls.includes(control.id),
            ) ? (
              <div key={section.id}>
                <h2 className="text-lg font-semibold mb-3">
                  {section.security_section_name}
                </h2>
                <table className="w-full border border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">ID</th>
                      <th className="border p-2">Description</th>
                      <th className="border p-2">L1</th>
                      <th className="border p-2">L2</th>
                      <th className="border p-2">L3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.securityControls
                      .filter((control) =>
                        bookmarkedControls.includes(control.id),
                      )
                      .map((control) => (
                        <tr key={control.id}>
                          <td className="border p-2">{control.control_id}</td>
                          <td className="border p-2">{control.description}</td>
                          <td className="border p-2">
                            {control.level1 && <LuCheck color="#A3BE8C" />}
                          </td>
                          <td className="border p-2">
                            {control.level2 && <LuCheck color="#A3BE8C" />}
                          </td>
                          <td className="border p-2">
                            {control.level3 && <LuCheck color="#A3BE8C" />}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : null,
          )}
        </div>
      ))}
    </>
  );
};

export default BookmarkedControlsList;
