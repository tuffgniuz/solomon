import { useEffect, useState } from "react";
import { getControlsByChecklistId } from "../utils/indexeddb";
import { Checklist, SecurityControl } from "../types/models";

const useGetControlsForChecklist = (checklist: Checklist | undefined) => {
  const [checklistControls, setChecklistControls] = useState<
    SecurityControl[] | undefined
  >([]);

  useEffect(() => {
    (async () => {
      const controls = await getControlsByChecklistId(checklist.id);
      setChecklistControls(controls);
    })();
  }, []);

  return { checklistControls, setChecklistControls };
};

export default useGetControlsForChecklist;
