import express from "express";
import cors from "cors";
import { db } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  const exists = await db.schema.hasTable("notes");

  if (!exists) {
    await db.schema.createTable("notes", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.text("content");
    });

    console.log("notes table created");
  }
})();

app.get("/notes", async (req, res) => {
  const notes = await db("notes").select("*");
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const newNote = await db("notes").insert({ title, content }).returning("*");
  res.json(newNote[0]);
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  await db("notes").where({ id }).del();
  res.sendStatus(204);
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
