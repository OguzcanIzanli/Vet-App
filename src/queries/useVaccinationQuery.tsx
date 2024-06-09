import { useState } from "react";
import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { VaccinationType } from "../pages/Vaccination/types";

export const useVaccinationQuery = (
  page: number,
  size: number,
  searchByAnimal: string,
  searchByVaccinationRange: { start: string; end: string }
) => {
  const queryClient = useQueryClient();

  const shouldFetchFiltered =
    searchByVaccinationRange.start !== "2000-01-01" ||
    searchByVaccinationRange.end !== "2100-01-01";

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const resetToast = () => {
    setToast(null);
  };

  // Get
  const listVaccinations = useQuery({
    queryKey: [
      "vaccinations",
      page,
      size,
      searchByAnimal,
      searchByVaccinationRange,
    ],
    queryFn: () =>
      searchByAnimal
        ? backend.vaccinationService.searchByAnimal(searchByAnimal)
        : shouldFetchFiltered
        ? backend.vaccinationService.searchByVaccinationRange(
            searchByVaccinationRange
          )
        : backend.vaccinationService.list(page, size),
  });

  // Post
  const addVaccination = useMutation({
    mutationFn: (newVaccination: VaccinationType) =>
      backend.vaccinationService.post(newVaccination),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "vaccinations",
        page,
        size,
        searchByAnimal,
        searchByVaccinationRange,
      ]);
      setToast({ message: "Aşı başarıyla eklendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Aşı eklenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Delete
  const removeVaccination = useMutation({
    mutationFn: (id: string) => backend.vaccinationService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "vaccinations",
        page,
        size,
        searchByAnimal,
        searchByVaccinationRange,
      ]);
      setToast({ message: "Aşı başarıyla silindi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Aşı silinirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Put
  const updateVaccination = useMutation({
    mutationFn: (updatedVaccination: { id: string; data: VaccinationType }) =>
      backend.vaccinationService.put(
        updatedVaccination.id,
        updatedVaccination.data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "vaccinations",
        page,
        size,
        searchByAnimal,
        searchByVaccinationRange,
      ]);
      setToast({ message: "Aşı bilgileri güncellendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Aşı bilgileri güncellenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  return {
    listVaccinations,
    addVaccination,
    removeVaccination,
    updateVaccination,
    toast,
    resetToast,
  };
};
