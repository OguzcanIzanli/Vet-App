import { useState } from "react";
import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { WorkdayType } from "../pages/Workday/types";

export const useWorkdayQuery = () => {
  const queryClient = useQueryClient();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const resetToast = () => {
    setToast(null);
  };

  // Get
  const listWorkdays = useQuery({
    queryKey: ["workdays"],
    queryFn: () => backend.workdayService.list().then((res) => res),
  });

  // Post
  const addWorkday = useMutation({
    mutationFn: (newWorkday: WorkdayType) =>
      backend.workdayService.post(newWorkday),
    onSuccess: () => {
      queryClient.invalidateQueries(["workdays"]);
      setToast({
        message: "Doktor çalışma günü başarıyla eklendi!",
        type: "success",
      });
    },
    onError: () => {
      setToast({
        message: "Doktor çalışma günü eklenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Delete
  const removeWorkday = useMutation({
    mutationFn: (id: string) => backend.workdayService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["workdays"]);
      setToast({
        message: "Doktor çalışma günü başarıyla silindi!",
        type: "success",
      });
    },
    onError: () => {
      setToast({
        message: "Doktor çalışma günü silinirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Put
  const updateWorkday = useMutation({
    mutationFn: (updatedWorkday: { id: string; data: WorkdayType }) =>
      backend.workdayService.put(updatedWorkday.id, updatedWorkday.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["workdays"]);
      setToast({
        message: "Doktor çalışma günü bilgileri güncellendi!",
        type: "success",
      });
    },
    onError: () => {
      setToast({
        message:
          "Doktor çalışma günü bilgileri güncellenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  return {
    listWorkdays,
    addWorkday,
    removeWorkday,
    updateWorkday,
    toast,
    resetToast,
  };
};
