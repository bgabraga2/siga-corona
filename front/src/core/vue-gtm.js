export default {
  install: (Vue, options) => {
    const $gtm = {
      isEnabled: function(gtmConfig) {
        return !!gtmConfig.id;
      },
      sendCustomEvent: function(eventName, eventData) {
        const eventToSend = { ...eventData, event: eventName };

        const isEnabled = this.isEnabled(options);

        if (isEnabled) {
          window['dataLayer'].push(eventToSend);
        }
      }
    };
    Vue.prototype.$gtm = $gtm;
    if ($gtm.isEnabled(options)) {
      insertTag(options);
    }
  }
};

const insertTag = function(gtmConfig) {
  window['dataLayer'] = [];
  setTimeout(() => {
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', gtmConfig.id);
  }, 1);
};
