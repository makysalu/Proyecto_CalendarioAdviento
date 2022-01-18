import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-modal-add-img',
  templateUrl: './modal-add-img.component.html',
  styleUrls: ['./modal-add-img.component.css']
})
export class ModalAddImgComponent implements OnInit {
  file: File;
  photoSelected: string | ArrayBuffer | null;
  index: number = 0;
  modalReference: any;
  mensaje:string = '';

  constructor(private modalService: NgbModal) { }

  @Output() cargarImagen = new EventEmitter<any>();
  @ViewChild("content") content: ElementRef ;

  ngOnInit(): void {

  }

  open(index: number) {
    this.modalReference = this.modalService.open(this.content);
    this.index = index;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onPhotoSelected(event: HtmlInputEvent, index: number): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => this.photoSelected = reader.result;
    }
  }

  aceptar(){    
    if(this.photoSelected!=null){
      this.cargarImagen.emit({"index":this.index, "img":this.photoSelected, "file":this.file, "mensaje": this.mensaje});
      this.mensaje='';
      this.photoSelected = null;
      this.modalReference.close();
    }
  }

  cerrar(){
    this.mensaje='';
    this.photoSelected = null;
    this.modalReference.close();
  }
}
