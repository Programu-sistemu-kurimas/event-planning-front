export const ROUTES = {
    HOME: '/',
    ABOUT_PAGE: '/about',
    MY_PROFILE: '/my-profile',
    PROJECTS: {
        BASE: '/projects',
        SINGLE_PROJECT: '/projects/{id}',
        CREATE: '/projects/create',
        CREATE_TASK: '/projects/{id}/createTask',
        ARCHIVED: '/projects/archived',
        SINGLE_ARCHIVED_PROJECT: '/projects/archived/{id}',
        SINGLE_TASK: '/projects/{id}/task/{taskId}',
    },
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
    },
};
