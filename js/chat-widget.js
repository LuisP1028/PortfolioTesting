window.initializeChatLogic = function() {
    const fab = document.getElementById("chat-fab");
    const container = document.getElementById("doom-chat-container");
    const closeBtn = document.getElementById("chat-close-btn");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const transmitBtn = document.getElementById("chat-transmit-btn");

    if (!fab || !container) {
        console.error(">> ERR: Chat DOM elements missing.");
        return;
    }

    let chatHistory = [];
    const API_URL = "https://choppedcheese-platodoomcave.hf.space/chat";
    let isAwaitingResponse = false;

    // --- KEYBOARD OVERLAP FIX (VISUAL VIEWPORT API) ---
    const adjustForKeyboard = () => {
        if (window.innerWidth <= 600 && container.classList.contains("active")) {
            const vv = window.visualViewport;
            if (vv) {
                // Pin the container exactly to the visual viewport bounds
                container.style.position = "fixed";
                container.style.top = `${vv.offsetTop}px`;
                container.style.height = `${vv.height}px`;
                container.style.bottom = "auto";
                container.style.left = "0";
                container.style.right = "0";
                container.style.width = "100vw";
            }
        } else {
            // Reset to CSS defaults when closed or on desktop
            container.style.position = "";
            container.style.top = "";
            container.style.height = "";
            container.style.bottom = "";
            container.style.left = "";
            container.style.right = "";
            container.style.width = "";
        }
        scrollToBottom();
    };

    // Listen for keyboard pop-ups and scrolls
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", adjustForKeyboard);
        window.visualViewport.addEventListener("scroll", adjustForKeyboard);
    }

    function toggleChat() {
        container.classList.toggle("active");
        if (container.classList.contains("active")) {
            adjustForKeyboard();
            setTimeout(() => {
                chatInput.focus();
                adjustForKeyboard(); // Double check after focus
            }, 50);
        } else {
            adjustForKeyboard();
            chatInput.blur(); // Dismisses keyboard
        }
    }

    fab.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", () => {
        container.classList.remove("active");
        adjustForKeyboard();
    });

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendMessage(role, text) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-msg", role);
        let prefix = role === "user" ? "USR_> " : role === "villain" ? "DOOM_> " : "SYS_> ";
        msgDiv.innerHTML = `<span style="font-weight:bold; opacity:0.7;">${prefix}</span>${text.replace(/\n/g, '<br>')}`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    let typingElement = null;
    function showTypingIndicator() {
        typingElement = document.createElement("div");
        typingElement.classList.add("chat-msg", "villain", "typing-indicator");
        typingElement.innerText = "DOOM_> COMPILING_RESPONSE...";
        chatMessages.appendChild(typingElement);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        if (typingElement && typingElement.parentNode) {
            typingElement.parentNode.removeChild(typingElement);
            typingElement = null;
        }
    }

    async function handleTransmit() {
        const userText = chatInput.value.trim();
        if (!userText || isAwaitingResponse) return;

        isAwaitingResponse = true;
        chatInput.value = "";
        appendMessage("user", userText);
        showTypingIndicator();

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText, history: chatHistory })
            });

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            const data = await response.json();
            removeTypingIndicator();
            appendMessage("villain", data.response);

            chatHistory.push({ role: "user", content: userText });
            chatHistory.push({ role: "assistant", content: data.response });
        } catch (error) {
            removeTypingIndicator();
            appendMessage("error", `CONNECTION SEVERED. [${error.message}]`);
        } finally {
            isAwaitingResponse = false;
            // Prevent auto-focusing on mobile so the keyboard doesn't violently pop back open if user minimized it
            if (window.innerWidth > 600) chatInput.focus();
            setTimeout(scrollToBottom, 50);
        }
    }

    transmitBtn.addEventListener("click", handleTransmit);
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleTransmit();
        }
    });

    console.log("%c >> VILLAIN_OS LOGIC INITIALIZED ", "color: #ff3c00; font-weight: bold;");
};