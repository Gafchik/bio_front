import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";

export const useImageCarouselDialogStore = defineStore('useImageCarouselDialogStore' ,()=> {
    const dialog = ref(false)
    const images = ref([])
    const slide = ref(1)
    const isFullscreen = ref(true)
    function openImageCarouselDialog(inputImagesArray,image){
        images.value = inputImagesArray
        let imageName = 1
        images.value.forEach(i => {
            i.imageName = imageName
            imageName++
        })
        if(!!image){
            slide.value = (inputImagesArray.indexOf(image)+1)
        }
        dialog.value = true
    }
    function closeImageCarouselDialog(images){
        images.value = []
        dialog.value = false
        slide.value = 1
    }
    return {
        images,dialog,slide,openImageCarouselDialog,closeImageCarouselDialog,isFullscreen
    }
})