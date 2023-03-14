# What is the output of the following snippet

```
function myFunction(person) {
  const person2 = person;
  person2.id = 4;
  person2.name = 'Jawwad';
  return person;
}

const newCandidate = {
  id: 5,
  name: 'Tayeba'
};

myFunction(newCandidate);

console.log(newCandidate);
```
