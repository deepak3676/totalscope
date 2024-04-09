import { Component } from '@angular/core';

@Component({
  selector: 'app-decking-notes',
  templateUrl: './decking-notes.component.html',
  styleUrls: ['./decking-notes.component.scss']
})
export class DeckingNotesComponent {
 
  public showAdd: boolean = true;
  public checked: boolean = false;
  // public normalValue: string = 'The roof planks require replacement.'

  public onClickAdd()
  {
    this.showAdd = false;
  }

  public onClickCancel()
  {
    this.showAdd = true;
  }
}
