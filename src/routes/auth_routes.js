import Personal from "@/components/pages/Personal/Personal.vue";
import Profile from "@/components/pages/Profile/Profile.vue";

export default [
    {
        path: '/profile',
        component: Profile,
        name: 'profile',
    },
    {
        path: '/personal',
        component: Personal,
        name: 'personal',
    },
]