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
    // console.log(this.todolist);
    this.todolistarr = JSON.parse(localStorage.getItem('todo'));
  }
  constructor(private fb: FormBuilder){

    this.todoForm = this.fb.group({
      "todolist": ['', [Validators.required]]
    });

   

    ///code for editTodo
    const previoustodo = JSON.parse(localStorage.getItem('todo'));
    console.log('edittodo', previoustodo);

    // this.editfilter = edittodo.filter(edid => edid.id === );
    // this.neweditFilter = previoustodo.filter(xid => xid === this.editfilter[0].id);
    //formgroup for editForm
    this.todoEditForm = this.fb.group({
      "todolist": ['', [Validators.required]]      
    })

    console.log('value',this.todoEditForm.value);
  }

  

  onSubmitTodo(){
    // console.log(this.todoForm.value);
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
    // console.log(this.todolistarr);
    this.todoForm.reset();
  }

  //this method is for displaying selected data from todolist to edit form on clicking edit button
  onEditTodo(id){
    var previoustodo = JSON.parse(localStorage.getItem('todo'));
    this.editfilter = previoustodo.filter(m => m.id === id);
    // console.log('editfilter',this.editfilter);
  }

  onEditSubmitTodo(){
    var previoustodo = JSON.parse(localStorage.getItem('todo'));
    const data = previoustodo.filter(m => m.id === this.editfilter[0].id);
    console.log('data of edit item :', data);
    
    var newdata = {
      'id': data.id,
      'todolist': this.todoEditForm.value.todolit
    }

    var index = previoustodo.filter(m => m.id == newdata.id);

    console.log('index',index);
  }

  onDeleteTodo(id){
    // console.log('id',id);

    var index = this.todolistarr.findIndex(x => x.id === id);
    // console.log('index',index);
    this.todolistarr.splice(index, 1);
    localStorage.setItem('todo',JSON.stringify(this.todolistarr));
  }

}
