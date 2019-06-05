import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public todolistarr = [];
  public editfilter = [];
  public todoForm: FormGroup;
  public todoEditForm: FormGroup;
  
  ngOnInit(){
    this.todolistarr = JSON.parse(localStorage.getItem('todo'));
  }

  constructor(private fb: FormBuilder){
    this.todoForm = this.fb.group({
      todolist: ['', [Validators.required]]
    });

    ///code for editTodo
    const previoustodo = JSON.parse(localStorage.getItem('todo'));
    console.log('edittodo', previoustodo);

    //formgroup for editForm
    this.todoEditForm = this.fb.group({
      hiddenid: ['', [Validators.required]], 
      todolist: ['', [Validators.required]]            
    });

    console.log('value',this.todoEditForm.value);
  }
  myfun(){
    return false;
  }

  onSubmitTodo(){
    // localStorage.clear();
    var previousTodo = JSON.parse(localStorage.getItem('todo')) || [];
    
    var counter = previousTodo.length;

    if(counter < 1)
    {
      var id = 1;
    }
    else{
      var id = ++counter;
    }

    var todoobj = {
      'id': id,
      'todolist': this.todoForm.value.todolist
    }

    previousTodo.push(todoobj);

    localStorage.setItem('todo', JSON.stringify(previousTodo));
    this.todolistarr = JSON.parse(localStorage.getItem('todo'));
    this.todoForm.reset();
  }

  //this method is for displaying selected data from todolist to edit form on clicking edit button
  onEditTodo(id){
    var previoustodo = JSON.parse(localStorage.getItem('todo'));
    this.editfilter = previoustodo.filter(m => m.id === id);
  }

  onEditSubmitTodo(id){
    var previoustodo = JSON.parse(localStorage.getItem('todo'));
    const data = previoustodo.filter(m => m.id === this.editfilter[0].id);    
    var newdata = {
      'hiddenid': data[0].id,
      'todolist': this.todoEditForm.value.todolist
    }   
    var index = previoustodo.findIndex(m => m.id == data[0].id);
    previoustodo[index] = newdata;
    localStorage.setItem('todo', JSON.stringify(previoustodo));
    this.todolistarr = JSON.parse(localStorage.getItem('todo'));
  }

  //deleting todo list from localStorage
  onDeleteTodo(id){
    var index = this.todolistarr.findIndex(x => x.id === id);
    this.todolistarr.splice(index, 1);
    localStorage.setItem('todo',JSON.stringify(this.todolistarr));
    this.todoEditForm.reset();
  }

}
