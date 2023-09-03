import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

// import { CustomFilter}         from './customFilter';

import { FileValidator } from '../custom_validation/file-input.validator';
import { FileValueAccessor } from '../custom_validation/file-control-value-accessor';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [  FileValueAccessor,FileValidator ],
  exports:      [  ],
  providers: [FileValidator]
})
export class SharedModule { }