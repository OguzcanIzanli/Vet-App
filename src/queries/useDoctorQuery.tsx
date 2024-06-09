import { useState } from "react";
import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DoctorType } from "../pages/Doctor/types";

export const useDoctorQuery = (page: number, size: number) => {
  const queryClient = useQueryClient();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const resetToast = () => {
    setToast(null);
  };

  // Get
  const listDoctors = useQuery({
    queryKey: ["doctors", page, size],
    queryFn: () => backend.doctorService.list(page, size).then((res) => res),
  });

  // Post
  const addDoctor = useMutation({
    mutationFn: (newDoctor: DoctorType) =>
      backend.doctorService.post(newDoctor),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors", page, size]);
      setToast({ message: "Doktor başarıyla eklendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Doktor eklenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Delete
  const removeDoctor = useMutation({
    mutationFn: (id: string) => backend.doctorService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors", page, size]);
      setToast({ message: "Doktor başarıyla silindi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Doktor silinirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Put
  const updateDoctor = useMutation({
    mutationFn: (updatedDoctor: { id: string; data: DoctorType }) =>
      backend.doctorService.put(updatedDoctor.id, updatedDoctor.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors", page, size]);
      setToast({ message: "Doktor bilgileri güncellendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Doktor bilgileri güncellenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  return {
    listDoctors,
    addDoctor,
    removeDoctor,
    updateDoctor,
    toast,
    resetToast,
  };
};
