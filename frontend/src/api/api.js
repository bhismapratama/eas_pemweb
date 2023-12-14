import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export default {
    async GetStatus() {
        const response = await axios.get(`${API_BASE_URL}/api/GetStatus`);
        return response.data;
    },
    async AddForm(formData) {
        const response = await axios.post(`${API_BASE_URL}/api/AddForm`, formData);
        return response.data;
    },
};
