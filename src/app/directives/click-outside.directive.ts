import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  constructor(private _elementRef: ElementRef) {}

  @Output()
  public appClickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  @HostListener('document:touchstart', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(
      targetElement
    );
    if (!clickedInside) {
      this.appClickOutside.emit(targetElement);
    }
  }
}
