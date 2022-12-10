import './ProgressBar.css';
import {range} from "../../utils/ArrayUtils";
import ProgressPoint from "./ProgressPoint";
import ProgressLine from "./ProgressLine";
import {useMemo} from "react";

function ProgressBar({stepsCount, currentStep, className}) {
    const elementsCount = useMemo(() => calculateElementOrdinal(stepsCount), [stepsCount]);
    const currentElement = calculateElementOrdinal(currentStep);
    return (
        <div className={`progress-bar ${className}`}>
            {
                range(1, elementsCount).map(element => {
                        if (element % 2 === 0) {
                            return <ProgressLine filled={element < currentElement} key={element}/>;
                        }

                        return <ProgressPoint filled={element <= currentElement} key={element}/>;
                    }
                )
            }
        </div>
    );
}

function calculateElementOrdinal(step) {
    return step * 2 - 1;
}

export default ProgressBar;
