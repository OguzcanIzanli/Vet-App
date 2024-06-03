import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DoctorType } from "../pages/Doctor/types";

export const useDoctorQuery = (page: number, size: number) => {
  const queryClient = useQueryClient();

  const listDoctors = useQuery({
    queryKey: ["doctors", page, size],
    queryFn: () => backend.doctorService.list(page, size).then((res) => res),
  });

  // const findDoctor = useQuery({
  //   queryKey: ["doctor", id],
  //   queryFn: () => backend.doctorService.find(id).then((res) => res),
  // });

  const addDoctor = useMutation({
    mutationFn: (newDoctor: DoctorType) =>
      backend.doctorService.post(newDoctor),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors", page, size]);
    },
  });

  const removeDoctor = useMutation({
    mutationFn: (id: string) => backend.doctorService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors", page, size]);
    },
  });

  const updateDoctor = useMutation({
    mutationFn: (updatedDoctor: { id: string; data: DoctorType }) =>
      backend.doctorService.put(updatedDoctor.id, updatedDoctor.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors", page, size]);
    },
  });

  return {
    listDoctors,
    addDoctor,
    removeDoctor,
    updateDoctor,
    // findDoctor,
  };
};
