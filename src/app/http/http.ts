import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'http',
  templateUrl: './http.html',
  styleUrls: ['http.css']
})

export class HttpExampleComponent implements OnInit {
  responseData: Todo;
  // = {
  //   userId: 0,
  //   id: 0,
  //   title: '',
  //   completed: false
  // };
  createdResponse: string = "";
  updatedResponse: string = "";
  deletedResponse: string = "";
  
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // this.getAPI();
  }


  getAPI() {
    this.http.get<Todo>('https://jsonplaceholder.typicode.com/todos/1').subscribe({
      next: (response: Todo) => {
        this.responseData = response;
      },
      error: error => {
        throw new Error('Failed loading data.', error);
      },
      complete: () => {
        console.log("--------------> Completed");
      }
    });
  }

  createTodo() {
    const newTodo: Todo = {
      userId: 1,
      id: 1,
      title: 'New Todo',
      completed: false
    };

    this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo).subscribe({
      next: response => {
        console.log('Todo created:', response);
        this.createdResponse ="Todo created";
      },
      error: error => {
        console.error('Failed creating todo:', error);
        this.createdResponse ="Todo Create Operation Failed";
      }
    });
  }


  updateTodo() {
    const updatedTodo: Todo = {
      userId: 1,
      id: 1,
      title: 'Updated Todo',
      completed: true
    };

    this.http.put<Todo>('https://jsonplaceholder.typicode.com/todos/1', updatedTodo).subscribe({
      next: response => {
        console.log('Todo updated:', response);
        this.updatedResponse ="Todo Updated";
      },
      error: error => {
        console.error('Failed updating todo:', error);
        this.updatedResponse ="Todo Update  Operation Failed";
      }
    });
  }

  deleteTodo() {
    this.http.delete('https://jsonplaceholder.typicode.com/todos/1').subscribe({
      next: () => {
        console.log('Todo deleted');
        this.deletedResponse ="Todo Deleted";
      },
      error: error => {
        console.error('Failed deleting todo:', error);
        this.deletedResponse ="Todo Delete Operation Failed";
      }
    });
  }

}
