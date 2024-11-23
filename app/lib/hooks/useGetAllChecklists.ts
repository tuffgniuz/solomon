import { useEffect, useState } from "react";
import { Checklist } from "../types/models";
import { getAllChecklists } from "../utils/indexeddb";

const useGetAllChecklists = () => {
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

  return { data, setData };
};

export default useGetAllChecklists;
