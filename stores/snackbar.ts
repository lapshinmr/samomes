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

import { defineStore } from 'pinia';
import { ref } from 'vue';

// Using the setup syntax which is more compatible with Nuxt 3
export const useSnackbarStore = defineStore('snackbar', () => {
  const isVisible = ref(false);
  const message = ref('');
  const timeout = ref(5000);
  const color = ref('success');

  function show(msg, options = {}) {
    message.value = msg;
    isVisible.value = true;

    if (options.timeout !== undefined) {
      timeout.value = options.timeout;
    }

    if (options.color) {
      color.value = options.color;
    }
  }

  function hide() {
    isVisible.value = false;
  }

  function showSuccess(msg, options = {}) {
    show(msg, { ...options, color: 'success' });
  }

  function showError(msg, options = {}) {
    show(msg, { ...options, color: 'error' });
  }

  function showWarning(msg, options = {}) {
    show(msg, { ...options, color: 'warning' });
  }

  function showInfo(msg, options = {}) {
    show(msg, { ...options, color: 'info' });
  }

  return {
    isVisible,
    message,
    timeout,
    color,
    show,
    hide,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
});
