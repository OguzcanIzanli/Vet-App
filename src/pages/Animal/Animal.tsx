import { useState, ChangeEvent, MouseEvent } from "react";

//Queries
import { useAnimalQuery } from "../../queries/useAnimalQuery";
import { useCustomerQuery } from "../../queries/useCustomerQuery";

// Types
import { AnimalType, initialAnimal } from "./types";
import { CustomerType } from "../Customer/types";

// Components
import Pagination from "../../components/Pagination";
import InputTextField from "../../components/MUI/InputTextField";
import Toast from "../../components/Toast";
import OperationButton from "../../components/OperationButton";
import ListSizeSelector from "../../components/ListSizeSelector";

// MUI
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Animal = () => {
  // States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newAnimal, setNewAnimal] = useState(initialAnimal);
  const [updatedAnimal, setUpdatedAnimal] = useState(initialAnimal);
  const [searchByName, setSearchByName] = useState("");
  const [searchByCustomer, setSearchByCustomer] = useState("");
  const localDate = new Date().toISOString().split("T")[0];

  // Queries
  const {
    listAnimals,
    addAnimal,
    removeAnimal,
    updateAnimal,
    toast,
    resetToast,
  } = useAnimalQuery(page, size, searchByName, searchByCustomer);
  const { listCustomers } = useCustomerQuery(0, 99, "");

  const customers = listCustomers.data?.data.content;
  const animals = listAnimals.data?.data.content;
  const totalPages = listAnimals.data?.data.totalPages;

  // Remove
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeAnimal.mutate(id);
  };

  // Add
  const handleAdd = () => {
    addAnimal.mutate(newAnimal);
    setNewAnimal(initialAnimal);
  };

  const animalInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setNewAnimal((prev) => ({ ...prev, [name]: newValue }));
  };

  const dateSelectionChange = (e: Dayjs | null) => {
    const formattedDate = e?.format().slice(0, e?.format().indexOf("T"));
    setNewAnimal({
      ...newAnimal,
      dateOfBirth: formattedDate,
    });
  };

  const customerSelectionChange = (e: SelectChangeEvent<string>) => {
    const selectedCustomer = customers.find(
      (item: { id: number }) => item.id === Number(e.target.value)
    );
    setNewAnimal({ ...newAnimal, customer: selectedCustomer });
  };

  // Update
  const handleEdit = (item: AnimalType) => {
    setUpdatedAnimal(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setUpdatedAnimal({
      ...updatedAnimal,
      [name]: newValue,
    });
  };

  const handleSelectChange = (value: string) => {
    const newCustomer = customers.find(
      (item: { id: number }) => item.id === +value
    );
    const updatedCustomer = { ...newCustomer, name: value };
    setUpdatedAnimal({ ...updatedAnimal, customer: updatedCustomer });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    updateAnimal.mutate({ id, data: updatedAnimal });
    setUpdatedAnimal(initialAnimal);
  };

  // Search
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    name === "animal"
      ? setSearchByName(newValue)
      : setSearchByCustomer(newValue);
  };

  return (
    <div className="pageContainer">
      <div className="pageHeader">Hayvan Yönetimi</div>
      <div className="pageListHeader">Hayvan Listesi</div>

      <div className="filterContainer">
        <div className="searchContainer">
          <div className="searchInput">
            <input
              type="text"
              name="customer"
              placeholder="Müşteri Adına Göre Arama"
              value={searchByCustomer}
              onChange={handleSearchChange}
            />
          </div>
          <div className="searchInput">
            <input
              type="text"
              name="animal"
              placeholder="Hayvan Adına Göre Arama"
              value={searchByName}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <ListSizeSelector size={size} onSizeChange={setSize} label="Hayvan" />
      </div>

      <table id="table">
        <thead>
          <tr>
            <th>Adı</th>
            <th>Türü</th>
            <th>Cinsi</th>
            <th>Cinsiyeti</th>
            <th>Rengi</th>
            <th>Doğum Tarihi</th>
            <th>Müşteri</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {animals?.map((item: AnimalType) =>
            updatedAnimal?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    name="name"
                    value={updatedAnimal.name}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="species"
                    value={updatedAnimal.species}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="breed"
                    value={updatedAnimal.breed}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="gender"
                    value={updatedAnimal.gender}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="colour"
                    value={updatedAnimal.colour}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="dateOfBirth"
                    value={updatedAnimal.dateOfBirth}
                    type="date"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <select
                    value={updatedAnimal.customer.id}
                    name="customer"
                    onChange={(e) => handleSelectChange(e.target.value)}
                  >
                    {customers.map((item: CustomerType) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </td>
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
                <td>{item.species}</td>
                <td>{item.breed}</td>
                <td>{item.gender}</td>
                <td>{item.colour}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.customer.name}</td>
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
        <div className="pageInputsHeader">Hayvan Ekle</div>
        <InputTextField
          label="Hayvan Adı"
          name="name"
          value={newAnimal.name}
          type="text"
          onChange={animalInputChange}
        />
        <InputTextField
          label="Hayvan Türü"
          name="species"
          value={newAnimal.species}
          type="text"
          onChange={animalInputChange}
        />
        <InputTextField
          label="Hayvan Cinsi"
          name="breed"
          value={newAnimal.breed}
          type="text"
          onChange={animalInputChange}
        />
        <InputTextField
          label="Hayvan Cinsiyeti"
          name="gender"
          value={newAnimal.gender}
          type="text"
          onChange={animalInputChange}
        />
        <InputTextField
          label="Hayvan Rengi"
          name="colour"
          value={newAnimal.colour}
          type="text"
          onChange={animalInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={null}
              label="Hayvan Doğum Tarihi"
              maxDate={dayjs(localDate)}
              onChange={dateSelectionChange}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Müşteri Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newAnimal.customer.id?.toString() || ""}
              label="Müşteri Seçiniz"
              onChange={customerSelectionChange}
            >
              {customers && customers.length > 0 ? (
                customers?.map((item: CustomerType) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  Kayıtlı Müşteri Bulunamadı!
                </MenuItem>
              )}
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

export default Animal;
