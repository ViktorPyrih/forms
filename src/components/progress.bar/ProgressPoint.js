import './ProgressPoint.css';

function ProgressPoint({filled}) {
    return (
        <figure className={`progress-point ${filled && "progress-point_background_blue"}`}/>
    );
}

export default ProgressPoint;
