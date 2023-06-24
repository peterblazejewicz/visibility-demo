import { AfterViewInit, ChangeDetectorRef, ContentChildren, Directive, ElementRef, HostBinding, QueryList, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[listScrollView]',
  standalone: true,
})
export class ScrollViewDirective implements AfterViewInit {
  @HostBinding('class.has-top-overflow')
  private hasTopOverflow = false;
  @HostBinding('class.has-bottom-overflow')
  private hasBottomOverflow = false;

  private readonly options = {
    root: this.elementRef.nativeElement,
    threshold: [.25, 1],
  };
  private readonly cdr = inject(ChangeDetectorRef);

  @ContentChildren('listScrollViewItem', { read: ElementRef<HTMLElement> })
  protected readonly elements!: QueryList<ElementRef<HTMLElement>>;

  private intersectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      this.processIntersectionEntry(entry);
    }
  }, this.options);

  public constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    this.elements.changes.pipe(tap(() => {
      this.reset();
      this.addObservers();
    }),
      untilDestroyed(this)).subscribe();
    this.addObservers();
  }

  public ngOnDestroy(): void {
    this.reset();
  }

  private addObservers() {
    const { first, last } = this.elements;
    this.observeElement(first?.nativeElement);
    this.observeElement(last?.nativeElement)
  }

  private reset() {
    this?.intersectionObserver?.disconnect();
    this.hasBottomOverflow =
      this.hasTopOverflow = false;
  }

  private observeElement(element?: HTMLElement) {
    if (!element) return;
    this.intersectionObserver?.observe(element);
  }

  private processIntersectionEntry({ target, isIntersecting }: IntersectionObserverEntry): void {
    const { first, last } = this.elements;
    switch (target) {
      case first.nativeElement:
        this.hasTopOverflow = !isIntersecting;
        break;
      case last.nativeElement:
        this.hasBottomOverflow = !isIntersecting;
        break;
    }
    this.cdr.detectChanges();
  }
}
