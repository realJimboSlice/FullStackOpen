const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(express.static("dist"));

/* // MIDDLEWARE Request Logger
const requestLogger = (request, response, next) => {
  console.log("Method", request.method);
  console.log("Path", request.path);
  console.log("Body", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

// MIDDLEWARE Check for unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint); */

// MIDDLEWARE Morgan
// app.use(morgan("tiny"));

// 3.8 Token
morgan.token("content", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(morgan(":method :url :status - :response-time ms :content"));

// Persons Array
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Homepage
app.get("/", (request, response) => {
  response.send("<h1>This is the homepage, yo</h1>");
});

// Get all entries in the phonebook
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// Find how many people in phonebook + date & time of request
app.get("/info", (request, response) => {
  const phonebookSize = persons.length;
  const date = new Date();
  response.send(
    `<p>There are currently ${phonebookSize} people in the phonebook.</p> 
    <p>Request received at ${date}</p>`,
  );
});

// Find specific id
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).json({
      error: `person with id ${id} not found in phonebook`,
    });
  }
});

// Delete entry
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// Random number generator (up to 1 million)
const randomizer = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return String(randomNumber);
};

// Create new entry
app.post("/api/persons", (request, response) => {
  const body = request.body;

  // Check for missing name or number
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  // Check for similar name
  if (
    persons.find(
      (person) =>
        person.name.toLowerCase().trim() === body.name.toLowerCase().trim(),
    )
  ) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name.trim(),
    number: body.number,
    id: randomizer(),
  };

  persons = persons.concat(person);

  response.status(201).json(person);
});

// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is online running on port ${PORT}`);
});
