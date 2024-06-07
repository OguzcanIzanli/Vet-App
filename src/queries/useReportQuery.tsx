import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ReportType } from "../pages/Report/types";

export const useReportQuery = (page: number, size: number) => {
  const queryClient = useQueryClient();

  const listReports = useQuery({
    queryKey: ["reports", page, size],
    queryFn: () => backend.reportService.list(page, size).then((res) => res),
  });

  // const findReport = useQuery({
  //   queryKey: ["report", id],
  //   queryFn: () => backend.reportService.find(id).then((res) => res),
  // });

  const addReport = useMutation({
    mutationFn: (newReport: ReportType) =>
      backend.reportService.post(newReport),
    onSuccess: () => {
      queryClient.invalidateQueries(["reports", page, size]);
    },
  });

  const removeReport = useMutation({
    mutationFn: (id: string) => backend.reportService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["reports", page, size]);
    },
  });

  const updateReport = useMutation({
    mutationFn: (updatedReport: { id: string; data: ReportType }) =>
      backend.reportService.put(updatedReport.id, updatedReport.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["reports", page, size]);
    },
  });

  return {
    listReports,
    addReport,
    removeReport,
    updateReport,
  };
};
