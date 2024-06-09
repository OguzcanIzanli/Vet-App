import { useState, ChangeEvent, MouseEvent } from "react";

//Queries
import { useDoctorQuery } from "../../queries/useDoctorQuery";
import { useWorkdayQuery } from "../../queries/useWorkdayQuery";

// Types
import { DoctorType } from "../Doctor/types";
import {
  WorkdayDoctorType,
  initialWorkday,
  initialWorkdayDoctor,
} from "../Workday/types";

// Components
import OperationButton from "../../components/OperationButton";
import Toast from "../../components/Toast";

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

const Workday = () => {
  // States
  const [newDate, setNewDate] = useState(initialWorkday);
  const [doctorAvailableDates, setDoctorAvailableDates] = useState<
    WorkdayDoctorType[]
  >([]);
  const [updatedWorkday, setUpdatedWorkday] = useState(initialWorkdayDoctor);
  const localDate = new Date().toISOString().split("T")[0];

  // Queries
  const {
    addWorkday,
    listWorkdays,
    removeWorkday,
    updateWorkday,
    toast,
    resetToast,
  } = useWorkdayQuery();
  const { listDoctors } = useDoctorQuery(0, 10);

  const doctors = listDoctors.data?.data.content;
  const workdays = listWorkdays.data?.data.content;

  // Remove
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, name } = e.currentTarget;
    removeWorkday.mutate(id);
    const updatedDates = doctorAvailableDates.filter(
      (date) => date.workDay !== name
    );
    setDoctorAvailableDates(updatedDates);
  };

  // Add
  const handleAdd = () => {
    addWorkday.mutate(newDate);
    setNewDate(initialWorkday);
    setDoctorAvailableDates([]);
  };

  const doctorSelectionChange = (e: SelectChangeEvent<string>) => {
    const doctorDates = workdays.filter(
      (item: { doctor: { id: number } }) =>
        item.doctor.id === Number(e.target.value)
    );
    setDoctorAvailableDates(doctorDates);

    setNewDate({ ...newDate, doctorId: Number(e.target.value) });
  };

  const dateSelectionChange = (e: Dayjs | null) => {
    const formattedDate = e?.format().slice(0, e?.format().indexOf("T"));
    setNewDate({
      ...newDate,
      workDay: formattedDate,
    });
  };

  // Update
  const handleEdit = (item: WorkdayDoctorType) => {
    setUpdatedWorkday(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (updatedWorkday) {
      const { value } = e.target;
      setUpdatedWorkday({
        ...updatedWorkday,
        workDay: value,
      });
    }
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;

    const data = {
      workDay: updatedWorkday.workDay,
      doctorId: Number(updatedWorkday.doctor.id),
    };

    updateWorkday.mutate({ id, data });
    console.log("id:", id, "Putted Workday:", data);
    setUpdatedWorkday(initialWorkdayDoctor);
  };

  return (
    <div className="inputDoctorDateContainer">
      <div className="pageInputsHeader">Doktor İçin Tarih Ekle</div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Doktor Seçiniz</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newDate.doctorId !== -1 ? newDate.doctorId.toString() : ""}
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
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={null}
            onChange={dateSelectionChange}
            minDate={dayjs(localDate)}
          />
        </DemoContainer>
      </LocalizationProvider>

      <OperationButton className="addBtn" onClick={handleAdd} icon="send">
        Ekle
      </OperationButton>

      <table id="table">
        <thead>
          <tr>
            <th>Seçilen Doktor için Eklenen Tarihler</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {doctorAvailableDates.length === 0 ? (
            <tr>
              <td>Lütfen Doktor Seçimi Yapınız veya Tarih Ekleyiniz</td>
            </tr>
          ) : (
            doctorAvailableDates.map((item) =>
              updatedWorkday?.id === item.id ? (
                <tr key={item.id}>
                  <td>
                    <input
                      type="date"
                      name="name"
                      value={updatedWorkday.workDay}
                      onChange={handleFieldChange}
                    />
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
                  <td>{item.workDay}</td>
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
            )
          )}
        </tbody>
      </table>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={resetToast} />
      )}
    </div>
  );
};

export default Workday;
