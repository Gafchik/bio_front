import {defineStore} from "pinia";
const DEFAULT_FUNCTION = () => {}
export const useSwiftDialogStore = defineStore('useSwiftDialogStore',{
    state: () => {
        return {
            isShowDialog: false,
            func: DEFAULT_FUNCTION,
            funcParams: {},
            callbackFunc: DEFAULT_FUNCTION,
            closeFunc: DEFAULT_FUNCTION,
            form: {
                name : '',
                company_name : '',
                address : '',
                phone : '',
            }
        }
    },
    actions: {
        openDialogSwift({func, funcParams = {}, callbackFunc = DEFAULT_FUNCTION,closeFunc = DEFAULT_FUNCTION}){
            this.func = func
            this.isShowDialog = true
            this.funcParams = funcParams
            this.callbackFunc = callbackFunc
            this.closeFunc = closeFunc
        },
        closeDialogSwift(){
            this.func = DEFAULT_FUNCTION
            this.isShowDialog = false
            this.funcParams = {}
            this.form = {
                name : '',
                company_name : '',
                address : '',
                phone : '',
            }
            this.closeFunc()
            this.closeCallbackFunc = DEFAULT_FUNCTION
        },
        callFunctionYes(){
            this.func({swift: this.form,...this.funcParams}).then((result) => { this.callbackFunc(result)});
            this.closeDialogSwift();
        }
    }
})