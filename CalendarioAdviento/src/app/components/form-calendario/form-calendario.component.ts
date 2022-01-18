import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Calendario, Imagen } from "src/app/modelos/calendario.model";
import { CalendarioComponent } from "../calendario/calendario.component";
import { CalendarioService } from "src/app/services/calendario.service";
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize, Observable } from "rxjs";
import { StorageService } from "src/app/services/storage.service";
import { ModalAddImgComponent } from './modal-add-img/modal-add-img.component';
import { LoginService } from '../../services/login.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from "@angular/router";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: "app-form-calendario",
  templateUrl: "./form-calendario.component.html",
  styleUrls: ["./form-calendario.component.css"],
})
export class FormCalendarioComponent implements OnInit {
  //#region photoselected
  photoSelected1: string | ArrayBuffer | null;
  photoSelected2: string | ArrayBuffer | null;
  photoSelected3: string | ArrayBuffer | null;
  photoSelected4: string | ArrayBuffer | null;
  photoSelected5: string | ArrayBuffer | null;
  photoSelected6: string | ArrayBuffer | null;
  photoSelected7: string | ArrayBuffer | null;
  photoSelected8: string | ArrayBuffer | null;
  photoSelected9: string | ArrayBuffer | null;
  photoSelected10: string | ArrayBuffer | null;
  photoSelected11: string | ArrayBuffer | null;
  photoSelected12: string | ArrayBuffer | null;
  photoSelected13: string | ArrayBuffer | null;
  photoSelected14: string | ArrayBuffer | null;
  photoSelected15: string | ArrayBuffer | null;
  photoSelected16: string | ArrayBuffer | null;
  photoSelected17: string | ArrayBuffer | null;
  photoSelected18: string | ArrayBuffer | null;
  photoSelected19: string | ArrayBuffer | null;
  photoSelected20: string | ArrayBuffer | null;
  photoSelected21: string | ArrayBuffer | null;
  photoSelected22: string | ArrayBuffer | null;
  photoSelected23: string | ArrayBuffer | null;
  photoSelected24: string | ArrayBuffer | null;
  //#endregion photoselected
  
  file: File;
  calendario: Calendario;
  imagenes: Imagen[] = [];

  files: File[]=[];
  calendarios: String[] = ["../../../../assets/calendario.jpg","../../../../assets/calendario2.png","../../../../assets/calendario3.png"]
  photoSelecteds: string[] | ArrayBuffer[] | null[] = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  designCalendario:number=1;
  opcionCalendario:number=1;
  uploadPercent: Observable<number>;
  idCalendario: string = ""; 

  @ViewChild(ModalAddImgComponent) modalHijoComponente: ModalAddImgComponent;

  @ViewChild("botonLauncherModal") botonLauncherModal: ElementRef ;
  @ViewChild("botoncerrarLauncherModal") botoncerrarLauncherModal: ElementRef;

  @ViewChild("botonCalendarioModal") botonCalendarioModal: ElementRef ;
  @ViewChild("botoncerrarCalendarioModal") botoncerrarCalendarioModal: ElementRef;

  constructor(private calendarioService: CalendarioService, private storage:AngularFireStorage, private storageService: StorageService, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth =>{
      if(!auth){
        this.router.navigate(['/login'])
      }
    })
  }

  cambioOpcion(opcion: number){
    this.opcionCalendario = opcion;
  }

  cambioDesign(opcion: number){
    this.designCalendario = opcion;
  }

  cargarImagen(res: {index:number, img:string | ArrayBuffer | null, file:File, mensaje:string}) {
    this.photoSelected1 = res.img;
    this.photoSelecteds[res.index] = res.img;
    
    this.files[res.index] = res.file;
    
    this.imagenes[res.index] =  {id:res.index+1, src:'', visto:false, mensaje:res.mensaje};
  }

  addPhoto(index: number): void{
    this.modalHijoComponente.open(index);
  }
  

  async generarCalendario(){
    if(this.imagenes.length<23){
      alert("Fantan imagenes para subir")
    }
    else{
      this.botonLauncherModal.nativeElement.click();
      
      let cont = 0;
      for(let file of this.files) { 
        await this.storageService.insertFichero(file).then(
          x => this.imagenes[cont].src = x
        )
        cont ++;            
      }

      this.calendario = {
        imagenes: this.imagenes,
        plantilla: this.designCalendario,
        background: this.opcionCalendario
      }

      
      var doccalendario = await this.calendarioService.insertCalendario(this.calendario);
      this.calendario = doccalendario;
      
      if(this.calendario.id){
        this.idCalendario = this.calendario.id;
        this.botoncerrarLauncherModal.nativeElement.click();

        this.botonCalendarioModal.nativeElement.click();
      }
      
      
    } 
  }
}
