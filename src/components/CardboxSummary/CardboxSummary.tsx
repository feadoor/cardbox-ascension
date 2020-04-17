import React from 'react';
import './CardboxSummary.css';
import { Link } from 'react-router-dom';

export interface CardboxSummaryProps {
    name: string;
    size: number;
    hasQuestionsDue: boolean;
}

const CardboxSummary: React.FC<CardboxSummaryProps> = ({ name, size, hasQuestionsDue }) => {
    return (
        <div className="cardbox-summary">
            <div className="cardbox-summary__name">{name} ({size})</div>
            <div className={'cardbox-summary__status cardbox-summary__status--' + (hasQuestionsDue ? 'due' : 'stale')}>{hasQuestionsDue ? 'Questions Due' : 'No Questions Due'}</div>
            <div className="cardbox-summary__actions">
                <Link className="cardbox-summary__action" to={`/edit/${name}`}>Edit</Link>
                <Link className="cardbox-summary__action" to={`/learn/${name}`}>Learn</Link>
            </div>
        </div>
    );
};

export default CardboxSummary;
