import { initBotId } from "botid/client/core";

// Attaches the BotID challenge to contact form submissions; the route checks it with checkBotId().
initBotId({
  protect: [{ path: "/api/contact", method: "POST" }],
});
