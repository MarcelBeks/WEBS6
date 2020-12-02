import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>

  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  find(tagName: string) {
    return this.fixture.debugElement
      .query(By.css(tagName));
  }

  count(tagName: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.length;
  }

  clickButton(buttonText: string) {
    const foundButtons = this.findAll('button')
      .map(button => button.nativeElement)
      .filter(button => button.innerText === buttonText);

    if (foundButtons.length < 1) {
      fail(`Expected exactly one button with text "${buttonText}" but found ${foundButtons.length}`);
    }

    foundButtons[0].click();
  }

  findAll(tagName: string) {
    return this.fixture.debugElement
      .queryAll(By.css(tagName));
  }
}