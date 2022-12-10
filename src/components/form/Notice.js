import './Notice.css';
import editIcon from "../../assets/edit-icon.svg";

function Notice({children, message, editable, onEdit = () => {}}) {
    return (
        <div className="form-frame form-frame_padding_16px phone-number-container">
            <p className="phone-number-container__number">
                {children}
            </p>
            <div className="phone-number-container-notice">
                <p className="label phone-number-container-notice__text">
                    {message}
                </p>
                {
                    editable && <button className="phone-number-container-notice__btn" onClick={onEdit}>
                        <img src={editIcon} alt="Edit" className="phone-number-container-notice__img"/>
                    </button>
                }
            </div>
        </div>
    );
}

export default Notice;
