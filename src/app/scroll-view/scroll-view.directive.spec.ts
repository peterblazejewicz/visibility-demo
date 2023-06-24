import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { ScrollViewDirective } from "./scroll-view.directive";

@Component({
  selector: 'host-component',
  template: `
    <div class="list" #scrollView listScrollView>
        <ng-container *ngFor="let item of items">
            <div class="list-item" #listScrollViewItem>{{ item }}</div>
        </ng-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .list {
      height: 100px;
      overflow: hidden;
    }
    .list-item {
      height: 10px;
    }
  `],
  standalone: true,
  imports: [
    NgFor,
    ScrollViewDirective,
  ]
})
export class TestComponent {
  public items: string[] = [];
}

describe('ScrollViewDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, ScrollViewDirective, NgFor]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.items = Array.from({ length: 15 }, (_, i) => `item ${i + 1}`);
    fixture.detectChanges();
  });

  it('should create an instance of directive', () => {
    const sut = fixture.debugElement.query(By.directive(ScrollViewDirective));
    expect(sut).toBeTruthy();
  });
});
