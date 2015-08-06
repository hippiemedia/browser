
export class Agent {

  url = null;
  factory = null;
  method = 'GET';
  data = {};

  constructor(url) {

    this.url = url;

    hyperagent.default.configure('ajax', options => {
      options.url = this.url + options.url;
      options.type = this.method;
      options.data = this.data;

      return jQuery.ajax(options).complete((xhr) => {
        this.content = xhr.responseText;
        console.log(window.location.origin + xhr.getResponseHeader('X-Debug-Token-Link'));
      });
    });
    hyperagent.default.configure('defer', q.defer);
    hyperagent.default.configure('_', _);

    hyperagent.default.configure('loadHooks', [hyperagentForms.default.LoadHook]);

    this.factory = hyperagent.default.Resource;
  }

  fetch(path, method, data) {
    this.method = method || 'GET';
    this.data = data || {};
    var api = new this.factory({
      url: path,
      headers: {
        'X-Requested-With': 'Hyperagent'
      }
    });

    return api.fetch();
  }

  getResponse() {
    return this.content;
  }
}
