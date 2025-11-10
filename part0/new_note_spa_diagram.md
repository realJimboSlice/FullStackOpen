```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: Browser attempts to submit the message as JSON, containing the keys "content" and "date"
    activate server
    server-->>browser: 201 Created { "message": "note created" }
    Note right of browser: If the server responds with code "201 Created", the browser then adds the note to the list
    deactivate server