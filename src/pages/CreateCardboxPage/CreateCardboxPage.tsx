import React, { useState } from 'react';
import './CreateCardboxPage.css';

import { Redirect } from 'react-router-dom';
import NetworkedCreateCardbox from '../../containers/NetworkedCreateCardbox/NetworkedCreateCardbox';

const CreateCardboxPage: React.FC = () => {

    const [isRedirecting, setIsRedirecting] = useState(false);

    if (isRedirecting) { return <Redirect to='/'></Redirect>; }

    return (
        <div className="create-cardbox-page">
            <NetworkedCreateCardbox afterCreate={() => setIsRedirecting(true)}></NetworkedCreateCardbox>
        </div>
    );
}

export default CreateCardboxPage;
