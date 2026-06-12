import { Component } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-todo-list',
    imports: [CdkDropList, CdkDrag],
    templateUrl: './todo-list.html',
    styleUrl: './todo-list.css',
})
export class ToDoList {
    protected readonly todoItems = ['Setup project', 'Write requirements', 'Design UI'];
    protected readonly doneItems = ['Create repo', 'Add README'];

    protected drop($event: CdkDragDrop<string[]>) {
        // previourContainer -> Start -> Drag from
        // container -> End -> Drop To
         console.log($event);
        if($event.container === $event.previousContainer) { // Moving within Container 
            moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex); 
        } else {
          transferArrayItem(
            $event.previousContainer.data,
            $event.container.data,
            $event.previousIndex,
            $event.currentIndex,
          )  
        }
    }
}