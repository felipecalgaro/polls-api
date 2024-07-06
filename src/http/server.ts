import fastify from "fastify";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import { pollResults } from "./ws/poll-results";
import fastifyCors from "@fastify/cors";
import { getVote } from "./routes/get-vote";

const app = fastify();

app.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  hook: "onRequest",
});

app.register(fastifyCors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(getVote);

app.register(pollResults);

app.listen({ port: Number(process.env.PORT), host: "0.0.0.0" }).then(() => {
  console.log("Server running");
});
