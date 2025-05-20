import React from 'react';
import './styles/Calendar.css';

export const getTileClassName = (date, view, markedDates) => {
    if (view === 'month'){
        const match = markedDates.find(entry => {
            const entryDate = new Date(entry.Date);
            return (
                entryDate.getFullYear() === date.getFullYear() &&
                entryDate.getMonth() === date.getMonth() &&
                entryDate.getDate() === date.getDate() 
            );
        });
        return match ? 'highlight' : null;
    }
    return null;
}

export const getTileContent = (date,view,markedDates) => {
    if (view === 'month') {
        const match = markedDates.find(entry => {
            const entryDate = new Date(entry.Date);
            return (
                entryDate.getFullYear() === date.getFullYear() &&
                entryDate.getMonth() === date.getMonth() &&
                entryDate.getDate() === date.getDate() 
            );
        });
        if (match){
            return (
            <div>
                <span className="title-text">{match.Title}</span>
            </div>
            );
        }
    }
    return null;
};