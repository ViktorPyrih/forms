import './LabeledCalendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import {Controller, useFormState} from "react-hook-form";
import {DATE_OF_BIRTH} from "../utils/Validation";
import {CalendarOnChangeAdapter} from "../utils/adapter/CalendarOnChangeAdapter";
import {EIGHTEEN_YEARS_AGO_DATE} from "../utils/Constants";

function LabeledCalendar({name, label, control}) {
    const {errors} = useFormState({control});
    const [selectedDate, setSelectedDate] = useState(EIGHTEEN_YEARS_AGO_DATE);
    return (
        <div className={`labeled-calendar ${errors[name] && "invalid"}`}>
            <label className="label label_primary label_color_dark labeled-calendar__label">
                {label}
            </label>
            <Controller name={name} control={control} rules={DATE_OF_BIRTH} defaultValue={selectedDate} render={({field}) => (
                <DatePicker {...field} selected={selectedDate} onChange={CalendarOnChangeAdapter(field, setSelectedDate)}/>
            )}/>
        </div>
    );
}

export default LabeledCalendar;
