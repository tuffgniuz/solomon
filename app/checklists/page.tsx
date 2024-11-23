"use client";
import { useEffect, useState } from "react";
import { NextPage } from "next";

import { Checklist } from "../lib/types/models";
import { getAllChecklists } from "../lib/utils/indexeddb";

import PageLayout from "../lib/components/layout/page-layout";
import CreateChecklist from "../lib/components/forms/create-checklist";
import ChecklistCard from "../lib/components/data-display/checklist-card";

const ChecklistsPage: NextPage = () => {
  const [data, setData] = useState<Checklist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checklists = await getAllChecklists();
        setData(checklists);
      } catch (error) {
        console.error("Error fetching checklists: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <PageLayout className="px-4">
      <CreateChecklist className="mb-10" />
      <div className="flex gap-5">
        {data?.map((checklist) => (
          <ChecklistCard key={checklist.id} checklist={checklist} />
        ))}
      </div>
    </PageLayout>
  );
};

export default ChecklistsPage;
