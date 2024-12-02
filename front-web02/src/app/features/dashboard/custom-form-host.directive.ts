import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[customFormHost]',
})
export class CustomFormHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
