import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlaylistComponent } from './form-playlist.component';

describe('FormPlaylistComponent', () => {
  let component: FormPlaylistComponent;
  let fixture: ComponentFixture<FormPlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPlaylistComponent]
    });
    fixture = TestBed.createComponent(FormPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
