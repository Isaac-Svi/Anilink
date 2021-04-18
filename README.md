# Anilink

## Easily configure and "link" great animations for any project

Installation

```
npm i anilink
```

OR

```
yard add anilink
```

Then...

```javascript
import Chain from 'anilink'

new Chain(300 /* Default duration for all transitions and delays  */)
  .animate('.selected-element', {
    transform: 'translate(30px, 20px)',
    'background-color': '#345983',
  })
  .delay(1000)
  .animate(
    '.other-element',
    {
      // ...other desired styles
    },
    500 /* Optional transition duration is possible */
  )
  .exec()
```
