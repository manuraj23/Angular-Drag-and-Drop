import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  todo: string[] = [
    'Design Login Page',
    'Create REST API',
    'Write Unit Tests'
  ];

  inProgress: string[] = [
    'Angular UI Integration'
  ];

  done: string[] = [
    'Project Setup'
  ];

  draggedTask: string | null = null;
  draggedFrom: 'todo' | 'inProgress' | 'done' | null = null;

  onDragStart(task: string, from: 'todo' | 'inProgress' | 'done') {
    this.draggedTask = task;
    this.draggedFrom = from;
  }

  onDrop(to: 'todo' | 'inProgress' | 'done') {
    if (!this.draggedTask || !this.draggedFrom) return;

    // remove from source
    this[this.draggedFrom] = this[this.draggedFrom].filter(
      t => t !== this.draggedTask
    );

    // add to target
    this[to].push(this.draggedTask);

    // reset
    this.draggedTask = null;
    this.draggedFrom = null;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
