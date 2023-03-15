# What is the output of the following snippet

```
function outer(x) {
  return (y) => {
    return x + y;
  };
}

const outer1 = outer(1);
const outer2 = outer(2);

console.log(outer1(3)); // output 4
console.log(outer2(4)); // output 6
```