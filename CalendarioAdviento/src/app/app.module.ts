import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat/';
import {AngularFirestoreModule, SETTINGS} from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { FigureComponent } from './components/calendario/figure/figure.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CalendarioService } from './services/calendario.service';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { RegistroComponent } from './components/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCalendarioComponent } from './components/form-calendario/form-calendario.component';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { StorageService } from './services/storage.service';
import { ModalAddImgComponent } from './components/form-calendario/modal-add-img/modal-add-img.component';
import { NoEncontradoComponentComponent } from './no-encontrado-component/no-encontrado-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CalendarioComponent,
    PrincipalComponent,
    FigureComponent,
    LoginComponent,
    RegistroComponent,
    FormCalendarioComponent,
    ModalAddImgComponent,
    NoEncontradoComponentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firetore, 'control-clientes'),
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [
    CalendarioService,
    LoginService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//"@ng-bootstrap/ng-bootstrap": "^10.0.0",
