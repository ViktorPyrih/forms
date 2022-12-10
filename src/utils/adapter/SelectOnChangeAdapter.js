export function SelectOnChangeAdapter(field, onChangeCallback) {
    return value => {
        field.onChange(value);
        onChangeCallback(value);
    }
}
