import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  public counter: number = 0;


  onReset(){
    this.counter = 0;
  }

  onIncrement(value: number) {
    this.counter+= value;
  }

}
