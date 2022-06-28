# Web-dev-chat

Simple chat example for web dev class.

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

Allows experimenting with XSS attack:

```html
<span onmouseover="alert('XSS testing!')">Hello all!</span>
```

```html
<img src='x' onerror='alert(1)' alt="">
```

Task: steal cookies and localStorage values from other chat participants.
