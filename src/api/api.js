import {constants} from "@/config/config.js";

export default {
    getStatistics: async () => {
        try {
            const res = await fetch(`${constants.apiEndpoint}/statistics`, {
                method: 'POST'
            });
            if (!res.ok) {
                console.error(res);
                return false;
            }

            const data = await res.json();
            if (data.code !== 0) {
                return false;
            }

            return data.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
};