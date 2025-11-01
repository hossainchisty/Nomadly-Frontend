// 📍 NOTE: THIS ENDPOINT FOR TEST ONLY
// const BaseURL = import.meta.env.VITE_TEST_BASE_URL;

// 📍 NOTE: THIS ENDPOINT FOR PRODUCTION ONLY
const BaseURL = import.meta.env.VITE_PROD_BASE_URL;

// 📍 NOTE: THIS ENDPOINT FOR LOCAL ONLY
// const BaseURL = import.meta.env.VITE_LOCAL_BASE_URL;


export const EndPoint = {
    AUTH_LOGIN: `${BaseURL}/users/login/`,
    AUTH_SIGNUP: `${BaseURL}/users/register/`,
    USERS: `${BaseURL}/users/`,
    ME: `${BaseURL}/users/user/me/`,
    PROPERTY: `${BaseURL}/properties/`,
};

