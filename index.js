import coap from "coap";

const server = coap.createServer();

server.on("request", (req, res) => {
  console.log("📩 Request received:", req.url, req.payload?.toString());

  if (req.method === "GET") {
    res.end("Hello from CoAP server 🚀");
  } else if (req.method === "POST") {
    res.end(`Received POST with payload: ${req.payload.toString()}`);
  } else {
    res.code = "4.05";
    res.end();
  }
});

server.listen(5683, "0.0.0.0", () => {
  console.log("✅ CoAP server listening on port 5683");
});
