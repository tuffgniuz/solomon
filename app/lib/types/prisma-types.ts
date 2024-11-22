import {
  SecurityControl,
  SecuritySection,
  SecurityTopic,
} from "@prisma/client";

export type SecurityTopicWithSections = SecurityTopic & {
  securitySections: (SecuritySection & {
    securityControls: SecurityControl[];
  })[];
};

export type SecuritySectionWithControls = SecuritySection & {
  securityControls: SecurityControl[];
};
