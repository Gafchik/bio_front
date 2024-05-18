import moment from "moment";
export default {
    dateToFormat(item, format){
        return moment(item).format(format);
    },
    centToDollar(money){
        if(!!money){
            return money/100
        }
        return 0
    }
}