import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";

export const useSelectTreesDialogStore = defineStore('useSelectTreesDialogStore' ,()=> {
    const dialog = ref(false)
    const STATE_BY_YEAR_SEASON = 1
    const STATE_BY_TREE = 2
    const currentState = ref(STATE_BY_YEAR_SEASON)
    const selectedByYearSeason = ref(null)
    const selected = ref([])
    function openDialog(){
        dialog.value = true
    }
    function closeDialog(){
        currentState.value = STATE_BY_YEAR_SEASON
        selectedByYearSeason.value = null
        selected.value = []
        dialog.value = false
    }
    function back(){
        currentState.value = STATE_BY_YEAR_SEASON
        selectedByYearSeason.value = null
        selected.value = []
    }
    return {
        dialog,openDialog,closeDialog,STATE_BY_YEAR_SEASON, STATE_BY_TREE,currentState,selectedByYearSeason,
        back,selected
    }
})