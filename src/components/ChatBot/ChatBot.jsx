import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm Babu's AI assistant. Ask me anything about his work or skills." }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Isolate wheel scroll inside chatbot from the page's global scroll (3D scene)
    useEffect(() => {
        const el = messagesRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            const el = messagesRef.current;
            if (!el) return;

            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop === 0 && e.deltaY < 0;
            const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1 && e.deltaY > 0;

            // If we are scrolling inside the box, always stop the event 
            // from reaching Lenis or the main page scroll.
            e.stopPropagation();

            // Optional: If you want to prevent the page from scrolling 
            // even when the chat has reached the end:
            // e.preventDefault(); 
        };

        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        // Maintain last 3 messages for history (optional per request, but let's keep it simple for now)
        // The backend doesn't handle history yet, but the user asked for "Chat history (last 3 messages)"
        // I will just send the current message to the backend as specified in the plan.

        try {
            const response = await fetch('https://babu-portfolio-gsp5.onrender.com/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            if (!response.ok) throw new Error('Backend not reachable');

            const data = await response.json();
            const fullAnswer = data.answer;

            // Start typing effect
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '',
                sources: data.sources
            }]);

            let currentText = '';
            const words = fullAnswer.split(' ');
            for (let i = 0; i < words.length; i++) {
                currentText += (i === 0 ? '' : ' ') + words[i];
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = currentText;
                    return newMessages;
                });
                await new Promise(resolve => setTimeout(resolve, 30)); // Delay per word for "responsive" feel
            }

        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting to my brain right now. Please make sure the backend is running."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'is-open' : ''}`}>
            {/* Toggle Button */}
            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Chat"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8V4H8" />
                        <rect width="16" height="12" x="4" y="8" rx="2" />
                        <path d="M2 14h2" />
                        <path d="M20 14h2" />
                        <path d="M15 13v2" />
                        <path d="M9 13v2" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            <div
                className="chatbot-window"
                onMouseEnter={() => window.lenis?.stop()}
                onMouseLeave={() => window.lenis?.start()}
            >
                <div className="chatbot-header">
                    <h3>AI Assistant</h3>
                    <div className="status-indicator"></div>
                </div>

                <div className="chatbot-messages" ref={messagesRef} data-lenis-prevent>
                    {messages.map((m, i) => (
                        <div key={i} className={`message-wrapper ${m.role}`}>
                            <div className="message-content">
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="message-wrapper assistant">
                            <div className="message-content loading">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chatbot-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSend} disabled={loading}>
                        SEND
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
