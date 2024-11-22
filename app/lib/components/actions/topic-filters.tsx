import { SecurityTopic } from "@prisma/client";
import { FC } from "react";

const TopicFilters: FC<{
  topics: SecurityTopic[];
  onFilter: (topicId: string) => void;
  activeFilters: string[];
}> = ({ topics, onFilter, activeFilters }) => {
  return (
    <>
      {/* buttons that should filter the asvs list based on the selected topic */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onFilter(topic.security_topic_id)}
            className={`bg-shadow px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${activeFilters && activeFilters.includes(topic.security_topic_id) ? "outline outline-1 outline-aurora-purple" : "outline-none"}`}
          >
            {topic.security_topic_id} {topic.security_topic_name}
          </button>
        ))}
      </div>
    </>
  );
};

export default TopicFilters;
