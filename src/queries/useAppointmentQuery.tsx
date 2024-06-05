import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AppointmentType } from "../pages/Appointment/types";

export const useAppointmentQuery = (
  page: number,
  size: number,
  searchByName: string
) => {
  const queryClient = useQueryClient();

  const listAppointments = useQuery({
    queryKey: ["appointments", page, size, searchByName],
    queryFn: () =>
      searchByName
        ? backend.appointmentService.searchByName(searchByName)
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
      queryClient.invalidateQueries(["appointments", page, size, searchByName]);
    },
  });

  const removeAppointment = useMutation({
    mutationFn: (id: string) => backend.appointmentService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments", page, size, searchByName]);
    },
  });

  const updateAppointment = useMutation({
    mutationFn: (updatedAppointment: { id: string; data: AppointmentType }) =>
      backend.appointmentService.put(
        updatedAppointment.id,
        updatedAppointment.data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments", page, size, searchByName]);
    },
  });

  return {
    listAppointments,
    addAppointment,
    removeAppointment,
    updateAppointment,
  };
};
