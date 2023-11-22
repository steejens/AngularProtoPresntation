import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CreatePresentationComponent } from './components/create-presentation/create-presentation.component';
import { JoinPresentationComponent } from './components/join-presentation/join-presentation.component';
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    CreatePresentationComponent,
    JoinPresentationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
