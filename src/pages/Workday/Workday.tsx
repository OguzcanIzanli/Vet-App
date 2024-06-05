import { useState } from "react";
import { useDoctorQuery } from "../../queries/useDoctorQuery";
import { useWorkdayQuery } from "../../queries/useWorkdayQuery";
import { DoctorType } from "../Doctor/types";
import {
  WorkdayDoctorType,
  initialWorkday,
  initialWorkdayDoctor,
} from "../Workday/types";
import IconSend from "../../assets/icons/IconSend";
import IconSave from "../../assets/icons/IconSave";
import IconDelete from "../../assets/icons/IconDelete";
import { MouseEvent } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Workday = () => {
  const { listDoctors } = useDoctorQuery(0, 10);
  const { addWorkday, listWorkdays, removeWorkday, updateWorkday } =
    useWorkdayQuery();

  const [newDate, setNewDate] = useState(initialWorkday);
  const [doctorAvailableDates, setDoctorAvailableDates] = useState<
    WorkdayDoctorType[]
  >([]);

  const doctors = listDoctors.data?.data.content;
  const workdays = listWorkdays.data?.data.content;

  const [updatedWorkday, setUpdatedWorkday] = useState(initialWorkdayDoctor);

  // ADD
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
      workDate: formattedDate,
    });
  };

  const handleDateAdd = () => {
    addWorkday.mutate(newDate);
    console.log(newDate);
    setNewDate(initialWorkday);
    setDoctorAvailableDates([]);
  };

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, name } = e.currentTarget;
    removeWorkday.mutate(id);
    const updatedDates = doctorAvailableDates.filter(
      (date) => date.workDay !== name
    );
    setDoctorAvailableDates(updatedDates);
  };

  // UPDATE
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
    console.log(updatedWorkday);
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;

    const data = {
      workdate: updatedWorkday.workDay,
      doctorId: Number(updatedWorkday.doctor.id),
    };

    console.log(id);
    console.log(data);
    updateWorkday.mutate({ id, data });
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
          <DatePicker value={null} onChange={dateSelectionChange} />
        </DemoContainer>
      </LocalizationProvider>

      <button className="addBtn" onClick={handleDateAdd}>
        Tarih Ekle <IconSend />
      </button>

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
                  <td onClick={() => handleEdit(item)}>{item.workDay}</td>
                  <td>
                    <button
                      className="iconDelete"
                      id={item.id}
                      name={item.workDay}
                      onClick={handleRemove}
                    >
                      <IconDelete />
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Workday;
