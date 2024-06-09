import { useState, ChangeEvent, MouseEvent } from "react";

//Queries
import { useVaccinationQuery } from "../../queries/useVaccinationQuery";
import { useAnimalQuery } from "../../queries/useAnimalQuery";

//Types
import {
  VaccinationGetType,
  initialSearchByVaccinationRange,
  initialVaccination,
  initialVaccinationGet,
} from "./types";
import { AnimalType } from "../Animal/types";

// Components
import Pagination from "../../components/Pagination";
import InputTextField from "../../components/MUI/InputTextField";
import ListSizeSelector from "../../components/ListSizeSelector";
import Toast from "../../components/Toast";
import OperationButton from "../../components/OperationButton";

// MUI
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Vaccination = () => {
  // States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newVaccination, setNewVaccination] = useState(initialVaccination);
  const [updatedVaccination, setUpdatedVaccination] = useState(
    initialVaccinationGet
  );
  const [searchByAnimal, setSearchByAnimal] = useState("");
  const [searchByVaccinationRange, setSearchByVaccinationRange] = useState(
    initialSearchByVaccinationRange
  );

  // Queries
  const {
    listVaccinations,
    addVaccination,
    removeVaccination,
    updateVaccination,
    toast,
    resetToast,
  } = useVaccinationQuery(page, size, searchByAnimal, searchByVaccinationRange);
  const { listAnimals } = useAnimalQuery(0, 99, "", "");

  const vaccinations = listVaccinations.data?.data.content;
  const animals = listAnimals.data?.data.content;
  const totalPages = listVaccinations.data?.data.totalPages;

  // Remove
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeVaccination.mutate(id);
  };

  // Add
  const handleAdd = () => {
    addVaccination.mutate(newVaccination);
    setNewVaccination(initialVaccination);
  };

  const vaccinationInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setNewVaccination((prev) => ({ ...prev, [name]: newValue }));
  };

  const dateSelectionChange = (e: Dayjs | null) => {
    const formattedDate = e?.format().slice(0, e?.format().indexOf("T"));

    if (newVaccination.protectionStartDate === "") {
      setNewVaccination({
        ...newVaccination,
        protectionStartDate: formattedDate,
      });
    } else {
      setNewVaccination({
        ...newVaccination,
        protectionFinishDate: formattedDate,
      });
    }
  };

  // Animal Select Input
  const animalSelectionChange = (e: SelectChangeEvent<string>) => {
    const selectedAnimal = animals.find(
      (item: AnimalType) => item.id === +e.target.value
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customer, ...animalWithoutCustomer } = selectedAnimal;

    setNewVaccination({
      ...newVaccination,
      animalWithoutCustomer: animalWithoutCustomer,
    });
  };

  // Update
  const handleEdit = (item: VaccinationGetType) => {
    setUpdatedVaccination(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setUpdatedVaccination({
      ...updatedVaccination,
      [name]: newValue,
    });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { animal, ...vaccinationWithoutAnimal } = updatedVaccination;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customer, ...animalWithoutCustomer } = animal;
    const vaccinationWithoutCustomer = {
      ...vaccinationWithoutAnimal,
      animalWithoutCustomer,
    };
    console.log("id:", id, "Putted Vaccination:", vaccinationWithoutCustomer);
    updateVaccination.mutate({ id, data: vaccinationWithoutCustomer });
    setUpdatedVaccination(initialVaccinationGet);
  };

  // Search
  const searchAreaAnimals: string[] = Array.from(
    new Set(
      animals?.map(
        (animal: AnimalType) =>
          `${animal.id}-${animal.name}-${animal.customer.name}`
      )
    )
  );

  const handleAnimalSearchChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    setSearchByAnimal(value);
  };

  const handleSearchDateChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSearchByVaccinationRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pageContainer">
      <div className="pageHeader">Aşı Yönetimi</div>
      <div className="pageListHeader">Aşı Listesi</div>

      <div className="filterContainer">
        <div className="searchContainer">
          <div className="searchSelectInput">
            <select name="doctor" onChange={handleAnimalSearchChange}>
              <option value="">Hayvanların Tümü</option>
              {searchAreaAnimals.map((item: string) => {
                const [id, name, customer] = item.split("-");
                return (
                  <option value={id} key={id}>
                    {name} - Sahibi: {customer}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="searchDateInput">
            <label htmlFor="start">Koruma Bitiş Tarihine Göre Filtrele: </label>
            <input
              id="start"
              type="date"
              name="start"
              onChange={handleSearchDateChange}
            />
            -
            <input
              type="date"
              name="end"
              min={searchByVaccinationRange.start}
              onChange={handleSearchDateChange}
            />
          </div>
        </div>
        <ListSizeSelector size={size} onSizeChange={setSize} label="Aşı" />
      </div>

      <table id="table">
        <thead>
          <tr>
            <th>Aşı</th>
            <th>Aşı Kodu</th>
            <th>Koruma Başlangıç</th>
            <th>Koruma Bitiş</th>
            <th>Hayvan Adı</th>
            <th>Müşteri</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {vaccinations?.map((item: VaccinationGetType) =>
            updatedVaccination?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    name="name"
                    value={updatedVaccination.name}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>

                <td>
                  <input
                    name="code"
                    value={updatedVaccination.code}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>

                <td>
                  <input
                    name="protectionStartDate"
                    value={updatedVaccination.protectionStartDate}
                    type="date"
                    onChange={handleFieldChange}
                  />
                </td>

                <td>
                  <input
                    name="protectionFinishDate"
                    value={updatedVaccination.protectionFinishDate}
                    type="date"
                    onChange={handleFieldChange}
                  />
                </td>

                <td>{item.animal.name}</td>
                <td>{item.animal.customer.name}</td>

                <td>
                  <OperationButton
                    className="saveBtn"
                    id={item.id?.toString()}
                    icon="save"
                    onClick={handleUpdate}
                  />
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.protectionStartDate}</td>
                <td>{item.protectionFinishDate}</td>
                <td>{item.animal.name}</td>
                <td>{item.animal.customer.name}</td>

                <td className="operationBtns">
                  <OperationButton
                    className="editBtn"
                    onClick={() => handleEdit(item)}
                    icon="edit"
                  />
                  <OperationButton
                    className="deleteBtn"
                    id={item.id?.toString()}
                    icon="delete"
                    onClick={handleRemove}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <div className="inputContainer">
        <div className="pageInputsHeader">Aşı Ekle</div>
        <InputTextField
          label="Aşı"
          name="name"
          value={newVaccination.name}
          type="text"
          onChange={vaccinationInputChange}
        />
        <InputTextField
          label="Aşı Kodu"
          name="code"
          value={newVaccination.code}
          type="text"
          onChange={vaccinationInputChange}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={null}
              label="Koruma Başlangıç Tarihi"
              // maxDate={dayjs(localDate)}
              onChange={dateSelectionChange}
            />
          </DemoContainer>
        </LocalizationProvider>

        {newVaccination.protectionStartDate != "" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={null}
                label="Koruma Bitiş Tarihi"
                minDate={dayjs(newVaccination.protectionStartDate)}
                onChange={dateSelectionChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        )}

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Hayvan Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={
                newVaccination.animalWithoutCustomer.id
                  ? newVaccination.animalWithoutCustomer.id.toString()
                  : ""
              }
              label="Hayvan Seçiniz"
              onChange={animalSelectionChange}
            >
              {animals?.map((item: AnimalType) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name} - Sahibi: {item.customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <OperationButton className="addBtn" onClick={handleAdd} icon="send">
          Ekle
        </OperationButton>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={resetToast}
          />
        )}
      </div>
    </div>
  );
};

export default Vaccination;
