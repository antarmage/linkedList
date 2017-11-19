import { Component, OnInit } from '@angular/core';
import { NodeModel } from '../shared/models/node';
import * as _ from "lodash";
import { NodeData } from '@angular/core/src/view';
@Component({
  selector: 'app-immutable-list',
  templateUrl: './immutable-list.component.html',
  styleUrls: ['./immutable-list.component.css']
})
export class ImmutableListComponent implements OnInit {
head;
size;
immutableList :NodeModel;
  constructor() {
        this.head = null;
        this.size = 0;
   }

  ngOnInit() {
    for(var i=1;i<=10;i++){ 
      this.add(i);
     };
    this.printList();
  }
  // add
  add(element){
    let node = new NodeModel(element);
    if(this.isNullCheck(this.head)){
      this.immutableList =  this.setHeadValue(node)
    }else{
      let clonedList = _.cloneDeep(this.immutableList);
      this.immutableList = this.prepareList(node,clonedList);
    }
  }
  setHeadValue(nodeValue){
    this.head = nodeValue;
    return this.head;
  }
  prepareList(nodeValue,list:NodeModel){
    if(this.isNullCheck(list.next)){
      list.next = nodeValue;
    }else{
      let nodemodelinstance = list;
      this.prepareList(nodeValue,nodemodelinstance.next);
    }
    return list;
  }
  
  printList(){
    console.log(this.cons(60));
    console.log(this.drop(3));
    console.log(this.immutableList);
    console.log(this.reverse());
  }
  //current node
  //check null
  isNullCheck(value){
    return value == null;
  }
// get head
  getHead(list:NodeModel){
    return list.element;
  }
  // get all the tail list except head
  getTailList(list:NodeModel){
    return list.next;
  }
  traverseListOnce(list:NodeModel){
    let nodemodelinstance = list;
    return nodemodelinstance.next;
  }
  // get tail last
  getTailLast(list:NodeModel){
    let nodemodelinstance = list;
   return this.isNullCheck(nodemodelinstance.next) ? nodemodelinstance.element : this.getTailLast(nodemodelinstance.next);
  }
  // cons
  cons(value){
    let list = new NodeModel(value);
    list.next =  _.cloneDeep(this.immutableList);
    return list;
  }
 
  // drop
  drop(numberOfELementsToBeDeleted){
    let deletedList;
    let clonedList =  _.cloneDeep(this.immutableList);
    let counter = numberOfELementsToBeDeleted;
    if(numberOfELementsToBeDeleted > 0){
      deletedList = new NodeModel(this.traverseListOnce(clonedList.next).element);
      deletedList.next = this.traverseListOnce(clonedList.next);
      this.drop(counter - 1)
    }
      return deletedList;
    
  }
  
  // reverse
  reverse(modifiedList?){
    let reverseList;
    let clonedList =  _.cloneDeep(this.immutableList);
    reverseList =  this.prepareReverseList(this.getHead(clonedList),clonedList);
    console.log(reverseList);
    return reverseList;
  }
  prepareReverseList(nodeValue,list){
    if(this.isNullCheck(list.next)){
      list.element = nodeValue;
    }else{
      let nodemodelinstance = list;
      this.prepareReverseList(nodeValue,nodemodelinstance.next);
    }
    return list;
  }
  
// filter
// map
}
