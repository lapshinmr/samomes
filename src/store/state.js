import { DEFAULT_LANGUAGE } from '@/constants/lang';

export default {
  lang: DEFAULT_LANGUAGE,
  drawer: false,
  isSnackbar: false,
  snackbarMessage: '',
  guideIsClosed: {
    tanks: false,
    recipes: false,
    fertilizers: false,
    schedules: false,
    dynamics: false,
    remineralization: false,
  },
  tanks: [],
  recipes: [],
  fertilizers: [],
  schedules: [],
};
