export function CalendarOnChangeAdapter(field, onChangeCallback) {
    return value => {
        field.onChange(value);
        field.onBlur();
        onChangeCallback(value);
    }
}
