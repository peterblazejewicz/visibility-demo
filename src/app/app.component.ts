import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected title = 'Visibility demo';
  protected items?: string[];

  protected updateItems(count: number) {
    this.items = Array.from({ length: count }, (_, i) => `item ${i + 1}`);
  }

  protected showFirst() {
    const element = document.querySelector('.list-item:first-child');
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  protected showLast() {
    const element = document.querySelector('.list-item:last-child');
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

  public ngOnInit(): void {
    this.updateItems(10);
  }
}
