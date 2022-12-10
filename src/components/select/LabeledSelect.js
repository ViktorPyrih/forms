import './LabeledSelect.css';
import AsyncSelect from "react-select/async";
import {contains, isNotEmpty} from "../../utils/StringUtils";
import {Controller, useFormState} from "react-hook-form";
import {REQUIRED} from "../../utils/Validation";
import {SelectOnChangeAdapter} from "../../utils/adapter/SelectOnChangeAdapter";

const SEARCH_RESULTS_COUNT = 30;

function LabeledSelect({id, name, label, options, onChange = () => {}, control}) {
    const {errors} = useFormState({control});
    return (
        <div className="labeled-select">
            <label htmlFor={id} className="label label_primary label_color_dark labeled-select__label">
                {label}
            </label>
            <Controller name={name} control={control} rules={REQUIRED} render={({field}) => (
                <AsyncSelect {...field} defaultOptions={options.slice(0, SEARCH_RESULTS_COUNT)}
                             loadOptions={(input, callback) => callback(filterOptionsByInput(options, input))}
                             className={`select labeled-select__select ${errors[name] && "invalid"}`}
                             onChange={SelectOnChangeAdapter(field, onChange)}
                />
            )}/>
        </div>
    );
}

function filterOptionsByInput(options, input) {
    let filteredOptions = options;
    if (isNotEmpty(input)) {
        filteredOptions = options.filter(option => contains(option.value, input));
    }

    return filteredOptions.slice(0, SEARCH_RESULTS_COUNT);
}

export default LabeledSelect;
