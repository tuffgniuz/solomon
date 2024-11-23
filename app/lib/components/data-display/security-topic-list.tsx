"use client";
import { FC, useState } from "react";
import { MdClose, MdOutlineInfo } from "react-icons/md";

import { SecurityTopicWithSections } from "../../types/prisma-types";
import { Checklist } from "../../types/models";

import useSecurityControlsSearch from "../../hooks/useSecurityControlSearch";
import useGetAllChecklists from "../../hooks/useGetAllChecklists";

import TopicFilters from "../actions/topic-filters";
import KnowledgeBaseSearch from "../data-input/knowledge-base-search.tsx";
import SecuritySectionList from "./security-section-list";
import ChecklistPicker from "../actions/checklist-picker";

const SecurityTopicList: FC<{ topics: SecurityTopicWithSections[] }> = ({
  topics,
}) => {
  const [activeFilters, setActiveFilters] = useState<string[] | undefined>(
    undefined,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: checklists } = useGetAllChecklists();
  const [selectedChecklist, setSelectedChecklist] = useState<
    Checklist | undefined
  >();

  const searchedTopics = useSecurityControlsSearch({ topics, searchTerm });

  const filteredTopics = searchedTopics.filter((topic) => {
    if (!activeFilters || activeFilters.length === 0) {
      return true;
    }
    return activeFilters.includes(topic.security_topic_id);
  });

  const handleFilter = (topicId: string) => {
    setActiveFilters((prevFilters) => {
      if (prevFilters?.includes(topicId)) {
        const newFilters = prevFilters.filter((id) => id !== topicId);
        return newFilters;
      } else {
        const newFilters = prevFilters ? [...prevFilters, topicId] : [topicId];
        return newFilters;
      }
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <>
      <ChecklistPicker
        checklists={checklists}
        selectedChecklist={selectedChecklist}
        setSelectedChecklist={setSelectedChecklist}
      />

      <KnowledgeBaseSearch onSearch={handleSearch} />

      {searchTerm && (
        <div className="flex items-center gap-2 mb-10">
          <div className="flex items-center bg-polar-night-2 text-frost-blue px-4 py-2 rounded-lg">
            <span>{searchTerm}</span>
            <button onClick={handleClearSearchTerm} className="ml-2">
              <MdClose size={20} />
            </button>
          </div>
        </div>
      )}

      <TopicFilters
        topics={topics}
        onFilter={handleFilter}
        activeFilters={activeFilters}
      />

      {filteredTopics.length > 0 ? (
        filteredTopics.map((topic) => (
          <div key={topic.id}>
            <div className="my-10">
              {/* SECURITY TOPIC TITLE */}
              <h1 className="text-aurora-purple font-semibold text-xl mb-5">
                {topic.security_topic_id} {topic.security_topic_name}
              </h1>
              {/* SECURITY TOPIC SUMMARY */}
              <div className="flex items-center gap-2 mb-5">
                <p>{topic.summary}</p>
                <button>
                  <MdOutlineInfo size={18} color="#88C0D0" />
                </button>
              </div>
            </div>

            <SecuritySectionList
              selectedChecklist={selectedChecklist}
              sections={topic.securitySections}
              searchTerm={searchTerm}
            />
          </div>
        ))
      ) : (
        <div className="my-10">
          <p className="text-center">
            The threat radar is clear... Maybe refine your search and see what
            surfaces?
          </p>
        </div>
      )}
    </>
  );
};

export default SecurityTopicList;
