import { useState, ChangeEvent, MouseEvent } from "react";
import { useDoctorQuery } from "../../queries/useDoctorQuery";
import { DoctorType, initialDoctor } from "./types";
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";
import Pagination from "../../components/Pagination";
// import InputSelect from "../../components/InputSelect";
import InputTextField from "../../components/InputTextField";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Doctor = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const { listDoctors, addDoctor, removeDoctor, updateDoctor } = useDoctorQuery(
    page,
    size
  );

  const [newDoctor, setNewDoctor] = useState(initialDoctor);
  const [updatedDoctor, setUpdatedDoctor] = useState(initialDoctor);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType>();

  const doctors = listDoctors.data?.data.content;
  const totalPages = listDoctors.data?.data.totalPages;

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    removeDoctor.mutate(id);
  };

  // ADD
  const handleAdd = () => {
    addDoctor.mutate(newDoctor);
    setNewDoctor(initialDoctor);
  };

  const doctorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  // UPDATE
  const handleEdit = (item: DoctorType) => {
    setUpdatedDoctor(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (updatedDoctor) {
      const { name, value } = e.target;
      setUpdatedDoctor({
        ...updatedDoctor,
        [name]: value,
      });
    }
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    updateDoctor.mutate({ id, data: updatedDoctor });
    setUpdatedDoctor(initialDoctor);
  };

  // DATA SIZE ON PAGE
  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSize(Number(value));
  };

  // DOCTOR SELECTION

  const doctorSelectionChange = (e: SelectChangeEvent<string>) => {
    const doctor = doctors?.find(
      (doc: DoctorType) => doc.id === e.target.value
    );
    setSelectedDoctor(doctor);
    console.log(doctor);
  };

  return (
    <>
      <div className="pageHeader">Doktor Yönetimi</div>
      <div className="pageListHeader">Doktor Listesi</div>

      <div className="filterContainer">
        <div className="searchInput"></div>
        <div className="listSize">
          <p>Sayfada Gösterilecek Doktor Sayısı</p>
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
            <th>Doktor Adı</th>
            <th>Doktor Email</th>
            <th>Doktor Adres</th>
            <th>Doktor Yaşadığı Şehir</th>
            <th>Doktor Telefon</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {doctors?.map((item: DoctorType) =>
            updatedDoctor?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={updatedDoctor.name}
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="email"
                    value={updatedDoctor.email}
                    type="email"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="address"
                    value={updatedDoctor.address}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="city"
                    value={updatedDoctor.city}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="phone"
                    value={updatedDoctor.phone}
                    type="number"
                    onChange={handleFieldChange}
                  />
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
                <td onClick={() => handleEdit(item)}>{item.name}</td>
                <td onClick={() => handleEdit(item)}>{item.email}</td>
                <td onClick={() => handleEdit(item)}>{item.address}</td>
                <td onClick={() => handleEdit(item)}>{item.city}</td>
                <td onClick={() => handleEdit(item)}>{item.phone}</td>
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

      <div className="inputsContainer">
        <div className="inputContainer">
          <div className="pageInputsHeader">Doktor Ekle</div>
          <InputTextField
            label="Doktor Adı"
            name="name"
            value={newDoctor.name}
            type="text"
            onChange={doctorInputChange}
          />
          <InputTextField
            label="Doktor Email"
            name="email"
            value={newDoctor.email}
            type="email"
            onChange={doctorInputChange}
          />
          <InputTextField
            label="Doktor Adres"
            name="address"
            value={newDoctor.address}
            type="text"
            onChange={doctorInputChange}
          />
          <InputTextField
            label="Doktor Yaşadığı Şehir"
            name="city"
            value={newDoctor.city}
            type="text"
            onChange={doctorInputChange}
          />
          <InputTextField
            label="Doktor Telefon"
            name="phone"
            value={newDoctor.phone}
            type="number"
            onChange={doctorInputChange}
          />
          <button className="addBtn" onClick={handleAdd}>
            Ekle <IconSend />
          </button>
        </div>
        <div className="inputDoctorDateContainer">
          <div className="pageInputsHeader">Doktor İçin Uygun Tarih Ekle</div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Doktor Seçiniz
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDoctor?.name}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ minWidth: 305 }}>
              <DateTimePicker
                value={value}
                onChange={setValue}
                referenceDate={dayjs("2022-04-17T15:30")}
              />
              <Typography>
                Stored value: {value == null ? "null" : value.format()}
              </Typography>
            </Stack>
          </LocalizationProvider>
          <button className="addBtn" onClick={handleAdd}>
            Ekle <IconSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default Doctor;
