import './ProgressLine.css';

function ProgressLine({filled}) {
    return (
        <figure className={`progress-line ${filled && "progress-line_background_blue"}`}/>
    );
}

export default ProgressLine;
