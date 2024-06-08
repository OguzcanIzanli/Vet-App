import { useState, ChangeEvent, MouseEvent } from "react";

// Icons
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";

// Components
import Pagination from "../../components/Pagination";

//Queries
import { useVaccinationQuery } from "../../queries/useVaccinationQuery";
import { useAppointmentQuery } from "../../queries/useAppointmentQuery";
import { useReportQuery } from "../../queries/useReportQuery";

//Types
import {
  VaccinationGetType,
  VaccinationType,
  initialVaccination,
} from "./types";

import {
  AppointmentType,
  initialAppointment,
  initialSearchByDoctorDate,
} from "../Appointment/types";

// Mui Select Input
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputTextField from "../../components/InputTextField";

import IconEdit from "../../assets/icons/IconEdit";

import { Dayjs } from "dayjs";
// import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAnimalQuery } from "../../queries/useAnimalQuery";
import { AnimalType } from "../Animal/types";
import {
  ReportGetType,
  initialReport,
  initialReportGet,
} from "../Report/types";

const Vaccination = () => {
  // States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newVaccination, setNewVaccination] = useState(initialVaccination);
  const [updatedVaccination, setUpdatedVaccination] =
    useState(initialVaccination);

  const [filteredReports, setFilteredReports] = useState([]);
  // Queries
  const {
    listVaccinations,
    addVaccination,
    removeVaccination,
    // updateVaccination,
  } = useVaccinationQuery(page, size, "");
  const { listReports } = useReportQuery(0, 99);

  const { listAnimals } = useAnimalQuery(0, 99, "", "");

  const vaccinations = listVaccinations.data?.data.content;
  const reports = listReports.data?.data.content;
  const animals = listAnimals.data?.data.content;
  const totalPages = listVaccinations.data?.data.totalPages;

  // ADD
  // Add Button
  const handleAdd = () => {
    addVaccination.mutate(newVaccination);
    setNewVaccination(initialVaccination);
  };

  const vaccinationInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVaccination((prev) => ({ ...prev, [name]: value }));
    console.log(newVaccination);
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

    setFilteredReports(() =>
      reports.filter(
        (item: ReportGetType) =>
          item.appointment.animalName === selectedAnimal.name &&
          item.appointment.customerName === selectedAnimal.customer.name
      )
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customer, ...animalWithoutCustomer } = selectedAnimal;

    setNewVaccination({
      ...newVaccination,
      animalWithoutCustomer: animalWithoutCustomer,
    });

    console.log(filteredReports);
  };

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeVaccination.mutate(id);
  };

  // UPDATE
  // const handleEdit = (item: VaccinationType) => {
  //   setUpdatedVaccination(item);
  // };

  // const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUpdatedVaccination({
  //     ...updatedVaccination,
  //     [name]: value,
  //   });
  // };

  // const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
  //   const id = e.currentTarget.id;
  //   updateVaccination.mutate({ id, data: updatedVaccination });
  //   setUpdatedVaccination(initialVaccination);
  // };

  // // DATA SIZE ON PAGE
  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(+e.target.value);
  };

  return (
    <>
      <div className="pageHeader">Aşı Yönetimi</div>
      <div className="pageListHeader">Aşı Listesi</div>

      <div className="filterContainer">
        <div className="searchContainer"></div>
        <div className="listSize">
          <p>Tabloda Gösterilecek Aşı Sayısı</p>
          <select value={size} onChange={handleSizeChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <table id="table">
        <thead>
          <tr>
            <th>Aşı</th>
            <th>Aşı Kodu</th>
            <th>Koruma Başlangıç Tarihi</th>
            <th>Koruma Bitiş Tarihi</th>
            <th>Hayvan Adı</th>
            <th>Rapor Başlığı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {vaccinations?.map((item: VaccinationGetType) =>
            updatedVaccination?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    name="title"
                    value={updatedVaccination.title}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>

                <td>
                  <input
                    name="diagnosis"
                    value={updatedVaccination.diagnosis}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>

                <td>
                  <input
                    name="price"
                    value={updatedVaccination.price}
                    type="number"
                    onChange={handleFieldChange}
                  />
                </td>

                <td>{item.appointment.animalName}</td>
                <td>{item.appointment.doctorName}</td>
                <td>{item.appointment.customerName}</td>

                <td>
                  {item.appointment.date.split("T")[0]} -{" "}
                  {item.appointment.date.split("T")[1].slice(0, 5)}
                </td>

                <td>
                  <button
                    className="iconSave"
                    id={item.id?.toString()}
                    onClick={handleUpdate}
                  >
                    <IconSave />
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.protectionStartDate}</td>
                <td>{item.protectionFinishDate}</td>
                <td>{item.animal.name}</td>
                <td>Rapor Basligi</td>

                <td className="operationBtns">
                  <button className="iconEdit" onClick={() => handleEdit(item)}>
                    <IconEdit />
                  </button>
                  <button
                    className="iconDelete"
                    id={item.id?.toString()}
                    onClick={handleRemove}
                  >
                    <IconDelete />
                  </button>
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
                // maxDate={dayjs(localDate)}
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
                  {item.name} - {item.customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {filteredReports && (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Hayvana Ait Bir Raporu Seçin
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={
                  newVaccination.animalWithoutCustomer.id
                    ? newVaccination.animalWithoutCustomer.id.toString()
                    : ""
                }
                label="Hayvana Ait Bir Raporu Seçin"
                onChange={animalSelectionChange}
              >
                {filteredReports?.map((item: ReportGetType) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        <button className="addBtn" onClick={handleAdd}>
          Ekle <IconSend />
        </button>
      </div>
    </>
  );
};

export default Vaccination;
