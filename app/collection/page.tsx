import { NextPage } from "next";

import { prisma } from "../lib/utils/prisma";

import PageLayout from "../lib/components/layout/page-layout";
import BookmarkedControlsList from "../lib/components/data-display/bookmarked-controls-list";

const CollectionPage: NextPage = async () => {
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
      <div className="flex items-center justify-end">
        <button className="bg-aurora-purple px-4 py-2 rounded-lg">
          Export to markdown
        </button>
      </div>
      <BookmarkedControlsList topics={data} />
    </PageLayout>
  );
};

export default CollectionPage;
