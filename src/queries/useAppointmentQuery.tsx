import { useState } from "react";
import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AppointmentType } from "../pages/Appointment/types";

export const useAppointmentQuery = (
  page: number,
  size: number,
  searchByDoctorAnimalAndDateRange: {
    id: string;
    start: string;
    end: string;
    searchName: string;
  }
) => {
  const queryClient = useQueryClient();

  const shouldFetchFiltered =
    searchByDoctorAnimalAndDateRange.id !== "" ||
    searchByDoctorAnimalAndDateRange.start !== "2000-01-01" ||
    searchByDoctorAnimalAndDateRange.end !== "2100-01-01" ||
    searchByDoctorAnimalAndDateRange.searchName !== "";

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const resetToast = () => {
    setToast(null);
  };

  // Get
  const listAppointments = useQuery({
    queryKey: ["appointments", page, size, searchByDoctorAnimalAndDateRange],
    queryFn: () =>
      shouldFetchFiltered
        ? backend.appointmentService.searchByDoctorAnimalAndDateRange(
            searchByDoctorAnimalAndDateRange
          )
        : backend.appointmentService.list(page, size),
  });

  // Post
  const addAppointment = useMutation({
    mutationFn: (newAppointment: AppointmentType) =>
      backend.appointmentService.post(newAppointment),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "appointments",
        page,
        size,
        searchByDoctorAnimalAndDateRange,
      ]);
      setToast({ message: "Randevu başarıyla eklendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Randevu eklenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Delete
  const removeAppointment = useMutation({
    mutationFn: (id: string) => backend.appointmentService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "appointments",
        page,
        size,
        searchByDoctorAnimalAndDateRange,
      ]);
      setToast({ message: "Randevu başarıyla silindi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Randevu silinirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Put
  const updateAppointment = useMutation({
    mutationFn: (updatedAppointment: { id: string; data: AppointmentType }) =>
      backend.appointmentService.put(
        updatedAppointment.id,
        updatedAppointment.data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "appointments",
        page,
        size,
        searchByDoctorAnimalAndDateRange,
      ]);
      setToast({ message: "Randevu bilgileri güncellendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Randevu bilgileri güncellenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  return {
    listAppointments,
    addAppointment,
    removeAppointment,
    updateAppointment,
    toast,
    resetToast,
  };
};
