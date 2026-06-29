import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'; // Import Vuetify's color palette

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.deepPurple.base, // Sets color="primary" to deep-purple
            },
            dark: {
                primary: colors.deepPurple.lighten3, // Optional: deep-purple for dark mode
            },
        },
    },
});
