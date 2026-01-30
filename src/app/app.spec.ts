import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('🧩 Jira Dashboard');
  });

  describe('Initial State', () => {
    it('should initialize with correct todo tasks', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      expect(app.todo).toEqual([
        'Design Login Page',
        'Create REST API',
        'Write Unit Tests'
      ]);
    });

    it('should initialize with correct inProgress tasks', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      expect(app.inProgress).toEqual([
        'Angular UI Integration'
      ]);
    });

    it('should initialize with correct done tasks', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      expect(app.done).toEqual([
        'Project Setup'
      ]);
    });

    it('should initialize draggedTask as null', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      expect(app.draggedTask).toBeNull();
    });

    it('should initialize draggedFrom as null', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      expect(app.draggedFrom).toBeNull();
    });
  });

  describe('onDragStart', () => {
    it('should set draggedTask and draggedFrom when drag starts from todo', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      app.onDragStart('Design Login Page', 'todo');
      
      expect(app.draggedTask).toBe('Design Login Page');
      expect(app.draggedFrom).toBe('todo');
    });

    it('should set draggedTask and draggedFrom when drag starts from inProgress', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      app.onDragStart('Angular UI Integration', 'inProgress');
      
      expect(app.draggedTask).toBe('Angular UI Integration');
      expect(app.draggedFrom).toBe('inProgress');
    });

    it('should set draggedTask and draggedFrom when drag starts from done', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      app.onDragStart('Project Setup', 'done');
      
      expect(app.draggedTask).toBe('Project Setup');
      expect(app.draggedFrom).toBe('done');
    });
  });

  describe('onDrop', () => {
    it('should move task from todo to inProgress', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      app.onDragStart('Design Login Page', 'todo');
      app.onDrop('inProgress');
      
      expect(app.todo).not.toContain('Design Login Page');
      expect(app.inProgress).toContain('Design Login Page');
      expect(app.draggedTask).toBeNull();
      expect(app.draggedFrom).toBeNull();
    });

    it('should move task from todo to done', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      app.onDragStart('Create REST API', 'todo');
      app.onDrop('done');
      
      expect(app.todo).not.toContain('Create REST API');
      expect(app.done).toContain('Create REST API');
      expect(app.draggedTask).toBeNull();
      expect(app.draggedFrom).toBeNull();
    });

    it('should move task from inProgress to todo', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      app.onDragStart('Angular UI Integration', 'inProgress');
      app.onDrop('todo');
      
      expect(app.inProgress).not.toContain('Angular UI Integration');
      expect(app.todo).toContain('Angular UI Integration');
      expect(app.draggedTask).toBeNull();
      expect(app.draggedFrom).toBeNull();
    });

    it('should move task from inProgress to done', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      app.onDragStart('Angular UI Integration', 'inProgress');
      app.onDrop('done');
      
      expect(app.inProgress).not.toContain('Angular UI Integration');
      expect(app.done).toContain('Angular UI Integration');
      expect(app.draggedTask).toBeNull();
      expect(app.draggedFrom).toBeNull();
    });

    it('should move task from done to todo', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      app.onDragStart('Project Setup', 'done');
      app.onDrop('todo');
      
      expect(app.done).not.toContain('Project Setup');
      expect(app.todo).toContain('Project Setup');
      expect(app.draggedTask).toBeNull();
      expect(app.draggedFrom).toBeNull();
    });

    it('should move task from done to inProgress', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      app.onDragStart('Project Setup', 'done');
      app.onDrop('inProgress');
      
      expect(app.done).not.toContain('Project Setup');
      expect(app.inProgress).toContain('Project Setup');
      expect(app.draggedTask).toBeNull();
      expect(app.draggedFrom).toBeNull();
    });

    it('should not do anything if draggedTask is null', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      const todoBefore = [...app.todo];
      const inProgressBefore = [...app.inProgress];
      const doneBefore = [...app.done];
      
      app.draggedTask = null;
      app.draggedFrom = 'todo';
      app.onDrop('inProgress');
      
      expect(app.todo).toEqual(todoBefore);
      expect(app.inProgress).toEqual(inProgressBefore);
      expect(app.done).toEqual(doneBefore);
    });

    it('should not do anything if draggedFrom is null', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      const todoBefore = [...app.todo];
      const inProgressBefore = [...app.inProgress];
      const doneBefore = [...app.done];
      
      app.draggedTask = 'Test Task';
      app.draggedFrom = null;
      app.onDrop('inProgress');
      
      expect(app.todo).toEqual(todoBefore);
      expect(app.inProgress).toEqual(inProgressBefore);
      expect(app.done).toEqual(doneBefore);
    });

    it('should handle dropping task in the same column', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      const initialTodoLength = app.todo.length;
      
      app.onDragStart('Design Login Page', 'todo');
      app.onDrop('todo');
      
      expect(app.todo).toContain('Design Login Page');
      expect(app.todo.length).toBe(initialTodoLength);
      expect(app.draggedTask).toBeNull();
      expect(app.draggedFrom).toBeNull();
    });
  });

  describe('allowDrop', () => {
    it('should call preventDefault on the drag event', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      const mockEvent = jasmine.createSpyObj('DragEvent', ['preventDefault']);
      
      app.allowDrop(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('DOM Rendering', () => {
    it('should render all todo tasks', async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const todoColumn = compiled.querySelectorAll('.column')[0];
      const taskCards = todoColumn.querySelectorAll('.task-card');
      
      expect(taskCards.length).toBe(3);
      expect(taskCards[0].textContent?.trim()).toContain('Design Login Page');
      expect(taskCards[1].textContent?.trim()).toContain('Create REST API');
      expect(taskCards[2].textContent?.trim()).toContain('Write Unit Tests');
    });

    it('should render all inProgress tasks', async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const inProgressColumn = compiled.querySelectorAll('.column')[1];
      const taskCards = inProgressColumn.querySelectorAll('.task-card');
      
      expect(taskCards.length).toBe(1);
      expect(taskCards[0].textContent?.trim()).toContain('Angular UI Integration');
    });

    it('should render all done tasks', async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const doneColumn = compiled.querySelectorAll('.column')[2];
      const taskCards = doneColumn.querySelectorAll('.task-card');
      
      expect(taskCards.length).toBe(1);
      expect(taskCards[0].textContent?.trim()).toContain('Project Setup');
    });

    it('should render three columns with correct headers', async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const columns = compiled.querySelectorAll('.column');
      
      expect(columns.length).toBe(3);
      expect(columns[0].querySelector('h2')?.textContent).toContain('📝 Tasks');
      expect(columns[1].querySelector('h2')?.textContent).toContain('🚧 In Progress');
      expect(columns[2].querySelector('h2')?.textContent).toContain('✅ Completed');
    });

    it('should make task cards draggable', async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const taskCards = compiled.querySelectorAll('.task-card');
      
      taskCards.forEach(card => {
        expect(card.getAttribute('draggable')).toBe('true');
      });
    });
  });
});
