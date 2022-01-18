import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendario } from 'src/app/modelos/calendario.model';
import { CalendarioService } from 'src/app/services/calendario.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  id: string = "";
  calendario: Calendario;
  showModal: boolean = false;
  imageModal: string = "";
  mensajeModal:string = "";

  @ViewChild("botoncerrar") botonCerrar: ElementRef;
  @ViewChild("abrirModal") abrirModal: ElementRef;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private calendarioService: CalendarioService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.calendarioService.getCalendario(this.id).subscribe(
      calendario => {
        console.log(calendario)
        this.calendario = calendario;
      }
    )
  }

  ShowImange(indice: number):void{
    let hoy = new Date();
    
    
    if(this.calendario.imagenes){
      if(this.calendario.imagenes[indice].visto==true)
      {
        this.imageModal = this.calendario.imagenes[indice].src;
        this.mensajeModal = this.calendario.imagenes[indice].mensaje;
      }
      else{
        if((hoy.getMonth()+1)==12){
          console.log(hoy.getDate())
          console.log(indice)
          if(hoy.getDate() == indice+1){
            if(this.calendario.imagenes[indice].visto==false){
              this.calendario.imagenes[indice].visto=true;
              this.imageModal = this.calendario.imagenes[indice].src;
              this.calendarioService.updateCalendario(this.calendario);
            }
          }
          else this.botonCerrar.nativeElement.click();        
        }
        else this.botonCerrar.nativeElement.click();
      }
    }
  }
}
