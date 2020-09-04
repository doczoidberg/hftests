import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsconvComponent } from './xlsconv.component';

describe('XlsconvComponent', () => {
  let component: XlsconvComponent;
  let fixture: ComponentFixture<XlsconvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XlsconvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XlsconvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
