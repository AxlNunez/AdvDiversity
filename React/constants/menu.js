const MENU_ITEMS = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'menteedashboard',
        label: 'Dashboard',
        isTitle: false,
        url: '/dashboard/mentee',
        roles: ['Mentee'],
        badge: { variant: 'light-lighten', text: 'New' },
    },
    {
        key: 'mentordashboard',
        label: 'Dashboard',
        isTitle: false,
        url: '/dashboard/mentor',
        roles: ['Mentor'],
        badge: { variant: 'light-lighten', text: 'New' },
    },
    {
        key: 'admindashboard',
        label: 'Dashboard',
        isTitle: false,
        url: '/dashboard/analytics',
        roles: ['Admin'],
        badge: { variant: 'light-lighten', text: 'New' },
    },

    {
        key: 'surveys',
        label: 'Surveys',
        isTitle: false,
        roles: ['Admin'],
        url: '/surveys',
    },
    {
        key: 'faqadmin',
        label: 'FAQ',
        isTitle: false,
        roles: ['Admin'],
        url: '/faqadmin',
    },
    {
        key: 'newsletters',
        label: 'Newsletters',
        isTitle: false,
        roles: ['Admin'],
        url: '/newsletters',
    },
    {
        key: 'newslettertemplates',
        label: 'Templates',
        isTitle: false,
        roles: ['Admin'],
        url: '/newslettertemplates',
    },

    {
        key: 'resources',
        label: 'Resources',
        isTitle: false,
        roles: ['Admin'],
        url: '/resources/admin',
    },

    {
        key: 'events-list',
        label: 'Events List',
        isTitle: false,
        roles: ['Admin', 'Mentee', 'Mentor'],
        url: '/dashboard/events',
    },

    {
        key: 'events-edit',
        label: 'Update Events',
        isTitle: false,
        roles: ['Admin'],
        url: '/dashboard/events/edit',
    },

    {
        key: 'profile-list',
        label: 'Profile List',
        isTitle: false,
        roles: ['Admin', 'Mentee', 'Mentor'],
        url: '/dashboard/profiles',
    },
    {
        key: 'profile-edit',
        label: 'Update Profile',
        isTitle: false,
        roles: ['Admin', 'Mentee', 'Mentor'],
        url: '/dashboard/profiles/edit',
    },

    {
        key: 'blogsadmin',
        label: 'Blogs',
        isTitle: false,
        roles: ['Admin'],
        url: '/blogsadmin',
    },
    {
        key: 'subscription',
        label: 'Subscriptions',
        isTitle: false,
        roles: ['Admin', 'Mentee', 'Mentor'],
        url: '/subscription',
    },
    {
        key: 'jobs',
        label: 'Create a Job Form',
        isTitle: false,
        roles: ['Admin', 'Mentor'],
        url: '/dashboard/jobs/new',
    },
    {
        key: 'jobfairs',
        label: 'Create a JobFair Form',
        isTitle: false,
        roles: ['Admin', 'Mentor'],
        url: '/dashboard/jobfairs/new',
    },
    { key: 'apps', label: 'Apps', isTitle: true },
    { key: 'apps-calendar', label: 'Calendar', isTitle: false, url: '/apps/calendar' },
    { key: 'apps-chat', label: 'Chat', isTitle: false, url: '/apps/chat' },
];

export default MENU_ITEMS;
