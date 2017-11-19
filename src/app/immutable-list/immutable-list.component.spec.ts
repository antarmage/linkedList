import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmutableListComponent } from './immutable-list.component';

describe('ImmutableListComponent', () => {
  let component: ImmutableListComponent;
  let fixture: ComponentFixture<ImmutableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmutableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmutableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
