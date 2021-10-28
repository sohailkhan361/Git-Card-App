import {of} from 'rxjs';
import {map} from 'rxjs/operators';

import { from } from 'rxjs';
import { max } from 'rxjs/operators';

import { Observable } from 'rxjs';


//For max vale from a list
let list1 = [1, 6, 15, 10, 58, 2, 40];
from(list1).pipe(max((a,b)=>a-b)).subscribe(x => console.log(
   "The Max value is "+x)
);

//For square of numbers
map(x => x*x)(of(1,2,3)).subscribe((v) => console.log(`output is ${v}`));


// 1. Create Observable...................................................................................
// The observable can be created using observable constructor and
//  also using observable create method and
//   by passing subscribe function as an argument to it as shown below −
// Different ways to create observables:
var observable = new Observable(
    function subscribe(subscriber) {
       subscriber.next("My First Observable using new")
    }
 );

 var observer = Observable.create(
    function subscribe(subscriber) {
       subscriber.next("My First Observable using create")
    }
 );

//subscribing it:
observable.subscribe(x => console.log(x));  //using new
observer.subscribe(x => console.log(x));    //using create

// 2. Execute Observable.................................................................................
// An observable gets executed when it is subscribed. 
//An observer is an object with three methods that are notified,
// next() − This method will send values like a number, string, object etc.
// complete() − This method will not send any value and indicates the observable as completed.
// error() − This method will send the error if any.
// Let us create the observable with all three notifications and execute the same.

var observer2 = new Observable(
    function subscribe(subscriber) {
       try {
          subscriber.next("My First Observable2");
          subscriber.next("Testing Observable2");
          subscriber.complete();
       } catch(e){
          subscriber.error(e);
       }
    }
 );
 observer2.subscribe(x => console.log(x), (e)=>console.log(e), 
    ()=>console.log("Observable2 is complete"));

