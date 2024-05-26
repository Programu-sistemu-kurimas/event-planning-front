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
        UPDATE: 'projects/update',
        ADD_USER: 'projects/addUser',
        SET_ROLE: 'projects/setRole',
        DELETE: 'projects/{id}',
        ARCHIVE: 'projects/{id}',
        GUESTS: 'projects/guests?projectId={id}',
        CREATE_GUEST: 'guest/create',
        DELETE_GUEST: 'guest',
    },
    TASK: {
        CREATE: 'task/create',
        DELETE: 'task/{id}',
        UPDATE: 'task/update',
        GET_BY_ID: 'task/{id}',
        ADD_USER: 'task/addUser',
    },
};
