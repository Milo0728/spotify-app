import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Error404PageComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
