import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() featureEvent = new EventEmitter<string>();
  onSelect(item: string){
    if(item === 'recipe') {
      this.featureEvent.emit(item);
    } else if(item === 'shopping-list') {
      this.featureEvent.emit(item);
    }
  }
}
