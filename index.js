import coap from "coap";
import axios from "axios";

const server = coap.createServer();

server.on("request", async (req, res) => {
  console.log("📩 Request received:", req.url, req.payload?.toString());

  if (req.method === "GET") {
    res.end("Hello from CoAP server 🚀");
  } else {
    try {
      // payload dari IoT (udah bentuk JSON string)
      const payload = req.payload?.toString();
      const jsonData = JSON.parse(payload);

      // forward ke HTTP endpoint
      const response = await axios.post(
        "https://api-vatsubsoil-dev.ggfsystem.com/subsoils",
        jsonData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Forwarded to HTTP server:", response.status);

      // balas ke device CoAP
      res.end("Data forwarded successfully 🚀");
    } catch (err) {
      console.error("❌ Error forwarding:", err.message);
      res.code = "5.00"; // Internal Server Error
      res.end("Error forwarding data");
    }
  }
});

server.listen(5683, "0.0.0.0", () => {
  console.log("✅ CoAP server listening on 0.0.0.0:5683");
});
