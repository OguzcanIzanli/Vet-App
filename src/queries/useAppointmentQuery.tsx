import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AppointmentType } from "../pages/Appointment/types";

export const useAppointmentQuery = (
  page: number,
  size: number,
  searchByDoctorAndDateRange: { id: string; start: string; end: string },
  searchByAnimalAndDateRange: { id: string; start: string; end: string }
) => {
  const queryClient = useQueryClient();

  const listAppointments = useQuery({
    queryKey: [
      "appointments",
      page,
      size,
      searchByDoctorAndDateRange,
      searchByAnimalAndDateRange,
    ],
    queryFn: () =>
      searchByAnimalAndDateRange.id !== ""
        ? backend.appointmentService.searchByAnimalAndDateRange(
            searchByAnimalAndDateRange
          )
        : searchByDoctorAndDateRange.id !== ""
        ? backend.appointmentService.searchByDoctorAndDateRange(
            searchByDoctorAndDateRange
          )
        : backend.appointmentService.list(page, size),
  });

  // const findAppoinment = useQuery({
  //   queryKey: ["appoinment", id],
  //   queryFn: () => backend.appointmentService.find(id).then((res) => res),
  // });

  const addAppointment = useMutation({
    mutationFn: (newAppointment: AppointmentType) =>
      backend.appointmentService.post(newAppointment),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "appointments",
        page,
        size,
        searchByDoctorAndDateRange,
        searchByAnimalAndDateRange,
      ]);
    },
  });

  const removeAppointment = useMutation({
    mutationFn: (id: string) => backend.appointmentService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "appointments",
        page,
        size,
        searchByDoctorAndDateRange,
        searchByAnimalAndDateRange,
      ]);
    },
  });

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
        searchByDoctorAndDateRange,
        searchByAnimalAndDateRange,
      ]);
    },
  });

  return {
    listAppointments,
    addAppointment,
    removeAppointment,
    updateAppointment,
  };
};
