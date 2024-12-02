import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { LoaderComponent } from '../../common/common-loader/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class CommonLoaderService {
  loaderComponentRef!: ComponentRef<LoaderComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,  //ViewContainerRef.createComponent
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  appendLoaderComponentToBody() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoaderComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.loaderComponentRef = componentRef;
  }

  removeLoaderComponentFromBody() {
    this.appRef.detachView(this.loaderComponentRef.hostView);
    this.loaderComponentRef.destroy();
  }
}
