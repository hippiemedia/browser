import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    //config.options.pushState = true; 

    config.mapUnknownRoutes(instruction => {
      instruction.config.moduleId = './node';
    });

    this.router = router;
  }
}
