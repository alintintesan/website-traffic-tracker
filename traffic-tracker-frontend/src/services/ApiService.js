import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
});

export const getAllWebsites = async () => {
    try {
        const response = await api.get('/websites');
        return response.data;
    } catch (error) {
        console.error('Error retrieving websites.', error);
        throw error;
    }
};

export const getPagesOfWebsite = async (websiteId) => {
    try {
        const response = await api.get(`/pages/${websiteId}`);
        return response.data;
    } catch (error) {
        console.error('Error retrieving pages.', error);
        throw error;
    }
};

export const getVisitCountForPage = async (pageId, startDate, endDate) => {
    try {
        const params = startDate && endDate ? { startDate: startDate.toISOString(), endDate: endDate.toISOString() } : {};
        const response = await api.get(`/visits/count/${pageId}`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching visit count', error);
        throw error;
    }
};