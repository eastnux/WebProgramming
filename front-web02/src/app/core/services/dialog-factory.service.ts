import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../common/dialog/models/dialog-data.model';
import { DialogOptions } from '../../common/dialog/models/dialog-options.model';
import { DialogComponent } from '../../common/dialog/dialog-component/dialog.component';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogFactoryService<T = undefined>  {

  constructor(private dialog: MatDialog) {
  }

  open(dialogData: DialogData<T>,
       options: DialogOptions): void {
    const dialogRef = this.dialog.open<DialogComponent<T>, DialogData<T>>(
      DialogComponent,
      {
        ...this.fetchOptions(options),
        data: dialogData
      }
    );
    dialogRef.afterClosed().pipe(first());
  }

  close(){
    
  }

  private fetchOptions({
                         width,
                         height,
                         disableClose
                       }: DialogOptions): any {
    return {
      width: `${width}px`,
      height: `${height}px`,
      disableClose
    };
  }
}
