import { useState, ChangeEvent, MouseEvent } from "react";

// Icons
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";

// Components
import Pagination from "../../components/Pagination";

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
  initialSearchByDoctorDate,
} from "../Appointment/types";

// Mui Select Input
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputTextField from "../../components/InputTextField";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconEdit from "../../assets/icons/IconEdit";

const Report = () => {
  // States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newReport, setNewReport] = useState(initialReport);
  const [updatedReport, setUpdatedReport] = useState(initialReport);

  // Queries
  const { listReports, addReport, removeReport, updateReport } = useReportQuery(
    page,
    size
  );
  const { listAppointments } = useAppointmentQuery(
    0,
    99,
    initialSearchByDoctorDate,
    initialSearchByDoctorDate
  );

  const reports = listReports.data?.data.content;
  const appointments = listAppointments.data?.data.content;
  const totalPages = listReports.data?.data.totalPages;

  // ADD
  // Add Button
  const handleAdd = () => {
    addReport.mutate(newReport);
    setNewReport(initialReport);
  };

  const reportInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({ ...prev, [name]: value }));
  };

  // Animal Select Input
  const appointmentSelectionChange = (e: SelectChangeEvent<string>) => {
    setNewReport({ ...newReport, appointmentId: +e.target.value });
  };

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeReport.mutate(id);
  };

  // UPDATE
  const handleEdit = (item: ReportType) => {
    setUpdatedReport(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedReport({
      ...updatedReport,
      [name]: value,
    });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    updateReport.mutate({ id, data: updatedReport });
    setUpdatedReport(initialReportGet);
  };

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
                  <button
                    className="iconEdit"
                    onClick={() =>
                      handleEdit({
                        title: item.title,
                        diagnosis: item.diagnosis,
                        price: item.price,
                        appointmentId: item.appointment.id,
                      })
                    }
                  >
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
              {appointments?.map((item: AppointmentType) => (
                <MenuItem key={item.id} value={item.id}>
                  Doktor: {item.doctor.name} - Hayvan: {item.animal.name} -
                  Tarih: {item.appointmentDate?.split("T")[0]} - Saat:{" "}
                  {item.appointmentDate?.split("T")[1].slice(0, 5)}
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
