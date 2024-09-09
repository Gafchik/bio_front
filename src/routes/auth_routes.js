import Personal from "@/components/pages/Personal/Personal.vue";
import Profile from "@/components/pages/Profile/Profile.vue";
import Status from "@/components/pages/Status/Status.vue";
import Purchases from "@/components/pages/Purchases/Purchases.vue";
import PurchasesDetail from "@/components/pages/Purchases/PurchasesDetail.vue";
import UserMap from "@/components/pages/UserMap/UserMap.vue";
import WithdrawalHistory from "@/components/pages/WithdrawalHistory/WithdrawalHistory.vue";
import Withdrawal from "@/components/pages/Withdrawal/Withdrawal.vue";
import TransactionsHistory from "@/components/pages/TransactionsHistory/TransactionsHistory.vue";
import TreeStoreSell from "@/components/pages/TreeStoreSell/TreeStoreSell.vue";
import TreeStoreRemoveSell from "@/components/pages/TreeStoreRemoveSell/TreeStoreRemoveSell.vue";
import BuyYongTree from "@/components/pages/BuyYongTree/BuyYongTree.vue";
import TopUpWallet from "@/components/pages/TopUpWallet/TopUpWallet.vue";
import Insurance from "@/components/pages/Insurance/Insurance.vue";
import Gift from "@/components/pages/Gift/Gift.vue";

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
    {
        path: '/withdrawal-history',
        component: WithdrawalHistory,
        name: 'withdrawal_history',
    },
    {
        path: '/withdrawal',
        component: Withdrawal,
        name: 'withdrawal',
    },
    {
        path: '/transactions-history',
        component: TransactionsHistory,
        name: 'transactions_history',
    },
    {
        path: '/tree-store-sell',
        component: TreeStoreSell,
        name: 'tree_store_sell',
    },
    {
        path: '/tree-store-remove-sell',
        component: TreeStoreRemoveSell,
        name: 'tree_store_remove_sell',
    },
    {
        path: '/buy-yong-tree',
        component: BuyYongTree,
        name: 'buy_yong_tree',
    },
    {
        path: '/top-up-wallet',
        component: TopUpWallet,
        name: 'top_up_wallet',
    },
    {
        path: '/insurance',
        component: Insurance,
        name: 'insurance',
    },
    {
        path: '/gift',
        component: Gift,
        name: 'gift',
    },
]