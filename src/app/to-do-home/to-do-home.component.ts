import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do-home',
  templateUrl: './to-do-home.component.html',
  styleUrls: ['./to-do-home.component.css']
})
export class ToDoHomeComponent implements OnInit {

  // Declarations
  modalRef: BsModalRef;
  tdForm: FormGroup;
  toDoList = [];
  starredToDo = [];
  tab: Number = 1;

  constructor(private modalService: BsModalService, private fb: FormBuilder) { }

  openModal(template: TemplateRef<any>) {
    this.initalizeModal();
    this.modalRef = this.modalService.show(template);
  }
  /**
   * Update localStorage
   */
  updateLocalStorage() {
    if (typeof (Storage) !== 'undefined') {
      localStorage.clear();
      localStorage.setItem('todo', JSON.stringify(this.toDoList));
    } else {
      alert('localStorage Not supported on this browser');
    }
  }

  /**
   * select Tab
   */
  selectTab(selectedTab) {
    this.tab = selectedTab;
  }

  /**
   *  Save ToDo Item
   *
   * @isValid (boolean) - form validity
   *
   * @return boolean
   */
  todoSubmit(isValid: boolean) {
    if (isValid) {
      this.toDoList.push({
        'title': this.tdForm.controls['title'].value,
        'description': this.tdForm.controls['description'].value,
        'created_timestamp': Date.now(),
        'user_name': 'Jack Sparrow',
        'starred': false,
        'id': Date.now()
      });
      this.updateLocalStorage();
      this.modalRef.hide();
    }
    return true;
  }


  /**
   * Initialize the modal
   *
   * @return boolean
   */
  updateStar(id) {
    this.toDoList.map((obj) => {
      if (obj.id === id) {
        if (obj.starred) {
          obj.starred = false;
          this.starredToDo = this.starredToDo.filter(function (item) { return item.id !== id; });
        } else {
          obj.starred = true;
          this.starredToDo.push(obj);
        }
        this.updateLocalStorage();
      }
    });
    return true;
  }

  /**
   * Initialize the modal
   *
   * @return boolean
   */
  initalizeModal() {
    this.tdForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    return true;
  }

  /**
   * Get ToDO List from localStorage
   *
   * @return boolean
   */
  getTodoList() {
    if (typeof (Storage) !== 'undefined') {
      console.log(localStorage.getItem('todo'));
      if (localStorage.getItem('todo') !== null && localStorage.getItem('todo') !== undefined) {
        this.toDoList = JSON.parse(localStorage.getItem('todo'));
        this.starredToDo = this.toDoList.filter((item) => item.starred);
      } else {
        this.toDoList = [];
        this.starredToDo = [];
      }
    } else {
      alert('localStorage Not supported on this browser');
    }
    return true;
  }

  /**
   * Initialize the component
   *
   * @return boolean
   */
  ngOnInit() {
    this.initalizeModal();
    this.getTodoList();
    return true;
  }

}
