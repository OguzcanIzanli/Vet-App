import { useState, ChangeEvent, MouseEvent } from "react";

//Queries
import { useReportQuery } from "../../queries/useReportQuery";
import { useAppointmentQuery } from "../../queries/useAppointmentQuery";

//Types
import {
  ReportGetType,
  ReportType,
  initialReport,
  initialReportGet,
} from "./types";
import {
  AppointmentType,
  initialSearchByDoctorAnimalAndDateRange,
} from "../Appointment/types";

// Components
import Pagination from "../../components/Pagination";
import InputTextField from "../../components/MUI/InputTextField";
import OperationButton from "../../components/OperationButton";
import Toast from "../../components/Toast";
import ListSizeSelector from "../../components/ListSizeSelector";

// MUI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

const Report = () => {
  // States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newReport, setNewReport] = useState(initialReport);
  const [updatedReport, setUpdatedReport] = useState(initialReport);

  // Queries
  const {
    listReports,
    addReport,
    removeReport,
    updateReport,
    toast,
    resetToast,
  } = useReportQuery(page, size);
  const { listAppointments } = useAppointmentQuery(
    0,
    99,
    initialSearchByDoctorAnimalAndDateRange
  );

  const reports = listReports.data?.data.content;
  const appointments = listAppointments.data?.data.content;
  const totalPages = listReports.data?.data.totalPages;

  // Remove
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeReport.mutate(id);
  };

  // Add
  const handleAdd = () => {
    addReport.mutate(newReport);
    setNewReport(initialReport);
  };

  const reportInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setNewReport((prev) => ({ ...prev, [name]: newValue }));
  };

  // Animal Select Input
  const appointmentSelectionChange = (e: SelectChangeEvent<string>) => {
    setNewReport({ ...newReport, appointmentId: +e.target.value });
  };

  // Update
  const handleEdit = (item: ReportType) => {
    setUpdatedReport(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setUpdatedReport({
      ...updatedReport,
      [name]: newValue,
    });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    updateReport.mutate({ id, data: updatedReport });
    setUpdatedReport(initialReportGet);
  };

  return (
    <div className="pageContainer">
      <div className="pageHeader">Rapor Yönetimi</div>
      <div className="pageListHeader">Rapor Listesi</div>

      <div className="filterContainer">
        <div className="searchContainer"></div>
        <ListSizeSelector size={size} onSizeChange={setSize} label="Rapor" />
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
          {reports?.map((item: ReportGetType) =>
            updatedReport?.appointmentId === item.appointment.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    name="title"
                    value={updatedReport.title}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>

                <td>
                  <input
                    name="diagnosis"
                    value={updatedReport.diagnosis}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>

                <td>
                  <input
                    name="price"
                    value={updatedReport.price}
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
                <td className="operationBtns">
                  <OperationButton
                    className="editBtn"
                    onClick={() =>
                      handleEdit({
                        title: item.title,
                        diagnosis: item.diagnosis,
                        price: item.price,
                        appointmentId: item.appointment.id,
                      })
                    }
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
        <div className="pageInputsHeader">Rapor Ekle</div>
        <InputTextField
          label="Başlık Adı"
          name="title"
          value={newReport.title}
          type="text"
          onChange={reportInputChange}
        />
        <InputTextField
          label="Teşhis"
          name="diagnosis"
          value={newReport.diagnosis}
          type="text"
          onChange={reportInputChange}
        />
        <FormControl fullWidth onChange={reportInputChange}>
          <InputLabel htmlFor="outlined-adornment-amount">Ücret</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            name="price"
            value={newReport.price}
            startAdornment={<InputAdornment position="start">₺</InputAdornment>}
            label="Ücret"
            type="number"
          />
        </FormControl>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Randevu Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={
                newReport.appointmentId
                  ? newReport.appointmentId.toString()
                  : ""
              }
              label="Randevu Seçiniz"
              onChange={appointmentSelectionChange}
            >
              {appointments && appointments.length > 0 ? (
                appointments?.map((item: AppointmentType) => (
                  <MenuItem key={item.id} value={item.id}>
                    Doktor: {item.doctor.name} - Hayvan: {item.animal.name} -
                    Tarih: {item.appointmentDate?.split("T")[0]} - Saat:{" "}
                    {item.appointmentDate?.split("T")[1].slice(0, 5)}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  Kayıtlı Randevu Bulunamadı!
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

export default Report;
