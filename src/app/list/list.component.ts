import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ScrollViewDirective } from '../scroll-view/scroll-view.directive';


export const trackBy = (index: number, item: string) =>
  `${index}-${item}`;


@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, NgIf, ScrollViewDirective]
})
export class ListComponent {

  @Input()
  public items?: string[];

  protected trackBy = trackBy;
}