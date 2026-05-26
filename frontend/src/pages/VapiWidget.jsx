import { useEffect } from "react";

const VapiWidget = () => {
  useEffect(() => {
    // Prevent duplicate inject
    if (document.getElementById("sanjeewani-vapi-container")) return;

    const ASSISTANT_ID = "c1b1d9de-5f89-4cc5-9390-9a2da92cb211";
    const PUBLIC_KEY = "895956a3-5258-4657-92d4-5276ff75a2f0"; // replace with your Vapi Public Key

    // 1) Container overlay (so widget always appears above app)
    const container = document.createElement("div");
    container.id = "sanjeewani-vapi-container";

    Object.assign(container.style, {
      position: "fixed",
      inset: "0",
      zIndex: "999999",
      pointerEvents: "none", // allow clicks only on widget itself
    });

    container.innerHTML = `
      <style>
        vapi-widget {
          pointer-events: auto !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      </style>

      <!-- Chat widget -->
      <vapi-widget
        public-key="${PUBLIC_KEY}"
        assistant-id="${ASSISTANT_ID}"
        mode="chat"
        theme="dark"
        title="Chat with Sanjeewani"
        position="bottom-right"
      ></vapi-widget>

      <!-- Voice widget -->
      <vapi-widget
        public-key="${PUBLIC_KEY}"
        assistant-id="${ASSISTANT_ID}"
        mode="voice"
        theme="dark"
        title="Talk with Sanjeewani"
        position="bottom-left"
      ></vapi-widget>
    `;

    document.body.appendChild(container);

    // 2) Load widget script once
    const existingScript = document.getElementById("vapi-widget-script");
    let script;

    if (!existingScript) {
      script = document.createElement("script");
      script.id = "vapi-widget-script";
      script.src =
        "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    return () => {
      // remove container on unmount
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }

      // optional: keep the script (recommended) so it doesn't reload on route changes
      // If you DO want to remove it, uncomment below:
      // const s = document.getElementById("vapi-widget-script");
      // if (s && document.body.contains(s)) document.body.removeChild(s);
    };
  }, []);

  return null;
};

export default VapiWidget;



