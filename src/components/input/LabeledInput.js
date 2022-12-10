import './LabeledInput.css';
import eyeIcon from '../../assets/eye-icon.svg';

const PASSWORD = "password";

function LabeledInput({id, type = "text", placeholder = "", label, className = "", register, error}) {
    const input = register.ref;
    return (
        <div className="labeled-input">
            <label htmlFor={id} className="label label_primary label_color_dark labeled-input__label">
                {label}
            </label>
            <div className="input-wrapper">
                <input {...register} id={id} type={type} placeholder={placeholder} ref={input}
                       className={`input labeled-input__input ${className} ${error && "invalid"}`}/>
                {
                    type === PASSWORD &&
                    <button type="button" className="labeled-input__eye-btn"
                            onMouseDown={() => input.current.type = "text"}
                            onMouseUp={() => input.current.type = "password"}>
                        <img src={eyeIcon} alt="Show" className="labeled-input__eye-img"/>
                    </button>
                }
            </div>
        </div>
    );
}

export default LabeledInput;
