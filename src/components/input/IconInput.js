import './IconInput.css';

function IconInput({img, value, register}) {
    return (
        <div className="icon-input">
            <img src={img} alt="Icon" className="icon-input__img"/>
            <input {...register} type="text" value={value} className="input icon-input__input"/>
        </div>
    );
}

export default IconInput;
