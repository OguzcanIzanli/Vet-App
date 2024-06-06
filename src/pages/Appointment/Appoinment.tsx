import "./Appoinment.styles.css";
import { useState, ChangeEvent, MouseEvent } from "react";
import { useAppointmentQuery } from "../../queries/useAppointmentQuery";
import { AppointmentType, initialAppointment } from "./types";
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";
import Pagination from "../../components/Pagination";
import { useAnimalQuery } from "../../queries/useAnimalQuery";
import { useCustomerQuery } from "../../queries/useCustomerQuery";
import { useDoctorQuery } from "../../queries/useDoctorQuery";
import { useWorkdayQuery } from "../../queries/useWorkdayQuery";

import { Dayjs } from "dayjs";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CustomerType } from "../Customer/types";

// import dayjs, { Dayjs } from "dayjs";
// import Stack from "@mui/material/Stack";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { AnimalType } from "../Animal/types";
import { DoctorType } from "../Doctor/types";
import { WorkdayDoctorType } from "../Workday/types";

const Appointment = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newAppointment, setNewAppointment] = useState(initialAppointment);
  const [updatedAppointment, setUpdatedAppointment] =
    useState(initialAppointment);
  const [searchByName, setSearchByName] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState<AnimalType[]>();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");

  const [doctorAvailableDates, setDoctorAvailableDates] = useState<
    WorkdayDoctorType[]
  >([]);

  const {
    listAppointments,
    addAppointment,
    removeAppointment,
    updateAppointment,
  } = useAppointmentQuery(page, size, searchByName);

  const { listAnimals } = useAnimalQuery(page, 99, searchByName, "");
  const { listCustomers } = useCustomerQuery(page, 99, "");
  const { listDoctors } = useDoctorQuery(page, 99);
  const { listWorkdays } = useWorkdayQuery();

  const appointments = listAppointments.data?.data.content;
  const animals = listAnimals.data?.data.content;
  const customers = listCustomers.data?.data.content;
  const doctors = listDoctors.data?.data.content;
  const workdays = listWorkdays.data?.data.content;

  const totalPages = listAppointments.data?.data.totalPages;

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    removeAppointment.mutate(id);
  };

  // ADD
  const handleAdd = () => {
    addAppointment.mutate(newAppointment);
    console.log(newAppointment);
    setNewAppointment(initialAppointment);
  };

  const hourSelectionChange = (e: Dayjs | null) => {
    console.log(e?.format());
    // setNewAppointment({
    //   ...newAppointment,
    //   appointmentDate: e?.format(),
    // });
  };

  const doctorSelectionChange = (e: SelectChangeEvent<string>) => {
    const selectedDoctor = doctors.find(
      (item: { id: number }) => item.id === Number(e.target.value)
    );
    setNewAppointment({ ...newAppointment, doctor: selectedDoctor });

    const selectedWorkdays = workdays.filter(
      (item: { doctor: DoctorType; id: number }) =>
        item.doctor.id === e.target.value
    );

    setDoctorAvailableDates(selectedWorkdays);
  };

  const customerSelectionChange = (e: SelectChangeEvent<string>) => {
    setFilteredAnimals(() =>
      animals.filter((item: AnimalType) => item.customer.id === e.target.value)
    );
    setSelectedCustomerId(e.target.value);
  };

  const animalSelectionChange = (e: SelectChangeEvent<string>) => {
    const selectedAnimal = animals.find(
      (item: { id: number }) => item.id === Number(e.target.value)
    );
    setNewAppointment({ ...newAppointment, animal: selectedAnimal });
  };

  // UPDATE
  const handleEdit = (item: AppointmentType) => {
    setUpdatedAppointment(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAppointment({
      ...updatedAppointment,
      [name]: value,
    });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    updateAppointment.mutate({ id, data: updatedAppointment });
    setUpdatedAppointment(initialAppointment);
  };

  // DATA SIZE ON PAGE
  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
  };

  // SEARCH
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchByName(value);
  };

  return (
    <>
      <div className="pageHeader">Randevu Yönetimi</div>
      <div className="pageListHeader">Randevu Listesi</div>

      <div className="filterContainer">
        <div className="searchInput">
          <input
            type="text"
            placeholder="Randevu Adına Göre Arama"
            value={searchByName}
            onChange={handleSearchChange}
          />
        </div>
        <div className="listSize">
          <p>Tabloda Gösterilecek Randevu Sayısı</p>
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
            <th>Randevu Tarihi</th>
            <th>Hayvan</th>
            <th>Müşteri</th>

            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((item: AppointmentType) =>
            updatedAppointment?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    name="dateOfBirth"
                    value={updatedAppointment.appointmentDate}
                    type="datetime-local"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <select
                    value={updatedAppointment.animal.id}
                    name="animal"
                    // onChange={(e) => handleSelectChange(e.target.value)}
                  >
                    {appointments.map((item: AppointmentType) => (
                      <option key={item.id} value={item.id}>
                        {item.animal.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={updatedAppointment.animal.customer.id}
                    name="customer"
                    // onChange={(e) => handleSelectChange(e.target.value)}
                  >
                    {appointments.map((item: AppointmentType) => (
                      <option key={item.id} value={item.id}>
                        {item.animal.customer.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="iconSave"
                    id={item.id}
                    onClick={handleUpdate}
                  >
                    <IconSave />
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                <td onClick={() => handleEdit(item)}>{item.appointmentDate}</td>
                <td onClick={() => handleEdit(item)}>{item.animal.name}</td>
                <td onClick={() => handleEdit(item)}>
                  {item.animal.customer.name}
                </td>
                <td>
                  <button
                    className="iconDelete"
                    id={item.id}
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
        <div className="pageInputsHeader">Randevu Ekle</div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Doktor Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newAppointment.doctor.id?.toString() || ""}
              label="Doktor Seçiniz"
              onChange={doctorSelectionChange}
            >
              {doctors?.map((item: DoctorType) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <div className="doctorAppointmentContainer">
          {doctorAvailableDates?.map((item: WorkdayDoctorType) => (
            <div key={item.id} className="doctorAppointmentItem">
              <div className="availableDate">{item.workDay}</div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["TimePicker", "TimePicker", "TimePicker"]}
                >
                  <DemoItem>
                    <TimePicker
                      label="Saat Seçiniz"
                      ampm={false}
                      minTime={dayjs().set("hour", 8)}
                      maxTime={dayjs().set("hour", 17)}
                      onChange={hourSelectionChange}
                      views={["hours"]}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
          ))}
        </div>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Müşteri Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCustomerId}
              label="Müşteri Seçiniz"
              onChange={customerSelectionChange}
            >
              {customers?.map((item: CustomerType) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Hayvan Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newAppointment.animal.id?.toString() || ""}
              label="Hayvan Seçiniz"
              onChange={animalSelectionChange}
            >
              {filteredAnimals?.length ? (
                filteredAnimals.map((item: AnimalType) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              ) : (
                <div>Bu Müşteriye Ait Hayvan Bulunamadı!</div>
              )}
            </Select>
          </FormControl>
        </Box>
        <button className="addBtn" onClick={handleAdd}>
          Ekle <IconSend />
        </button>
      </div>
    </>
  );
};

export default Appointment;
