<script setup>
import {useSwiftDialogStore} from "@/store/common/swift-dialog-store.js";
import {storeToRefs} from "pinia";
import rules from "@/rules/rules.js";
import {ref} from "vue";

const swiftDialogStore = useSwiftDialogStore()
const {isShowDialog, form} = storeToRefs(swiftDialogStore)
const {closeDialogSwift, callFunctionYes} = swiftDialogStore
const swiftForm = ref('null')
function onSubmit(){
  if(!swiftForm.value.error){
    callFunctionYes()
  }
}
</script>

<template>
  <q-dialog v-model="isShowDialog" persistent>
    <q-card style="background-color: #e3e1c9; min-width: 60%" >
        <div class="text-center">
          <h5 class="text-light-green-8">SWIFT</h5>
        </div>
      <q-form style="background-color: #e3e1c9"
              @submit="onSubmit"
              class="q-gutter-md"
              ref="swiftForm"
      >
        <q-card-section>
          <q-input
              class="q-my-xs input-field"
              color="light-green-8"
              type="text"
              name="first_name"
              v-model="form.name"
              label="Name"
              :rules="[rules.required('Name')]"
          />
          <q-input
              class="q-my-xs input-field"
              color="light-green-8"
              type="text"
              name="last_name"
              v-model="form.company_name"
              label="Company"
              :rules="[rules.required('')]"
          />
          <q-input
              class="q-my-xs input-field"
              color="light-green-8"
              type="text"
              name="last_name"
              v-model="form.address"
              label="Address"
              :rules="[rules.required('Address')]"
          />
          <q-input
              class="q-my-xs input-field"
              color="light-green-8"
              type="text"
              name="last_name"
              v-model="form.phone"
              label="Phone number"
              :rules="[rules.required('Phone number')]"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat icon="close" color="negative" @click="closeDialogSwift"/>
          <q-btn flat icon="done" type="submit" color="positive"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>