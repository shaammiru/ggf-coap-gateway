import coap from "coap";

// bikin server
const server = coap.createServer();

// handler request
server.on("request", (req, res) => {
  console.log("📩 Request received:", req.url, req.payload?.toString());

  if (req.method === "GET") {
    res.end("Hello from CoAP server 🚀");
  } else if (req.method === "POST") {
    res.end(`Received POST with payload: ${req.payload.toString()}`);
  } else {
    res.code = "4.05"; // Method Not Allowed
    res.end();
  }
});

// listen di port default CoAP (5683)
server.listen(() => {
  console.log("✅ CoAP server listening on port 5683");
});
