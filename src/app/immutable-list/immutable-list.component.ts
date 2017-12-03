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
      this.immutableList =  this.setHeadValue(node);
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
  
  // get tail last
  getTailLast(list:NodeModel){
    let nodemodelinstance = list;
   return this.isNullCheck(nodemodelinstance.next) ? nodemodelinstance.element : this.getTailLast(nodemodelinstance.next);
  }
  // cons
  cons(value,toBePrependedList){
    let list = new NodeModel(value);
    list.next =  _.cloneDeep(toBePrependedList);
    return list;
  }
 
  // drop
  drop(numberOfELementsToBeDeleted){
    let deletedList;
    let clonedList =  _.cloneDeep(this.immutableList);
    let counter = numberOfELementsToBeDeleted;
    if(numberOfELementsToBeDeleted > 0){
      deletedList = new NodeModel(this.getTailList(clonedList.next).element);
      deletedList.next = this.getTailList(clonedList.next);
      this.drop(counter - 1)
    }
      return deletedList;
    
  }
  
  // reverse in progress
  reverse(list){
    let reverseList;
    let clonedList =  _.cloneDeep(list);
    let reverseListHead = new NodeModel(this.getHead(clonedList));
    reverseList =  this.prepareReverseList(reverseListHead,this.getTailList(clonedList));
    return reverseList;
  }
  prepareReverseList(listToBePrepended,list:NodeModel){
    // store head in element
    // make null to next
    // prepend the nest tail listdata
    let reversedList;
    reversedList = _.cloneDeep(this.cons(list.element,listToBePrepended));
    return this.isNullCheck(list.next) ? reversedList : this.prepareReverseList(this.cons(list.element,listToBePrepended),this.getTailList(list));
  }
  
  // filter
  filterMethod(list,predicate,result?){
    // check the value is present in the list
    // traverse the complete list
  if (predicate(list.element)) {
    result = new NodeModel(list.element);
  }
   return this.isNullCheck(list.next) ? result : this.filterMethod(list.next,predicate,result);
  }
  mapMethod(list,predicate,result?){
    let initialResult;
    initialResult = this.add(predicate(list.element));
    console.log(initialResult);
    return this.isNullCheck(list.next) ? initialResult : this.mapMethod(list.next,predicate,initialResult);
  }
  printList(){
     console.log(this.cons(60,this.immutableList));
     console.log(this.immutableList);
     console.log(this.drop(3));
     console.log(this.reverse(this.immutableList));
     let filterResult = this.filterMethod(this.immutableList,function(item){
       return item === 2;
     });
     console.log(filterResult);
     let mapResult = this.mapMethod(this.immutableList,function(item){
      return item * 2;
    });
    console.log(mapResult);
  }
  
// map
}
