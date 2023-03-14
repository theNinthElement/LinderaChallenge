# Practical Datastructure

- Design a datastructure to allow capturing all updates/delete on all tables with a generic implementation.
- It should be able to store (at minimum)
	- the previous value of a record
	- the new value of a record
	- timestamp(s)
	- (any additional information that might help for easy access/query)

Bonus question:
 - Also be able to tell if a record was deleted. 


## E.g Database:


```
// User Model

{
    id: { type: String },
    first_name: { type: String },
    last_name: { type: String },
}
```


```
// Analysis Model

{
    id: { type: String },
    user_id: { type: String },
    scoreParts: {
      type: Object,
      health: { type: Number, default: null },
      mood: { type: Number, default: null },
      medicines: { type: Number, default: null },
    },
}
```