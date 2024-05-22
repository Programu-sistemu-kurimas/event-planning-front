export const API_ROUTES = {
    USER: {
        REGISTER: 'users/register',
        LOGIN: 'users/login',
        PROJECTS: 'users/projects',
    },
    PROJECT: {
        BASE: 'projects',
        GET_BY_ID: 'projects/{id}',
        CREATE: 'projects/create',
        ADD_USER: 'projects/addUser',
        SET_ROLE: 'projects/setRole',
        DELETE: 'projects/{id}',
        ARCHIVE: 'projects/{id}',
    },
    TASK: {
        CREATE: 'task/create',
    },
};
