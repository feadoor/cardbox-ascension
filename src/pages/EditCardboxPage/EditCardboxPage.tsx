import React, { useState } from 'react';
import './EditCardboxPage.css';

import { match, Redirect } from 'react-router-dom';
import NetworkedEditCardbox from '../../containers/NetworkedEditCardbox/NetworkedEditCardbox';

export interface EditCardboxPageParams {
    cardbox: string;
}

export interface EditCardboxPageProps {
    match: match<EditCardboxPageParams>;
}

const EditCardboxPage: React.FC<EditCardboxPageProps> = ({ match }) => {

    const [isRedirecting, setIsRedirecting] = useState(false);

    if (isRedirecting) { return <Redirect to='/'></Redirect>; }

    return (
        <div className="edit-cardbox-page">
            <NetworkedEditCardbox cardbox={match.params.cardbox} afterChangesSaved={() => setIsRedirecting(true)}></NetworkedEditCardbox>
        </div>
    );
}

export default EditCardboxPage;
