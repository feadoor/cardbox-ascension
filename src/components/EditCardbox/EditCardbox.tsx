import React, { useState, FormEvent } from 'react';
import './EditCardbox.css';

export interface EditCardboxProps {
    cardbox: string;
    duration: number;
    offset: number;
    onChangesSaved: (duration: number, offset: number, words: string[]) => void;
}

const EditCardbox: React.FC<EditCardboxProps> = ({ cardbox, duration: _duration, offset: _offset, onChangesSaved }) => {

    const [duration, setDuration] = useState(_duration);
    const [offset, setOffset] = useState(_offset);
    const [words, setWords] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onChangesSaved(duration, offset, words.split(/\s+/).filter(w => w.length > 0));
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
                    Offset
                    <input className="edit-cardbox__form-input" type="number" required value={offset} onChange={e => setOffset(+e.target.value)}></input>
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
