<script setup>
import marker_tree from "@assets/image/tree/marker-tree.svg";
// import marker_tree from "@assets/image/tree/tree-2.png";
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {useI18n} from "vue-i18n";
import {useUserMapStore} from "@/store/pages/UserMap/user-map-store.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import moment from "moment";
const TRANC_PREFIX = 'pages.user_map'
const {t} = useI18n()
const userMapStore = useUserMapStore()
const {trees,fields} = storeToRefs(userMapStore)
const isEmpty = computed(() => {
  return !trees.value.length
})
const columns = computed(() => {
  return [
    {
      name: 'uuid',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.uuid`),
      align: 'center',
      field: row => row.uuid,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'coordinates',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.coordinates`),
      align: 'center',
      field: row => row.coordinates,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'year',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.year`),
      align: 'center',
      field: row => row.planting_date,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'season',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.season`),
      align: 'center',
      field: row => row.season,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'purchase_price',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.purchase_price`),
      align: 'center',
      field: row => row.purchase_price,
      format: val => `${val}`,
      sortable: true
    },
  ]
})
function getCoordString(coord,isLat = true){
  let coordObj = JSON.parse(coord)
  return isLat ? coordObj.lat : coordObj.lng
}
function getYear(date){
  return moment(date).format('YYYY');
}

import { ref, onMounted, onUnmounted, watch } from 'vue';
const map = ref(null);
const polygon = computed(() => {
  let temp = JSON.parse(fields.value[0].area)
  return  temp.map(i => {
    return new Microsoft.Maps.Location(i.lat, i.lng)
  })
})
const markers = computed(() => {
  let temp = trees.value.map(obj => JSON.parse(obj.coordinates))
  return temp.map(i => {
    return new Microsoft.Maps.Location(i.lat, i.lng)
  });
})
const polygons = computed(() => {
  return  fields.value.map(i => {
    let tempArea = JSON.parse(i.area)
    let area = tempArea.map(o => {
      return new Microsoft.Maps.Location(o.lat, o.lng)
    })
    return {area:area}
  })
})
function initMap() {
  const mapElement = map.value;
  const zoom = 16
  map.value = new Microsoft.Maps.Map(mapElement, {
    mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    zoom: zoom ? parseInt(zoom) : 15,
    center: markers.value && markers.value.length
        ? markers.value[0]
        : polygons.value && polygons.value.length
            ? polygons.value[0].area : null,
    credentials: `AnnWKZqULr2VDmhnIXslI0dTcYq_0sG3RK5yxZMIMVPIRwRmwvta5LPd8ztqDsAd`,
    maxZoom: 50,
    showLocateMeButton: false,
    showMapTypeSelector: false,
    maxNetworkLinkDepth: 3
  });

  if (polygon.value) {
    getPolygon(polygon.value);
  }
  if (markers.value) {
    getMarkers(markers.value);
  }
  if (polygons.value) {
    getPolygons(polygons.value);
  }
}

function getPolygon(polygon) {
  const polygonShape = new Microsoft.Maps.Polygon(polygon, {
    fillColor: 'rgba(110,160,40,0.8)',
    strokeColor: 'rgba(235, 87, 87,1)',
    strokeThickness: 2
  });
  map.value.entities.push(polygonShape);
}

function getPolygons(polygons) {
  polygons.forEach(t => {
    const polygon = new Microsoft.Maps.Polygon(t.area, {
      fillColor: 'rgba(110,160,40,0.8)',
      strokeColor: 'rgba(235, 87, 87,1)',
      strokeThickness: 2
    });
    map.value.entities.push(polygon);

    // const infobox = new Microsoft.Maps.Infobox(map.value.getCenter(), { visible: false });
    // infobox.setMap(map.value);

    // Microsoft.Maps.Events.addHandler(polygon, 'click', e => {
    //   const loc = e.location;
    //   const desc = `
    //     ${t.name ? t.name + '<br>' : ''}
    //     ${t.location ? t.location + '.' : ''}
    //     ${t.province ? t.province + '.' : ''}<br>
    //     Cadastral Number — ${t.cadastral_number} <br>
    //     ${t.planting_year ? `Year of Planting — ` + t.planting_year + '<br>' : ''}
    //     Count of Trees — ${t.trees_count}<br>
    //     ${t.description ? t.description : ''}`;
    //   infobox.setOptions({
    //     location: loc,
    //     description: desc,
    //     visible: true
    //   });
    // });
  });
}

function getMarkers(markers) {
  const pins = markers.map(e => new Microsoft.Maps.Pushpin(e, {
    icon: marker_tree,
  }));
  pins.forEach(pin => {
    map.value.entities.push(pin);
  })
}


watch([
  () => [...trees.value],
  () => [...fields.value],
],
    () => {
      if (document.getElementById("scriptBingMaps")) {
        window.OnLoadBingMapsApi = () => initMap();
      } else {
        window.OnLoadBingMapsApi = () => initMap();
        const scriptTag = document.createElement("script");
        scriptTag.src = "https://www.bing.com/api/maps/mapcontrol?callback=OnLoadBingMapsApi";
        scriptTag.id = "scriptBingMaps";
        document.head.appendChild(scriptTag);
      }
})

onUnmounted(() => {
  document.getElementById('scriptBingMaps')?.remove();
});
</script>

<template>
  <PersonalTemplate :is-empty="isEmpty" :emptyText="t(`${TRANC_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <div class="q-mb-lg text-bold text-h6 text-green-8">
        {{t(`${TRANC_PREFIX}.title`)}}
      </div>
      <div class="row justify-between">
        <q-table
            style="background-color: #f5f3e4;"
            class="q-my-lg border-shadow"
            :rows="trees"
            :columns="columns"
            row-key="id"
            dense
            :grid="$q.platform.is.mobile"
            :rows-per-page-options="[0]"
        >

          <template v-slot:bottom></template>

          <template v-slot:body-cell-uuid="props">
            <q-td class="text-center">
              <span>{{props.row.uuid}}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-coordinates="props">
            <q-td class="text-center">
              <div>{{getCoordString(props.row.coordinates)}}</div>
              <div>{{getCoordString(props.row.coordinates,false)}}</div>
            </q-td>
          </template>
          <template v-slot:body-cell-season="props">
            <q-td class="text-center">
              {{t(`app.season.${props.row.season}`)}}
            </q-td>
          </template>
          <template v-slot:body-cell-year="props">
            <q-td class="text-center">
             {{getYear(props.row.planting_date)}}
            </q-td>
          </template>
          <template v-slot:body-cell-purchase_price="props">
            <q-td class="text-center">
              <span>{{$filters.centToDollar(props.row.purchase_price)+'$'}}</span>
            </q-td>
          </template>
          <template v-slot:item="props">
            <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-list dense style="background-color: #f5f3e4;">
                <q-item v-for="col in props.cols"
                        :key="col.name">
                  <template v-if="col.name === 'uuid'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'coordinates'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div>{{getCoordString(col.value)}}</div>
                      <div>{{getCoordString(col.value,false)}}</div>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'season'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">
                        {{t(`app.season.${col.value}`)}}
                      </q-item-label>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'purchase_price'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">{{$filters.centToDollar(col.value)}}</q-item-label>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'year'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">{{getYear(col.value)}}</q-item-label>
                    </q-item-section>
                  </template>
                </q-item>
                <div class="separator"></div>
              </q-list>
            </div>
          </template>
        </q-table>
        <div class="q-my-lg border-shadow map"
             :style="$q.platform.is.mobile ? 'width: 100%;height: 60vh;' : 'width: 45%;height: 60vh;'"
             ref="map"/>
      </div>
    </template>
  </PersonalTemplate>
</template>

<style scoped>

</style>