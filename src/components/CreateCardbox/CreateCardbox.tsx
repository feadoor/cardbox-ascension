import React, { useState, FormEvent } from 'react';
import './CreateCardbox.css';

export interface CreateCardboxProps {
    onCreate: (name: string, duration: number) => void;
}

const CreateCardbox: React.FC<CreateCardboxProps> = ({ onCreate }) => {

    const [name, setName] = useState('')
    const [duration, setDuration] = useState(10);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onCreate(name, duration);
    }

    return (
        <div className="create-cardbox">
            <div className="create-cardbox__title">Create Cardbox</div>
            <form className="create-cardbox__form" onSubmit={handleSubmit}>
            <label className="create-cardbox__form-field">
                    Name
                    <input className="create-cardbox__form-input" type="text" required value={name} onChange={e => setName(e.target.value)}></input>
                </label>
                <label className="create-cardbox__form-field">
                    Duration
                    <input className="create-cardbox__form-input" type="number" required value={duration} onChange={e => setDuration(+e.target.value)}></input>
                </label>
                <button type="submit" className="create-cardbox__form-button">Save Changes</button>
            </form>
        </div>
    );
};

export default CreateCardbox;
