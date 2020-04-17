import React, { useState, FormEvent } from 'react';
import './EditCardbox.css';

export interface EditCardboxProps {
    cardbox: string;
    duration: number;
    onChangesSaved: (duration: number, words: string[]) => void;
}

const EditCardbox: React.FC<EditCardboxProps> = ({ cardbox, duration: _duration, onChangesSaved }) => {

    const [duration, setDuration] = useState(_duration);
    const [words, setWords] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onChangesSaved(duration, words.split(/\s+/));
    }

    return (
        <div className="edit-cardbox">
            <div className="edit-cardbox__title">Edit {cardbox}</div>
            <form className="edit-cardbox__form" onSubmit={handleSubmit}>
                <label className="edit-cardbox__form-field">
                    Duration
                    <input className="edit-cardbox__form-input" type="number" required value={duration} onChange={e => setDuration(+e.target.value)}></input>
                </label>
                <label className="edit-cardbox__form-field">
                    Add words
                    <textarea className="edit-cardbox__form-textarea" value={words} onChange={e => setWords(e.target.value)}></textarea>
                </label>
                <button type="submit" className="edit-cardbox__form-button">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCardbox;
