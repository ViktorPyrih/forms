import './FormHeader.css';

function FormHeader({title, children}) {
    return (
        <div className="form-header">
            <h2 className="title title-secondary form-header__title">
                {title}
            </h2>
            <p className="form-header__desc">
                {children}
            </p>
        </div>
    );
}

export default FormHeader;
