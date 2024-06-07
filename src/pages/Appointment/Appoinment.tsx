import "./Appoinment.styles.css";
import { useState, ChangeEvent, MouseEvent } from "react";

// Icons
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";

// Components
import Pagination from "../../components/Pagination";

//Queries
import { useAnimalQuery } from "../../queries/useAnimalQuery";
import { useCustomerQuery } from "../../queries/useCustomerQuery";
import { useDoctorQuery } from "../../queries/useDoctorQuery";
import { useWorkdayQuery } from "../../queries/useWorkdayQuery";
import { useAppointmentQuery } from "../../queries/useAppointmentQuery";

//Types
import {
  AppointmentType,
  DateState,
  initialAppointment,
  initialSearchByDoctorDate,
} from "./types";
import { CustomerType } from "../Customer/types";
import { AnimalType } from "../Animal/types";
import { DoctorType } from "../Doctor/types";
import { WorkdayDoctorType } from "../Workday/types";

// Mui Select Input
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Mui Time Input
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const Appointment = () => {
  // States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newAppointment, setNewAppointment] = useState(initialAppointment);
  const [updatedAppointment, setUpdatedAppointment] =
    useState(initialAppointment);

  const [searchByDoctorAndDateRange, setSearchByDoctorAndDateRange] = useState(
    initialSearchByDoctorDate
  );
  const [searchByDate, setSearchByDate] = useState(initialSearchByDoctorDate);

  const [searchByAnimalAndDateRange, setSearchByAnimalAndDateRange] = useState(
    initialSearchByDoctorDate
  );

  const [filteredAnimals, setFilteredAnimals] = useState<AnimalType[]>();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [doctorAvailableDates, setDoctorAvailableDates] = useState<
    WorkdayDoctorType[]
  >([]);
  const [date, setDate] = useState<DateState>({
    dateInput: "",
    dateUpdate: "",
  });

  // Queries
  const {
    listAppointments,
    addAppointment,
    removeAppointment,
    updateAppointment,
  } = useAppointmentQuery(
    page,
    size,
    searchByDoctorAndDateRange,
    searchByAnimalAndDateRange
  );
  const { listAnimals } = useAnimalQuery(page, 99, "", "");
  const { listCustomers } = useCustomerQuery(page, 99, "");
  const { listDoctors } = useDoctorQuery(page, 99);
  const { listWorkdays } = useWorkdayQuery();

  const appointments = listAppointments.data?.data.content;
  const animals = listAnimals.data?.data.content;
  const customers = listCustomers.data?.data.content;
  const doctors = listDoctors.data?.data.content;
  const workdays = listWorkdays.data?.data.content;
  const totalPages = listAppointments.data?.data.totalPages;

  // ADD
  // Add Button
  const handleAdd = () => {
    addAppointment.mutate(newAppointment);
    setNewAppointment(initialAppointment);
    setDoctorAvailableDates([]);
    setSelectedCustomerId("");
  };

  // Doctor Select Input
  const doctorSelectionChange = (e: SelectChangeEvent<string>) => {
    const selectedDoctor = doctors.find(
      (item: DoctorType) => item.id === +e.target.value
    );
    setNewAppointment({ ...newAppointment, doctor: selectedDoctor });

    setDoctorAvailableDates(() =>
      workdays.filter(
        (item: { doctor: DoctorType; id: number }) =>
          item.doctor.id === +e.target.value
      )
    );
  };

  // Day Select Input
  const dateSelectionChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setDate({ ...date, dateInput: value });
    setNewAppointment({
      ...newAppointment,
      appointmentDate:
        value + "T" + newAppointment.appointmentDate?.split("T")[1],
    });
  };

  // Hour Select Input
  const hourSelectionChange = (e: Dayjs | null) => {
    const hour = e?.format().split("T")[1].slice(0, 5);
    setNewAppointment({
      ...newAppointment,
      appointmentDate: date.dateInput + "T" + hour,
    });
  };

  // Customer Select Input
  const customerSelectionChange = (e: SelectChangeEvent<string>) => {
    setFilteredAnimals(() =>
      animals.filter((item: AnimalType) => item.customer.id === +e.target.value)
    );
    setSelectedCustomerId(e.target.value);
  };

  // Animal Select Input
  const animalSelectionChange = (e: SelectChangeEvent<string>) => {
    const selectedAnimal = animals.find(
      (item: AnimalType) => item.id === +e.target.value
    );
    setNewAppointment({ ...newAppointment, animal: selectedAnimal });
  };

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeAppointment.mutate(id);
  };

  // UPDATE
  const handleEdit = (item: AppointmentType) => {
    setUpdatedAppointment(item);
    setDate({ ...date, dateUpdate: item.appointmentDate?.split("T")[0] });

    setDoctorAvailableDates(() =>
      workdays.filter(
        (workday: { doctor: DoctorType; id: number }) =>
          workday.doctor.id === item.doctor.id
      )
    );

    setFilteredAnimals(() =>
      animals.filter(
        (animal: AnimalType) => animal.customer.id === item.animal.customer.id
      )
    );
  };

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDate({ ...date, dateUpdate: value });
    const updatedAppointmentDate =
      value +
      "T" +
      updatedAppointment.appointmentDate?.split("T")[1].slice(0, 5);

    setUpdatedAppointment({
      ...updatedAppointment,
      appointmentDate: updatedAppointmentDate,
    });
  };

  const handleHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedTime = e.target.value;
    const updatedDate = updatedAppointment.appointmentDate?.split("T")[0];
    setUpdatedAppointment({
      ...updatedAppointment,
      appointmentDate: updatedDate + "T" + updatedTime,
    });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    console.log(updatedAppointment);
    updateAppointment.mutate({ id, data: updatedAppointment });
    setUpdatedAppointment(initialAppointment);
  };

  // DATA SIZE ON PAGE
  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(+e.target.value);
  };

  // SEARCH
  // Search By Doctor And Animal, And Date Range
  const searchAreaDoctors: string[] = Array.from(
    new Set(doctors?.map((doctor: DoctorType) => `${doctor.id}-${doctor.name}`))
  );

  const searchAreaAnimals: string[] = Array.from(
    new Set(animals?.map((animal: AnimalType) => `${animal.id}-${animal.name}`))
  );

  const handleSearchDateChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSearchByDate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchBtn = (name: string) => {
    if (name === "animal") {
      setSearchByAnimalAndDateRange(searchByDate);
    } else {
      setSearchByDoctorAndDateRange(searchByDate);
    }
  };

  return (
    <>
      <div className="pageHeader">Randevu Yönetimi</div>
      <div className="pageListHeader">Randevu Listesi</div>

      <div className="filterContainer">
        <div className="searchContainer">
          <div className="searchSelectInput">
            <select name="id" onChange={handleSearchDateChange}>
              <option value="">Doktorların Tümü</option>
              {searchAreaDoctors.map((item: string) => {
                const [id, name] = item.split("-");
                return (
                  <option value={id} key={id}>
                    {name}
                  </option>
                );
              })}
            </select>
            <button
              className="searchSelectInputBtn"
              onClick={() => handleSearchBtn("doctor")}
            >
              Ara
            </button>
          </div>

          <div className="searchSelectInput">
            <select name="id" id="" onChange={handleSearchDateChange}>
              <option value="">Hayvanların Tümü</option>
              {searchAreaAnimals.map((item: string) => {
                const [id, name] = item.split("-");
                return (
                  <option value={id} key={id}>
                    {name}
                  </option>
                );
              })}
            </select>
            <button
              className="searchSelectInputBtn"
              onClick={() => handleSearchBtn("animal")}
            >
              Ara
            </button>
          </div>
          <div className="searchDateInput">
            <input type="date" name="start" onChange={handleSearchDateChange} />
            -
            <input type="date" name="end" onChange={handleSearchDateChange} />
          </div>
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
            <th>Doktor</th>
            <th>Randevu Tarihi</th>
            <th>Randevu Saati</th>
            <th>Hayvan</th>
            <th>Müşteri</th>
            <th>Müşteri No</th>
            <th>Doktor No</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((item: AppointmentType) =>
            updatedAppointment?.id === item.id ? (
              <tr key={item.id}>
                <td>{item.doctor.name}</td>

                <td>
                  <select
                    value={date.dateUpdate}
                    name="day"
                    onChange={handleDayChange}
                  >
                    {doctorAvailableDates?.map((item: WorkdayDoctorType) => (
                      <option value={item.workDay} key={item.id}>
                        {item.workDay}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    name="hour"
                    value={updatedAppointment.appointmentDate
                      ?.split("T")[1]
                      .slice(0, 5)}
                    onChange={handleHourChange}
                  >
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </td>
                <td>{item.animal.name}</td>
                <td>{item.animal.customer.name}</td>
                <td>{item.animal.customer.phone}</td>
                <td>{item.doctor.phone}</td>
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
                <td>{item.doctor.name}</td>

                <td onClick={() => handleEdit(item)}>
                  {item.appointmentDate?.split("T")[0]}
                </td>
                <td onClick={() => handleEdit(item)}>
                  {item.appointmentDate?.split("T")[1].slice(0, 5)}
                </td>
                <td>{item.animal.name}</td>
                <td>{item.animal.customer.name}</td>
                <td>{item.animal.customer.phone}</td>
                <td>{item.doctor.phone}</td>
                <td>
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

        <div className="dateSelectionContainer">
          <div className="daySelectInput">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Gün Seçiniz
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={date.dateInput || ""}
                  label="Gün Seçiniz"
                  onChange={dateSelectionChange}
                >
                  {doctorAvailableDates[0] != null ? (
                    doctorAvailableDates?.map((item: WorkdayDoctorType) => (
                      <MenuItem key={item.id} value={item.workDay}>
                        {item.workDay}
                      </MenuItem>
                    ))
                  ) : (
                    <div style={{ padding: "0 8px" }}>
                      Bu Doktora Ait Uygun Randevu Bulunamadı!
                    </div>
                  )}
                </Select>
              </FormControl>
            </Box>
          </div>

          {date.dateInput != "" && (
            <div className="hourSelectInput">
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
          )}
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

        {selectedCustomerId && (
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
                  <div style={{ padding: "0 8px" }}>
                    Bu Müşteriye Ait Hayvan Bulunamadı!
                  </div>
                )}
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

export default Appointment;
