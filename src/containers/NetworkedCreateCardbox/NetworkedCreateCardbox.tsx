import React from 'react';

import CreateCardbox from '../../components/CreateCardbox/CreateCardbox';
import { createCardbox } from '../../services/cardboxService';

export interface NetworkedCreateCardboxProps {
    afterCreate: () => void;
}

const NetworkedCreateCardbox: React.FC<NetworkedCreateCardboxProps> = ({ afterCreate }) => {

    const doCreate = (name: string, duration: number) => createCardbox(name, duration)
        .then(afterCreate);

    return (
        <CreateCardbox onCreate={doCreate}></CreateCardbox>
    );
};

export default NetworkedCreateCardbox;
