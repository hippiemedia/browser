
import {factory} from 'docteurklein/hippiemedia';

export class Node {

  resource = null;

  constructor(){
    document.addEventListener('submit', event => {
      event.preventDefault();
      var form = event.target;
      this.activate({
        path: form.action.substring(window.location.origin.length),
        method: form.method,
        data: $(form).serializeArray(),
      });
    });

    this.agent = factory(client => {
      return function(method, url, params, headers = {}) {
        if (-1 === url.indexOf('localhost')) {
            url = url[0] == '/' ? url.slice(1) : url;
            headers['X-Original-Url'] = url;
            url = 'https://unicorn-cors-proxy.herokuapp.com/'+url;
        }

        return client(method, url, params, headers);
      };
    });
  }

  activate(params) {
    return this.agent._call(params.method || 'GET', params.path, params.data)
      .then(resource => {
        this.resource = resource;
      })
      .catch(console.error.bind(console))
    ;
  }
}

export class LogValueConverter {
  toView(value) {
    return console.log(value);
  }
}

export class AsStringValueConverter {
  toView(value) {
    return JSON.stringify(value, null, '\t');
  }
}
