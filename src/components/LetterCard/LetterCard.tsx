import React from 'react';
import './LetterCard.css';

export interface LetterCardProps {
    letter: string;
}

const LetterCard: React.FC<LetterCardProps> = ({ letter }) => {
    return (
        <div className="letter-card">{letter}</div>
    );
};

export default LetterCard;
