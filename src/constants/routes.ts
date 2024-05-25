export const ROUTES = {
    HOME: '/',
    ABOUT_PAGE: '/about',
    PROJECTS: {
        BASE: '/projects',
        SINGLE_PROJECT: '/projects/{id}',
        CREATE: '/projects/create',
        CREATE_TASK: '/projects/{id}/createTask',
        ARCHIVED: '/projects/archived',
        SINGLE_TASK: '/projects/{id}/task/{taskId}',
    },
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
    },
};
