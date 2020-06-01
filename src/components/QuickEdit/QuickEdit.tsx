import React, { useState } from 'react';
import './QuickEdit.css';

export interface QuickEditProps {
    actions: {name: string, action: () => Promise<any>}[];
}

const QuickEdit: React.FC<QuickEditProps> = ({ actions }) => {

    const [inProgress, setInProgress] = useState(false);

    const performAction = (action: () => Promise<void>): void => {
        setInProgress(true);
        action().finally(() => setInProgress(false));
    }

    return (
        <div className="quick-edit">
            {inProgress && <div className="quick-edit__processing">Processing...</div>}
            {!inProgress && actions.map(({name, action}, idx) =>
                <button className="quick-edit__button" key={idx} onClick={() => performAction(action)}>{name}</button>
            )}
        </div>
    );
};

export default QuickEdit;
