import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEmail]'
})
export class EmailDirective implements OnInit {

  constructor(private element:ElementRef,private renderer:Renderer2) { }
  ngOnInit() {
    this.renderer.setStyle(this.element.nativeElement,'background-color','red');
    console.log(this.element.nativeElement.innerHTML);
    if(this.element.nativeElement.innerHTML!="hey"){
    //  confirm("are you robot?");
    }
    }

}
