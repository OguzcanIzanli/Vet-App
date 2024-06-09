import { useState } from "react";
import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ReportType } from "../pages/Report/types";

export const useReportQuery = (page: number, size: number) => {
  const queryClient = useQueryClient();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const resetToast = () => {
    setToast(null);
  };

  // Get
  const listReports = useQuery({
    queryKey: ["reports", page, size],
    queryFn: () => backend.reportService.list(page, size).then((res) => res),
  });

  // Post
  const addReport = useMutation({
    mutationFn: (newReport: ReportType) =>
      backend.reportService.post(newReport),
    onSuccess: () => {
      queryClient.invalidateQueries(["reports", page, size]);
      setToast({ message: "Rapor başarıyla eklendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Rapor eklenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Delete
  const removeReport = useMutation({
    mutationFn: (id: string) => backend.reportService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["reports", page, size]);
      setToast({ message: "Rapor başarıyla silindi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Rapor silinirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Put
  const updateReport = useMutation({
    mutationFn: (updatedReport: { id: string; data: ReportType }) =>
      backend.reportService.put(updatedReport.id, updatedReport.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["reports", page, size]);
      setToast({ message: "Rapor bilgileri güncellendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Rapor bilgileri güncellenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  return {
    listReports,
    addReport,
    removeReport,
    updateReport,
    toast,
    resetToast,
  };
};
