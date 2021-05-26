import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';


@NgModule({
  declarations: [
    ImagePipe,
    SafeHtmlPipe,
  ],
  exports: [
    ImagePipe,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
