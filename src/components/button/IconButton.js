import './IconButton.css';

function IconButton({children, onClick}) {
    return (
        <button type="button" onClick={onClick} className="icon-btn">
            {children}
        </button>
    );
}

export default IconButton;
