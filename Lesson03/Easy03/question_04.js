//What will the following code output?

let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
arr2[2] = "GOTCHA!";
console.log(arr1);
//Slice makes a shallow copy of arr1, so the expected output should be
//[{ first: "value1" }, { second: "value2" }, 3, 4, 5]

//That was wrong; prints: [ { first: 42 }, { second: 'value2' }, 3, 4, 5 ],
//Slice did make a shallow copy, but it only made a copy of the pointers
//stored in arr1[0] and arr1[1], it did not create new copies of the objects
//that are pointed to in those indices.

/*
A deep copy makes a duplicate of every item in an existing array or object.
In particular, it creates completely new instances of any subarrays of
subobjects in the source object. If we performed a deep copy on arr1, we would
have two different arrays as well as four separate objects.

A shallow copy only makes a duplicate of the outermost values in an array or
object. If we perform a shallow copy on arr1, we end up with two different
arrays, but we still only have one occurrence each of { first: 42 } and
{ second: 'value2' }. In this case, both arr1[0] and arr2[0] point to the same
object in memory. Likewise, arr1[1] and arr2[1] point to the
{ second: 'value2' } object.

   arr1                                                       arr2
+---------+             +---------------------+              +---------+
| pointer | ----------> | { first: "value1" } | <----------- | pointer |
+---------+             +---------------------+              +---------+
| pointer | -----+                                    +----- | pointer |
+---------+      |                                    |      +---------+
|    3    |      |      +----------------------+      |      |    3    |
+---------+      +----> | { second: "value2" } | <----+      +---------+
|    4    |             +----------------------+             |    4    |
+---------+                                                  +---------+
|    5    |                                                  |    5    |
+---------+                                                  +---------+

*/