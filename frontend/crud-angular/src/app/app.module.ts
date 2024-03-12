import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { EmpleadoService } from './services/empleado.service';
import { InventarioService } from './services/inventario.service';
import { PolizaService } from './services/poliza.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(), EmpleadoService, InventarioService, PolizaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
