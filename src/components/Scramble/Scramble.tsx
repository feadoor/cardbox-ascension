import React from 'react';
import './Scramble.css';

import LetterCard from '../LetterCard/LetterCard';

export interface ScrambleProps {
    scramble: string;
}

const Scramble: React.FC<ScrambleProps> = ({ scramble }) => {
    return (
        <div className="scramble">
            {[...scramble].map((char, idx) =>
                <LetterCard key={idx} letter={char}></LetterCard>
            )}
        </div>
    );
};

export default Scramble;
