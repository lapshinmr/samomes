(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{752:function(t,e,n){var content=n(815);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("7c5e8a9e",content,!0,{sourceMap:!1})},814:function(t,e,n){"use strict";n(752)},815:function(t,e,n){var o=n(20)(!1);o.push([t.i,".flip-list-move[data-v-4df85e4f]{transition:transform .5s}.ghost[data-v-4df85e4f]{opacity:.5;background:#c8ebfb}",""]),t.exports=o},873:function(t,e,n){"use strict";n.r(e);n(12),n(10),n(13),n(4),n(15),n(11),n(16);var o=n(3),r=n(60),l=n(726);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={name:"Tanks",components:{draggable:n.n(l).a},head:function(){return{title:"Список аквариумов",meta:[{hid:"description",name:"description",content:"На этой странице вы можете рассчитать объем аквариума по его линейным размерам, а так же добавить все свои аквариумы в один список."},{hid:"keywords",name:"keywords",content:"список, аквариум, объем"}]}},data:function(){return{drag:!1}},computed:{dragOptions:function(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}},tanks:{get:function(){return this.$store.state.tanks},set:function(t){this.TANK_MOVE(t)}}},methods:d(d({},Object(r.c)(["TANK_MOVE"])),{},{addTank:function(){return this.$router.push("/tanks/create")}})},_=(n(814),n(44)),f=n(46),m=n.n(f),h=n(261),k=n(680),y=n(711),w=n(855),x=n(856),C=n(857),$=n(858),O=n(226),j=n(704),V=n(681),component=Object(_.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"mb-12"},[n("v-row",[n("page-title",[t._v("\n      Аквариумы\n    ")]),t._v(" "),n("guide",[t._v("\n      На этой странице можно рассчитать объем аквариума по линейным размерам и добавить аквариум в список.\n      "),n("br"),t._v(" "),n("br"),t._v("\n      Список аквариумов упрощает выбор объема при составлении\n      "),n("router-link",{attrs:{to:"/recipes"}},[t._v("\n        рецепта\n      ")]),t._v("\n      или\n      "),n("router-link",{attrs:{to:"/schedules"}},[t._v("\n        расписания\n      ")]),t._v("\n      внесения удобрений.\n    ")],1),t._v(" "),0===t.tanks.length?n("v-col",{attrs:{cols:"12",md:"8","offset-md":"2"}},[n("p",{staticClass:"mb-8",class:{"text-h6":t.$vuetify.breakpoint.xs,"text-h5":t.$vuetify.breakpoint.smAndUp}},[t._v("\n        У вас нет ни одного аквариума\n      ")])]):t._e(),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"8","offset-sm":"2"}},[n("v-expansion-panels",{attrs:{multiple:""}},[n("draggable",t._b({staticStyle:{width:"100%"},attrs:{handle:".handle"},on:{start:function(e){t.drag=!0},end:function(e){t.drag=!1}},model:{value:t.tanks,callback:function(e){t.tanks=e},expression:"tanks"}},"draggable",t.dragOptions,!1),[n("transition-group",{attrs:{type:"transition",name:t.drag?null:"flip-list"}},t._l(t.tanks,(function(e,o){return n("v-expansion-panel",{key:e.name},[n("v-expansion-panel-header",{staticClass:"pa-3 py-sm-4 px-sm-6"},[n("div",{staticClass:"d-flex align-center",staticStyle:{width:"100%"}},[n("div",{staticClass:"no-break font-weight-regular mr-auto",class:{"subtitle-1":t.$vuetify.breakpoint.xs,title:t.$vuetify.breakpoint.smAndUp}},[t._v("\n                    "+t._s(e.name)+"\n                  ")]),t._v(" "),n("div",{staticClass:"mr-1 mx-sm-4",staticStyle:{"white-space":"nowrap"}},[t._v("\n                    "+t._s(t._f("precision")(e.volume,1))+" "+t._s(t.$t("units.l"))+"\n                  ")]),t._v(" "),n("div",[n("v-tooltip",{attrs:{bottom:"","max-width":"400"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-icon",t._g({staticClass:"handle"},o),[t._v("\n                          mdi mdi-drag\n                        ")])]}}],null,!0)},[t._v("\n                      "+t._s(t.$t("tanks.panels.header.pull"))+"\n                    ")])],1)])]),t._v(" "),n("v-expansion-panel-content",[e.length?n("div",{staticClass:"body-2"},[n("div",{staticClass:"d-flex justify-space-between"},[n("div",[t._v(t._s(t.$t("tanks.dialog.length")))]),t._v(" "),n("div",[t._v(t._s(t._f("precision")(e.length,1))+" "+t._s(t.$t("units.cm")))])]),t._v(" "),n("div",{staticClass:"d-flex justify-space-between"},[n("div",[t._v(t._s(t.$t("tanks.dialog.width")))]),t._v(" "),n("div",[t._v(t._s(t._f("precision")(e.width,1))+" "+t._s(t.$t("units.cm")))])]),t._v(" "),n("div",{staticClass:"d-flex justify-space-between"},[n("div",[t._v(t._s(t.$t("tanks.dialog.height")))]),t._v(" "),n("div",[t._v(t._s(t._f("precision")(e.height,1))+" "+t._s(t.$t("units.cm")))])]),t._v(" "),n("div",{staticClass:"d-flex justify-space-between"},[n("div",[t._v(t._s(t.$t("tanks.dialog.glassThickness")))]),t._v(" "),n("div",[t._v(t._s(e.glassThickness)+" "+t._s(t.$t("units.mm")))])]),t._v(" "),e.filter?n("div",{staticClass:"d-flex justify-space-between"},[n("div",[t._v(t._s(t.$t("tanks.dialog.filter")))]),t._v(" "),n("div",[t._v(t._s(t._f("precision")(e.filter,1))+" "+t._s(t.$t("units.l")))])]):t._e(),t._v(" "),e.soil?n("div",{staticClass:"d-flex justify-space-between"},[n("div",[t._v(t._s(t.$t("tanks.dialog.soil")))]),t._v(" "),n("div",[t._v(t._s(t._f("precision")(e.soil,1))+" "+t._s(t.$t("units.l")))])]):t._e(),t._v(" "),e.waterChangeVolume?n("div",{staticClass:"d-flex justify-space-between"},[n("div",[t._v(t._s(t.$t("tanks.dialog.waterChange")))]),t._v(" "),n("div",[t._v("\n                      "+t._s(t._f("precision")(e.waterChangeVolume,1))+" "+t._s(t.$t("units.l"))+" —\n                      "+t._s(t._f("precision")(e.waterChangeVolume/e.volume*100,1))+"%\n                    ")])]):t._e()]):n("div",{staticClass:"body-2"},[t._v("\n                  "+t._s(t.$t("tanks.panels.body.noSizes"))+"\n                ")]),t._v(" "),n("div",{staticClass:"d-flex justify-end mt-4"},[n("v-btn",{staticClass:"mr-n4",attrs:{text:"",right:"",to:"/tanks/"+o}},[t._v("\n                    "+t._s(t.$t("buttons.open"))+"\n                  ")])],1)])],1)})),1)],1)],1)],1)],1),t._v(" "),n("add-button",{attrs:{action:t.addTank}},[t._v("\n    "+t._s(t.$t("tanks.addButton"))+"\n  ")])],1)}),[],!1,null,"4df85e4f",null);e.default=component.exports;m()(component,{PageTitle:n(196).default,Guide:n(198).default,AddButton:n(200).default}),m()(component,{VBtn:h.a,VCol:k.a,VContainer:y.a,VExpansionPanel:w.a,VExpansionPanelContent:x.a,VExpansionPanelHeader:C.a,VExpansionPanels:$.a,VIcon:O.a,VRow:j.a,VTooltip:V.a})}}]);