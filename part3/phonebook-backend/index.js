require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(express.static("dist"));

// MIDDLEWARE Request Logger
/* const requestLogger = (request, response, next) => {
  console.log("Method", request.method);
  console.log("Path", request.path);
  console.log("Body", request.body);
  console.log("---");
  next();
};

app.use(requestLogger); */

// MIDDLEWARE Morgan

// 3.8 Token
morgan.token("content", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(morgan(":method :url :status - :response-time ms :content"));

// Get all entries in the phonebook
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

// Find how many people in phonebook + date & time of request
app.get("/info", (request, response, next) => {
  const date = new Date();

  Person.countDocuments({})
    .then((count) =>
      response.send(`<p>There are currently ${count} people in the phonebook</p>
  <p>Request received at ${date}</p>`),
    )
    .catch((error) => next(error));
});

// Find specific id
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        return response.json(person);
      } else {
        return response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete entry in phonebook
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Create new entry in phonebook
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  // Check for missing name or number
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  const person = new Person({
    name: body.name.trim(),
    number: body.number.trim(),
    // id: randomizer(),
  });

  person
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

// Update entry in phonebook
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name?.trim();
      person.number = number?.trim();

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

// MIDDLEWARE Check for unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// MIDDLEWARE Error Handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is online running on port ${PORT}`);
});
