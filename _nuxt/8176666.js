(window.webpackJsonp=window.webpackJsonp||[]).push([[34,16],{707:function(e,n,t){"use strict";n.a={Biolan:{ions:{N:.13,P:.013,K:.125,Fe:.0017,Mg:.018,B:1e-4,Zn:4e-4,Cu:4e-4,Mo:1e-4},name:"Biolan Удобрение для орхидей RAIN MIX"},PlantexCSM:{ions:{Fe:.07,Mn:.02,Mg:.015,Zn:.004,Cu:.001,Mo:6e-4},name:"Plantex® C.S.M."},PlantexCMM:{ions:{Fe:.07,Mn:.02,B:.013,Zn:.004,Cu:.001,Mo:6e-4},name:"Plantex® C.M.M."},AgroMicsT:{ions:{Fe:.07,Mn:.033,B:.0065,Zn:.006,Cu:.0027,Mo:.002},name:"АгроМикс T"},"Fe-EDTA13":{ions:{Fe:.13},name:"ЭДТА Железо 13%"},"Fe-EDDGA6":{ions:{Fe:.06},name:"ЭДДГА Железо 6%"},"Fe-DTPA11":{ions:{Fe:.11},name:"ДТПА Железо 11%"},"Mn-EDTA13":{ions:{Mn:.13},name:"ЭДТА Марганец 13%"},"Ca-EDTA10":{ions:{Ca:.1},name:"ЭДТА Кальций 10%"},"Mg-EDTA6":{ions:{Mg:.06},name:"ЭДТА Магний 6%"},"Co-EDTA13":{ions:{Co:.13},name:"ЭДТА Кобальт 13%"},"Zn-EDTA15":{ions:{Zn:.15},name:"ЭДТА Цинк 15%"},"Cu-EDTA15":{ions:{Cu:.15},name:"ЭДТА Медь 15%"},"B12-liquid":{ions:{},isLiquid:!0,name:"Цианокобаламин B12 (жидкий)"},"B12-solid":{ions:{},name:"Цианокобаламин B12 (порошок)"},Ferovit:{ions:{Fe:.075,N:.04},isLiquid:!0,name:"Феровит"},Citovit:{ions:{N:.03,P:.005,K:.025,Mg:.01,S:.04,Fe:.035,Mn:.03,B:.008,Zn:.006,Cu:.006,Mo:.004,Co:.002},isLiquid:!0,name:"Цитовит"},AquaMicsCT:{ions:{Fe:.0384,Mn:.0257,Zn:.0053,Ca:.0257,B:.0052,Mo:.0013,Cu:.0053},isLiquid:!1,name:"Аквамикс СТ"},AquarinUniversal:{ions:{N:.18,P:.0786,K:.1494,S:.015,Fe:54e-5,Mn:42e-5,Mg:.012064,B:2e-4,Zn:14e-5,Cu:1e-4,Mo:4e-5},name:'Акварин "Универсальный"'}}},728:function(e,n,t){"use strict";t.r(n);t(194),t(242);var r=t(684),o=t(707),c=t(683),l={name:"Recipe",props:{recipe:{type:Object,default:function(){}}},data:function(){return{FORMULAS:r.a,COMPOUNDS:o.a}},computed:{concentrations:function(){var e=Object.entries(Object(c.g)(this.recipe.concentration));return e.sort((function(a,b){return b[1]-a[1]})),e},isRecipe:function(){return this.recipe.reagents&&this.recipe.reagents.length>0}},methods:{convertIonName:c.b,convertIonRatio:c.c,countTotalIonConcentration:c.g,isConcentration:c.i}},d=t(44),v=t(46),f=t.n(v),_=t(665),component=Object(d.a)(l,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[e.isRecipe?t("div",{staticClass:"mb-2"},[e._v("\n    Рецепт\n  ")]):e._e(),e._v(" "),e.recipe.volume?t("div",{staticClass:"d-flex justify-space-between body-2"},[t("span",{},[e._v("\n      Объем удобрения\n    ")]),e._v(" "),t("span",[e._v("\n      "+e._s(e.recipe.volume)+" мл\n    ")])]):e._e(),e._v(" "),e._l(e.recipe.reagents,(function(n){return[e.recipe.mass[n]?t("div",{key:n,staticClass:"d-flex justify-space-between body-2"},[t("span",[e._v("\n        "+e._s(e.FORMULAS[n].name)+"\n      ")]),e._v(" "),t("span",[e._v("\n        "+e._s(e._f("precision")(e.recipe.mass[n],2))+" г\n      ")])]):e._e()]})),e._v(" "),e._l(e.recipe.compounds,(function(n){return[e.recipe.mass[n]?t("div",{key:n,staticClass:"d-flex justify-space-between body-2"},[t("span",[e._v("\n        "+e._s(e.COMPOUNDS[n].name)+"\n      ")]),e._v(" "),t("span",[e._v("\n        "+e._s(e._f("precision")(e.recipe.mass[n],2))+" г\n      ")])]):e._e()]})),e._v(" "),e.isRecipe?t("v-divider",{staticClass:"my-3"}):e._e(),e._v(" "),e.isConcentration(e.recipe.concentration)?t("div",{staticClass:"d-flex justify-space-between"},[t("div",{},[e._v("\n      Концентрация\n    ")]),e._v(" "),t("div",{staticClass:"d-flex body-2"},[t("div",e._l(e.concentrations,(function(n){var r=n[0];return t("div",{key:r+"name",staticClass:"mr-3"},[e._v("\n          "+e._s(e.convertIonName(r))+"\n        ")])})),0),e._v(" "),t("div",e._l(e.concentrations,(function(n){var r=n[0],o=n[1];return t("div",{key:r+"unit",staticClass:"text-right"},[e._v("\n          "+e._s(e._f("precision")(e.convertIonRatio(r)*o*(!e.recipe.volume&&e.isRecipe?1e3:1),3))+"\n          "+e._s(!e.recipe.volume&&e.isRecipe?"мг/г":"г/л")+"\n        ")])})),0)])]):e._e(),e._v(" "),e.recipe.note?t("v-divider",{staticClass:"my-3"}):e._e(),e._v(" "),e.recipe.note?t("div",{staticClass:"d-flex justify-space-between"},[t("div",{staticClass:"mr-3"},[e._v("\n      Примечание\n    ")]),e._v(" "),t("div",{staticClass:"text-right body-2"},[e._v("\n      "+e._s(e.recipe.note)+"\n    ")])]):e._e()],2)}),[],!1,null,"96a36daa",null);n.default=component.exports;f()(component,{VDivider:_.a})},746:function(e,n,t){var content=t(802);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(21).default)("442e8424",content,!0,{sourceMap:!1})},801:function(e,n,t){"use strict";t(746)},802:function(e,n,t){var r=t(20)(!1);r.push([e.i,".flip-list-move{transition:transform .5s}.ghost{opacity:.5;background:#c8ebfb}",""]),e.exports=r},868:function(e,n,t){"use strict";t.r(n);t(12),t(10),t(13),t(4),t(15),t(11),t(16);var r=t(3),o=t(60),c=t(726),l=t.n(c),d=t(728);function v(object,e){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),n.push.apply(n,t)}return n}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(n){Object(r.a)(e,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(source,n))}))}return e}var _={name:"Fertilizers",components:{draggable:l.a,Recipe:d.default},head:function(){return{title:"Список фирменных удобрений",meta:[{hid:"description",name:"description",content:"На этой странице вы можете добавить свои фирменные удобрения,  которые используете в своем аквариуме, чтобы легко расчитать дозировки."},{hid:"keywords",name:"keywords",content:"фирменные удобрения"}]}},data:function(){return{drag:!1}},computed:{dragOptions:function(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}},fertilizers:{get:function(){return this.$store.state.fertilizers},set:function(e){this.FERTILIZER_MOVE(e)}}},methods:f(f({},Object(o.c)(["FERTILIZER_MOVE","SNACKBAR_SHOW"])),{},{addFertilizer:function(){return this.$router.push("/fertilizers/create")}})},m=(t(801),t(44)),C=t(46),y=t.n(C),h=t(261),M=t(680),x=t(711),O=t(855),w=t(856),j=t(857),P=t(858),E=t(226),F=t(704),A=t(681),component=Object(m.a)(_,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-container",{staticClass:"mb-12"},[t("v-row",[t("page-title",[e._v("\n      Удобрения\n    ")]),e._v(" "),t("guide",[e._v("\n      На этой странице можно добавить готовые удобрения (самодельные или фирменные удобрения с известным составом).\n      А так же можно добавить удобрение с неизвестным составом, чтобы была возможность учесть его в расписании.\n      "),t("br"),e._v(" "),t("br"),e._v("\n      Готовые удобрения можно использовать при составлении\n      "),t("router-link",{attrs:{to:"/schedules"}},[e._v("\n        расписания\n      ")]),e._v("\n      внесения удобрений.\n    ")],1),e._v(" "),0===e.fertilizers.length?t("v-col",{attrs:{cols:"12",md:"8","offset-md":"2"}},[t("p",{staticClass:"mb-8",class:{"text-h6":e.$vuetify.breakpoint.xs,"text-h5":e.$vuetify.breakpoint.smAndUp}},[e._v("\n        У вас нет ни одного удобрения\n      ")])]):e._e(),e._v(" "),t("v-col",{attrs:{cols:"12",sm:"8","offset-sm":"2"}},[t("v-expansion-panels",{attrs:{multiple:""}},[t("draggable",e._b({staticStyle:{width:"100%"},attrs:{handle:".handle"},on:{start:function(n){e.drag=!0},end:function(n){e.drag=!1}},model:{value:e.fertilizers,callback:function(n){e.fertilizers=n},expression:"fertilizers"}},"draggable",e.dragOptions,!1),[t("transition-group",{attrs:{type:"transition",name:e.drag?null:"flip-list"}},e._l(e.fertilizers,(function(n,r){return t("v-expansion-panel",{key:n.name},[t("v-expansion-panel-header",{staticClass:"pa-3 py-sm-4 px-sm-6"},[t("div",{staticClass:"d-flex justify-space-between align-center",staticStyle:{width:"100%"}},[t("span",{staticClass:"no-break font-weight-regular d-flex flex-column flex-sm-row align-start",class:{"subtitle-1":e.$vuetify.breakpoint.xs,title:e.$vuetify.breakpoint.smAndUp}},[t("span",{staticStyle:{"line-height":"1.25rem"}},[e._v("\n                      "+e._s(n.name)+"\n                    ")])]),e._v(" "),t("span",{staticClass:"mr-3"},[t("v-tooltip",{attrs:{bottom:"","max-width":"400"},scopedSlots:e._u([{key:"activator",fn:function(n){var r=n.on;return[t("v-icon",e._g({staticClass:"handle ml-2"},r),[e._v("mdi mdi-drag")])]}}],null,!0)},[e._v("\n                      "+e._s(e.$t("fertilizers.panels.header.pull"))+"\n                    ")])],1)])]),e._v(" "),t("v-expansion-panel-content",[t("recipe",{attrs:{recipe:n}}),e._v(" "),t("div",{staticClass:"d-flex justify-end mt-4"},[t("v-btn",{staticClass:"mr-n4",attrs:{text:"",to:"/fertilizers/"+r}},[e._v("\n                    "+e._s(e.$t("buttons.open"))+"\n                  ")])],1)],1)],1)})),1)],1)],1)],1)],1),e._v(" "),t("add-button",{attrs:{action:e.addFertilizer}},[e._v("\n    "+e._s(e.$t("fertilizers.addButton"))+"\n  ")])],1)}),[],!1,null,null,null);n.default=component.exports;y()(component,{PageTitle:t(196).default,Guide:t(198).default,AddButton:t(200).default}),y()(component,{VBtn:h.a,VCol:M.a,VContainer:x.a,VExpansionPanel:O.a,VExpansionPanelContent:w.a,VExpansionPanelHeader:j.a,VExpansionPanels:P.a,VIcon:E.a,VRow:F.a,VTooltip:A.a})}}]);