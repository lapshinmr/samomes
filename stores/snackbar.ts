/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
 * International License. To view a copy of this license, visit
 * http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
 * Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 *
 * You are free to:
 *  - Share — copy and redistribute the material in any medium or format
 *  - Adapt — remix, transform, and build upon the material
 *
 * Under the following terms:
 *  - Attribution — You must give appropriate credit
 *  - NonCommercial — You may not use the material for commercial purposes
 *  - ShareAlike — If you remix, transform, or build upon the material,
 *    you must distribute your contributions under the same license as the original
 *
 * No warranties are given. The license may not give you all of the permissions
 * necessary for your intended use.
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

// Using the setup syntax which is more compatible with Nuxt 3
export const useSnackbarStore = defineStore('snackbar', () => {
  type ColorType = 'success' | 'info' | 'warning' | 'error';
  type Optionstype = {
    timeout?: number;
    color?: ColorType;
  }
  const isVisible = ref(false);
  const message = ref<string>('');
  const timeout = ref<number>(5000);
  const color = ref<ColorType>('success');

  function show(msg: string, options: Optionstype = {}) {
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

  function showSuccess(msg: string, options: Optionstype = {}) {
    show(msg, { ...options, color: 'success' });
  }

  function showError(msg: string, options: Optionstype = {}) {
    show(msg, { ...options, color: 'error' });
  }

  function showWarning(msg: string, options: Optionstype = {}) {
    show(msg, { ...options, color: 'warning' });
  }

  function showInfo(msg: string, options: Optionstype = {}) {
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
