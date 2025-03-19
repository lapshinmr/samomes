/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Vue from 'vue';
import PageTitle from '~/components/Base/PageTitle.vue';
import TheGuide from '~/components/Base/TheGuide.vue';
import AddButton from '~/components/Base/AddButton.vue';
import NumberField from '~/components/Base/NumberField.vue';
import SDivider from '~/components/UI/SDivider.vue';

Vue.component(PageTitle.name, PageTitle);
Vue.component(TheGuide.name, TheGuide);
Vue.component(AddButton.name, AddButton);
Vue.component(NumberField.name, NumberField);
Vue.component(SDivider.name, SDivider);
