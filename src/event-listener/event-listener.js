export const onScrollToLastItem = (selector,func) => {
    const element = document.querySelector(selector);
    if(!!element){
        const rect = element.getBoundingClientRect();
        if (rect.bottom <= (window.innerHeight)) {
            func()
        }
    }
}