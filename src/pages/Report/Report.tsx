import { useState, ChangeEvent, MouseEvent } from "react";

// Icons
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";

// Components
import Pagination from "../../components/Pagination";

//Queries
// import { useAnimalQuery } from "../../queries/useAnimalQuery";
// import { useCustomerQuery } from "../../queries/useCustomerQuery";
// import { useDoctorQuery } from "../../queries/useDoctorQuery";
// import { useWorkdayQuery } from "../../queries/useWorkdayQuery";
import { useReportQuery } from "../../queries/useReportQuery";
import { useAppointmentQuery } from "../../queries/useAppointmentQuery";

//Types
import { ReportType, initialReport } from "./types";
// import { CustomerType } from "../Customer/types";
import { AnimalType } from "../Animal/types";
// import { DoctorType } from "../Doctor/types";
import { WorkdayDoctorType } from "../Workday/types";
import {
  AppointmentType,
  initialSearchByDoctorDate,
} from "../Appointment/types";

// Mui Select Input
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputTextField from "../../components/InputTextField";

// Mui Time Input
// import dayjs, { Dayjs } from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const Report = () => {
  // States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newReport, setNewReport] = useState(initialReport);
  const [updatedReport, setUpdatedReport] = useState(initialReport);

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
  const { listReports, addReport, removeReport } = useReportQuery(page, size);
  // const { listAnimals } = useAnimalQuery(page, 99, "", "");
  // const { listCustomers } = useCustomerQuery(page, 99, "");
  // const { listDoctors } = useDoctorQuery(page, 99);
  // const { listWorkdays } = useWorkdayQuery();
  const { listAppointments } = useAppointmentQuery(
    0,
    99,
    initialSearchByDoctorDate,
    initialSearchByDoctorDate
  );

  const reports = listReports.data?.data.content;
  // const animals = listAnimals.data?.data.content;
  // const customers = listCustomers.data?.data.content;
  // const doctors = listDoctors.data?.data.content;
  const appointments = listAppointments.data?.data.content;
  // const workdays = listWorkdays.data?.data.content;

  const totalPages = listReports.data?.data.totalPages;

  // ADD
  // Add Button
  const handleAdd = () => {
    addReport.mutate(newReport);
    setNewReport(initialReport);
    setDoctorAvailableDates([]);
    setSelectedCustomerId("");
  };

  // // Doctor Select Input
  // const doctorSelectionChange = (e: SelectChangeEvent<string>) => {
  //   const selectedDoctor = doctors.find(
  //     (item: DoctorType) => item.id === +e.target.value
  //   );
  //   setNewReport({ ...newReport, doctor: selectedDoctor });

  //   setDoctorAvailableDates(() =>
  //     workdays.filter(
  //       (item: { doctor: DoctorType; id: number }) =>
  //         item.doctor.id === +e.target.value
  //     )
  //   );
  // };

  // // Day Select Input
  // const dateSelectionChange = (e: SelectChangeEvent<string>) => {
  //   const { value } = e.target;
  //   setDate({ ...date, dateInput: value });
  //   setNewReport({
  //     ...newReport,
  //     reportDate: value + "T" + newReport.reportDate?.split("T")[1],
  //   });
  // };

  // // Hour Select Input
  // const hourSelectionChange = (e: Dayjs | null) => {
  //   const hour = e?.format().split("T")[1].slice(0, 5);
  //   setNewReport({
  //     ...newReport,
  //     reportDate: date.dateInput + "T" + hour,
  //   });
  // };

  // // Customer Select Input
  // const customerSelectionChange = (e: SelectChangeEvent<string>) => {
  //   setFilteredAnimals(() =>
  //     animals.filter((item: AnimalType) => item.customer.id === +e.target.value)
  //   );
  //   setSelectedCustomerId(e.target.value);
  // };

  // // Animal Select Input
  // const animalSelectionChange = (e: SelectChangeEvent<string>) => {
  //   const selectedAnimal = animals.find(
  //     (item: AnimalType) => item.id === +e.target.value
  //   );
  //   setNewReport({ ...newReport, animal: selectedAnimal });
  // };

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeReport.mutate(id);
  };

  // UPDATE
  // const handleEdit = (item: ReportType) => {
  //   setUpdatedReport(item);
  //   setDate({ ...date, dateUpdate: item.reportDate?.split("T")[0] });

  //   setDoctorAvailableDates(() =>
  //     workdays.filter(
  //       (workday: { doctor: DoctorType; id: number }) =>
  //         workday.doctor.id === item.doctor.id
  //     )
  //   );

  //   setFilteredAnimals(() =>
  //     animals.filter(
  //       (animal: AnimalType) => animal.customer.id === item.animal.customer.id
  //     )
  //   );
  // };

  // const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = e.target;
  //   setDate({ ...date, dateUpdate: value });
  //   const updatedReportDate =
  //     value + "T" + updatedReport.reportDate?.split("T")[1].slice(0, 5);

  //   setUpdatedReport({
  //     ...updatedReport,
  //     reportDate: updatedReportDate,
  //   });
  // };

  // const handleHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const updatedTime = e.target.value;
  //   const updatedDate = updatedReport.reportDate?.split("T")[0];
  //   setUpdatedReport({
  //     ...updatedReport,
  //     reportDate: updatedDate + "T" + updatedTime,
  //   });
  // };

  // const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
  //   const id = e.currentTarget.id;
  //   console.log(updatedReport);
  //   updateReport.mutate({ id, data: updatedReport });
  //   setUpdatedReport(initialReport);
  // };

  // DATA SIZE ON PAGE
  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(+e.target.value);
  };

  return (
    <>
      <div className="pageHeader">Rapor Yönetimi</div>
      <div className="pageListHeader">Rapor Listesi</div>

      <div className="filterContainer">
        <div className="searchContainer"></div>
        <div className="listSize">
          <p>Tabloda Gösterilecek Rapor Sayısı</p>
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
            <th>Başlık</th>
            <th>Teşhis</th>
            <th>Ücret</th>
            <th>Hayvan Adı</th>
            <th>Doktor Adı</th>
            <th>Müşteri Adı</th>
            <th>Randevu Tarihi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {reports?.map((item: ReportType) =>
            updatedReport?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    name="title"
                    value={updatedReport.title}
                    type="text"
                    // onChange={handleFieldChange}
                  />
                </td>

                <td>
                  <input
                    name="diagnosis"
                    value={updatedReport.diagnosis}
                    type="text"
                    // onChange={handleFieldChange}
                  />
                </td>

                <td>
                  <input
                    name="price"
                    value={updatedReport.price}
                    type="number"
                    // onChange={handleFieldChange}
                  />
                </td>

                <td>{appointments.animal.name}</td>
                <td>{appointments.doctor.name}</td>
                <td>{appointments.animal.customer.name}</td>

                <td>
                  <select
                    value={date.dateUpdate}
                    name="day"
                    // onChange={handleDayChange}
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
                    // value={updatedReport.reportDate?.split("T")[1].slice(0, 5)}
                    // onChange={handleHourChange}
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

                <td>
                  <button
                    className="iconSave"
                    id={item.id?.toString()}
                    // onClick={handleUpdate}
                  >
                    <IconSave />
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                {/* // handle edit kismi */}
                <td>{item.title}</td>
                <td>{item.diagnosis}</td>
                <td>{item.price} TL</td>
                <td>{item.appointment.animalName}</td>
                <td>{item.appointment.doctorName}</td>
                <td>{item.appointment.customerName}</td>
                <td>
                  {item.appointment.date.split("T")[0]} -{" "}
                  {item.appointment.date.split("T")[1].slice(0, 5)}
                </td>
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
        <div className="pageInputsHeader">Rapor Ekle</div>
        <InputTextField
          label="Başlık Adı"
          name="name"
          // value={newAnimal.name}
          value=""
          type="text"
          // onChange={animalInputChange}
          onChange={() => console.log()}
        />
        <InputTextField
          label="Teşhis"
          name="name"
          // value={newAnimal.name}
          value=""
          type="text"
          // onChange={animalInputChange}
          onChange={() => console.log()}
        />
        <InputTextField
          label="Ücret"
          name="name"
          // value={newAnimal.name}
          value=""
          type="number"
          // onChange={animalInputChange}
          onChange={() => console.log()}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Randevu Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={newAppointment.doctor.id?.toString() || ""}
              label="Randevu Seçiniz"
              // onChange={doctorSelectionChange}
            >
              {appointments?.map((item: AppointmentType) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.doctor.name} - {item.animal.name} - Tarih:{" "}
                  {item.appointmentDate.split("T")[0]} - Saat:{" "}
                  {item.appointmentDate.split("T")[1].slice(0, 5)}
                </MenuItem>
              ))}
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

export default Report;
