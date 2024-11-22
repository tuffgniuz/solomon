import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { SecurityTopic } from "@prisma/client";

interface UseSecurityControlsSearchProps {
  topics: SecurityTopic[];
  searchTerm: string;
}

const useSecurityControlsSearch = ({
  topics,
  searchTerm,
}: UseSecurityControlsSearchProps) => {
  const [filteredTopics, setFilteredTopics] = useState<SecurityTopic[]>(topics);

  useEffect(() => {
    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.toLowerCase().replace(/^v/i, "");
      const controlsWithPath = topics.flatMap((topic) =>
        topic.securitySections.flatMap((section) =>
          section.securityControls.map((control) => ({
            ...control,
            topicId: topic.id,
            sectionId: section.id,
            topicName: topic.security_topic_name,
            sectionName: section.security_section_name,
          })),
        ),
      );

      const synonyms = {
        "sql injection": ["database query injection", "sql vulnerability"],
      };
      const expandedSearchTerms = synonyms[normalizedSearchTerm] || [
        normalizedSearchTerm,
      ];

      const expandedRegex = new RegExp(expandedSearchTerms.join("|"), "i");

      const exactPhraseMatches = controlsWithPath.filter((control) =>
        expandedRegex.test(control.description || ""),
      );

      let searchResults = [];

      if (exactPhraseMatches.length > 0) {
        searchResults = exactPhraseMatches;
      } else {
        const fuse = new Fuse(controlsWithPath, {
          keys: [
            { name: "description", weight: 0.8 },
            { name: "topicName", weight: 0.1 },
            { name: "sectionName", weight: 0.1 },
          ],
          threshold: 0.2,
          minMatchCharLength: 3,
          distance: 30,
          ignoreLocation: true,
          isCaseSensitive: false,
        });

        searchResults = fuse
          .search(normalizedSearchTerm)
          .map((res) => res.item);
      }

      const newFilteredTopics = topics
        .map((topic) => {
          const newSections = topic.securitySections
            .map((section) => {
              const matchedControls = section.securityControls.filter(
                (control) =>
                  searchResults.some((result) => result.id === control.id),
              );

              return {
                ...section,
                securityControls: matchedControls,
              };
            })
            .filter((section) => section.securityControls.length > 0);

          return {
            ...topic,
            securitySections: newSections,
          };
        })
        .filter((topic) => topic.securitySections.length > 0);

      setFilteredTopics(newFilteredTopics);
    } else {
      setFilteredTopics(topics);
    }
  }, [searchTerm, topics]);

  return filteredTopics;
};

export default useSecurityControlsSearch;
