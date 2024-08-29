import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent, CommonModule, FormsModule], // Ensure necessary modules are imported
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the chat component', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial messages', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.message').length).toBe(2);
    expect(compiled.querySelector('.message strong')?.textContent).toContain('john_doe');
  });

  it('should add a new message when sendMessage is called', () => {
    component.newMessage = 'Test message';
    component.sendMessage();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const messages = compiled.querySelectorAll('.message');
    expect(messages.length).toBe(3);
    expect(messages[messages.length - 1].textContent).toContain('Test message');
  });
});
