import {
  Directive,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[error-msg]',
})
export class ErrorMsgDirective implements OnInit {

  private _color: string = 'red';
  private _mensaje: string = 'Campo requerido';

  htmlElement: ElementRef<HTMLElement>;

  @Input() set color(valor: string) {
    this._color = valor;
    this.setColor();
  }

  @Input() set mensaje(valor: string) {
    this._mensaje = valor;
    this.setMensaje();
  }

  @Input() set valido(valor: boolean) {
    if(valor){
      this.htmlElement.nativeElement.classList.add('d-none');
    }else{
      this.htmlElement.nativeElement.classList.remove('d-none');
    }
  }


  constructor(private el: ElementRef<HTMLElement>) {
    console.log('constructor error-msg');
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setEstilo();
    this.setColor();
    this.setMensaje();
  }

  setEstilo(){
    this.htmlElement.nativeElement.classList.add('form-text');
  }

  setColor():void{
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setMensaje():void{
    this.htmlElement.nativeElement.innerText = this._mensaje;
  }

}
