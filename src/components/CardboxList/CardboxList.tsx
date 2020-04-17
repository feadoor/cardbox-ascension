import React from 'react';
import './CardboxList.css';

import CardboxSummary from '../CardboxSummary/CardboxSummary';
import { Link } from 'react-router-dom';

export interface CardboxListProps {
    cardboxes: {name: string, size: number, hasQuestionsDue: boolean}[];
}

const CardboxList: React.FC<CardboxListProps> = ({ cardboxes }) => {
    return (
        <div className="cardbox-list">
            {cardboxes.map((cardbox, idx) =>
                <CardboxSummary {...cardbox} key={idx}></CardboxSummary>
            )}
            <Link to="/create" className="cardbox-list__fake-summary">
                <div className="cardbox-list__plus-line--vertical"></div>
                <div className="cardbox-list__plus-line--horizontal"></div>
            </Link>
        </div>
    );
};

export default CardboxList;
