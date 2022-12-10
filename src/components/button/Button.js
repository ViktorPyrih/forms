import './Button.css';

function Button({children, primary, className = ""}) {
    return (
        <button className={`btn ${primary && "btn-primary"} ${className}`}>
            {children}
        </button>
    );
}

export default Button;
