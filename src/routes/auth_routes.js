import Personal from "@/components/pages/Personal/Personal.vue";
import Profile from "@/components/pages/Profile/Profile.vue";
import Status from "@/components/pages/Status/Status.vue";
import Purchases from "@/components/pages/Purchases/Purchases.vue";
import PurchasesDetail from "@/components/pages/Purchases/PurchasesDetail.vue";
import UserMap from "@/components/pages/UserMap/UserMap.vue";

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
    {
        path: '/status',
        component: Status,
        name: 'status',
    },
    {
        path: '/purchases',
        component: Purchases,
        name: 'purchases',
    },
    {
        path: '/purchases/:id',
        component: PurchasesDetail,
        name: 'purchases_detail',
    },
    {
        path: '/user-map',
        component: UserMap,
        name: 'user_map',
    },
]