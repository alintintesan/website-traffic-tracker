import React, { useState, useEffect } from 'react';
import { getVisitCountForPage } from '../services/ApiService';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const VisitCount = ({ pageId, websiteOrigin, pagePath }) => {
    const [visitCount, setVisitCount] = useState(null);
    const [filteredVisitCount, setFilteredVisitCount] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errorStartDate, setErrorStartDate] = useState(null);
    const [errorEndDate, setErrorEndDate] = useState(null);

    const getVisitCountData = async (start, end) => {
        try {
            const visitCount = await getVisitCountForPage(pageId, start, end);
            return visitCount;
        } catch (error) {
            console.error('Error getting visit count data.', error);
        }
    };

    useEffect(() => {
        const updateVisitCount = async () => {
            if (pageId) {
                const count = await getVisitCountData();
                setVisitCount(count);
            }
        };

        updateVisitCount();
    }, [pageId]);

    const handleStartDateChange = (date) => {
        if (date && moment(date).isValid()) {
            setErrorStartDate(null);
            setStartDate(date);
        } else {
            setErrorStartDate('Please select a valid start date.');
        }
    };

    const handleEndDateChange = (date) => {
        if (date && moment(date).isValid()) {
            if (startDate && moment(date).isBefore(startDate)) {
                setErrorEndDate('End date cannot be before the start date.');
            } else {
                setErrorEndDate(null);
                setEndDate(date);
            }
        } else {
            setErrorEndDate('Please select a valid end date.');
        }
    };

    const handleFilterVisits = () => {
        const updateFilteredVisitCount = async () => {
            if (!errorStartDate && !errorEndDate) {
                const dateStart = moment(startDate).toDate();
                const dateEnd = moment(endDate).toDate();
                const filteredVisitCount = await getVisitCountData(dateStart, dateEnd);
                setFilteredVisitCount(filteredVisitCount);
            }
        };

        updateFilteredVisitCount();
    }

    return (
        <div className='visit-container'>
            <h3>{websiteOrigin + pagePath}</h3>
            <div className='visit-count-container'>
                <div className='total-count-container'>
                    <h3>Visit count</h3>

                    {visitCount !== null ? (
                        <p>Total visits: {visitCount}</p>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <div className='filtered-count-container'>

                    <h3>Filter visit count by time period</h3>

                    <label htmlFor='start-date'>Start date and time: </label>
                    <Datetime
                        value={startDate}
                        onChange={handleStartDateChange}
                        dateFormat='YYYY-MM-DD'
                        timeFormat='HH:mm:ss'
                        inputProps={{ id: 'start-date' }}
                    />

                    <label htmlFor='end-date'>End date and time: </label>
                    <Datetime
                        value={endDate}
                        onChange={handleEndDateChange}
                        dateFormat='YYYY-MM-DD'
                        timeFormat='HH:mm:ss'
                        inputProps={{ id: 'end-date' }}
                    />

                    {errorStartDate && <p style={{ color: 'red' }}>{errorStartDate}</p>}
                    {errorEndDate && <p style={{ color: 'red' }}>{errorEndDate}</p>}

                    <button onClick={handleFilterVisits} disabled={errorStartDate || errorEndDate || !startDate || !endDate}>Filter visits</button>

                    {filteredVisitCount !== null && (<p>Filtered visits: {filteredVisitCount}</p>)}
                </div>
            </div>
        </div>
    );
};

export default VisitCount;