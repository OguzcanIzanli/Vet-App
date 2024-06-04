import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { WorkdayType } from "../pages/Workday/types";

export const useWorkdayQuery = () => {
  const queryClient = useQueryClient();

  const listWorkdays = useQuery({
    queryKey: ["workdays"],
    queryFn: () => backend.workdayService.list().then((res) => res),
  });

  // const findWorkday = useQuery({
  //   queryKey: ["workday", id],
  //   queryFn: () => backend.workdayService.find(id).then((res) => res),
  // });

  const addWorkday = useMutation({
    mutationFn: (newWorkday: WorkdayType) =>
      backend.workdayService.post(newWorkday),
    onSuccess: () => {
      queryClient.invalidateQueries(["workdays"]);
    },
  });

  // const removeWorkday = useMutation({
  //   mutationFn: (id: number) => backend.workdayService.remove(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["workdays"]);
  //   },
  // });

  // const updateWorkday = useMutation({
  //   mutationFn: (updatedWorkday: { id: number; data: WorkdayType }) =>
  //     backend.workdayService.put(updatedWorkday.id, updatedWorkday.data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["workdays"]);
  //   },
  // });

  return {
    listWorkdays,
    addWorkday,
    // removeWorkday,
    // updateWorkday,
  };
};
