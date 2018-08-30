# Answers

### 1.
For do this test late about 8 hours. With more time I would have added aesthetic improvements or animations

### 2.
One of the new features is **Object Rest/Spread Properties**
```javascript
const input = {x:1, y:2, a:3, b:4}
const {x, y, ...z} = input

console.log(x) // 1
console.log(y) // 2
console.log(z) // {a:3, b:4}
```

### 3.
I have applied performance improvements by refactoring and applying style guides like Airbnb

### 4.
I didn't have problems with the API and it works good, but everything can be improved

### 5.
```json
{
    "version": 1.0,
    "fullname": "Giancarlos Cercado",
    "birthdate": "1990-07-01",
    "occupation": "Fullstack Developer",
    "freelance": "sometimes",
    "website": "giancarloscercado.com",
    "employment_history": [
      {
        "rol": "Programmer",
        "years": 2.5,
        "company": "Righttek",
        "current": false
      },
      {
        "rol": "Project Engineer",
        "years": 3,
        "company": "Rocalvi",
        "current": false
      },
      {
        "rol": "Frontend Developer",
        "years": 1.5,
        "company": "Logasystems",
        "current": true
      }
    ],
    "hobbies": ["Play video games", "Play soccer", "Research", "Listen to music |m/", "Poker ♣♤♢❤"],
    "skills": [
      {
        "name": "Javascript / Frontend",
        "percent": 80
      },
      {
        "name": "SQL Database",
        "percent": 65
      },
      {
        "name": "Backend",
        "percent": 60
      },
      {
        "name": "No SQL Database",
        "percent": 40
      }
    ],
    "favorite_technologies": ["Vue JS", "Laravel", "Node JS", "Firebase"],
    "enthusiastic": true,
    "innovative": true
  } 
```