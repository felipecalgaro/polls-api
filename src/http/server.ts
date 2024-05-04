import fastify from "fastify";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import { pollResults } from "./ws/poll-results";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  hook: "onRequest",
});

app.register(fastifyCors, {
  origin: "http://localhost:5173",
  credentials: true,
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running");
});
