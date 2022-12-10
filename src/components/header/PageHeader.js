import './PageHeader.css';
import ProgressBar from "../progress.bar/ProgressBar";

const STEPS_COUNT = 3;

function PageHeader({step, title, children}) {
    return (
        <div className="page-header">
            <ProgressBar stepsCount={STEPS_COUNT} currentStep={step} className="page-header__progress-bar"/>
            <h1 className="title title-primary page-header__title">{title}</h1>
            <p className="page-header__desc">
                {children}
            </p>
        </div>
    );
}

export default PageHeader;
