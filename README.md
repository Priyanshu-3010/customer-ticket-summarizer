# Customer Ticket Summarizer

An AI-powered backend application that summarizes long customer support tickets into concise two-line summaries using Node.js, Express, and Google Gemini.

## Features

- Accepts customer support tickets through a REST API
- Generates concise two-line summaries using Gemini
- Validates empty ticket submissions
- Automated tests for API and summarization logic
- API key stored securely using environment variables

## Tech Stack

- Node.js
- Express.js
- Google Gemini API
- JavaScript
- Supertest
- Node.js Test Runner

## API

### POST `/api/summarize`

Accepts a customer support ticket as plain text.

Example request:

```text
POST http://localhost:3000/api/summarize
Content-Type: text/plain

The customer has been waiting for their order...
