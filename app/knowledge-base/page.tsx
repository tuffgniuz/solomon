import { NextPage } from "next";
import { prisma } from "../lib/utils/prisma";
import PageLayout from "../lib/components/layout/page-layout";
import SecurityTopicList from "../lib/components/data-display/security-topic-list";

const KnowledgeBasePage: NextPage = async () => {
  const data = await prisma.securityTopic.findMany({
    include: {
      securitySections: {
        include: {
          securityControls: true,
        },
      },
    },
  });

  return (
    <PageLayout className="w-1/2 mx-auto">
      <SecurityTopicList topics={data} />
    </PageLayout>
  );
};

export default KnowledgeBasePage;
