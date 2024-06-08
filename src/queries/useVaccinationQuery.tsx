import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { VaccinationType } from "../pages/Vaccination/types";

export const useVaccinationQuery = (
  page: number,
  size: number,
  searchByName: string
) => {
  const queryClient = useQueryClient();

  const listVaccinations = useQuery({
    queryKey: ["vaccinations", page, size, searchByName],
    queryFn: () =>
      searchByName
        ? backend.vaccinationService.searchByName(searchByName)
        : backend.vaccinationService.list(page, size),
  });

  // const findVaccination = useQuery({
  //   queryKey: ["vaccination", id],
  //   queryFn: () => backend.vaccinationService.find(id).then((res) => res),
  // });

  const addVaccination = useMutation({
    mutationFn: (newVaccination: VaccinationType) =>
      backend.vaccinationService.post(newVaccination),
    onSuccess: () => {
      queryClient.invalidateQueries(["vaccinations", page, size, searchByName]);
    },
  });

  const removeVaccination = useMutation({
    mutationFn: (id: string) => backend.vaccinationService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["vaccinations", page, size, searchByName]);
    },
  });

  const updateVaccination = useMutation({
    mutationFn: (updatedVaccination: { id: string; data: VaccinationType }) =>
      backend.vaccinationService.put(
        updatedVaccination.id,
        updatedVaccination.data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["vaccinations", page, size, searchByName]);
    },
  });

  return {
    listVaccinations,
    addVaccination,
    removeVaccination,
    updateVaccination,
  };
};
