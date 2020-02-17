# sam-simple-db

A simple Lambda function that lets me store and retrieve JSON file contents from AWS S3.
File can have any filename. Structure is: 

```json
[
    { "id": "1", "data": "whatever" },
    { "id": "1234", "data": ["a","b","c"] }
]
```

Functions include:

### GET `/[filename]/[id]`
Gets the row at the `[id]` provided, from `[filename]` table. If the file and/or the row at the id does not exist, returns `null`.

### GET `/[filename]`
Gets the full table/ file.

### POST `/[filename]/[id]`
Will save the content from the event body. If the file does not exist, it will be created. If the record at `[id]` already exists, contents will be replaced. Otherwise, a record will be added to the table.
Requires:
- content in event body.

### POST `/[filename]`
Will overwrite the existing file with new contents

### DELETE `/[filename]/[id]`
Deletes the row at the `[id]` provided, from `[filename]` table. If the file and/or the row at the id does not exist no change is made.

### DELETE `/[filename]`
Deletes the full file.
