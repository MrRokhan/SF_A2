import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: any;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should login and redirect to dashboard for Super Admin', () => {
    component.username = 'super';
    component.password = '123';
    component.login();
    expect(component.getCurrentUser()?.username).toEqual('super');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should login and redirect to groups for Group Admin', () => {
    component.username = 'admin1';
    component.password = 'admin123';
    component.login();
    expect(component.getCurrentUser()?.username).toEqual('admin1');
    expect(router.navigate).toHaveBeenCalledWith(['/groups']);
  });

  it('should login and redirect to chat for User', () => {
    component.username = 'user1';
    component.password = 'user123';
    component.login();
    expect(component.getCurrentUser()?.username).toEqual('user1');
    expect(router.navigate).toHaveBeenCalledWith(['/chat']);
  });

  it('should show error with invalid credentials', () => {
    component.username = 'wrong';
    component.password = 'credentials';
    component.login();
    expect(component.errorMessage).toEqual('Invalid username or password');
  });

  it('should logout successfully', () => {
    component.logout();
    expect(component.getCurrentUser()).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });
});
