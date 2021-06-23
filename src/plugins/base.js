import Vue from 'vue';
import PageTitle from '@/components/PageTitle.vue';
import Guide from '@/components/Guide.vue';
import AddButton from '@/components/AddButton.vue';
import BaseTextField from '@/components/BaseTextField.vue';

Vue.component(PageTitle.name, PageTitle);
Vue.component(Guide.name, Guide);
Vue.component(AddButton.name, AddButton);
Vue.component(BaseTextField.name, BaseTextField);

export default {};
