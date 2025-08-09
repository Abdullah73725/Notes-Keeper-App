// src/api.js
const API_URL = "http://localhost:5000";

export async function getNotes() {
  const res = await fetch(`${API_URL}/notes`);
  return res.json();
}

export async function addNote(note) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(id) {
  await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });
}
