// AI Code Helper JavaScript for CodeFixLab

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const newChatBtn = document.getElementById('newChatBtn');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const previousChats = document.getElementById('previousChats');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Mock AI Responses Database
    const aiResponses = {
        html: [
            "To fix unclosed HTML tags, always ensure every opening tag has a corresponding closing tag. Use an HTML validator or your code editor's tag matching feature to identify missing closing tags.",
            "For semantic HTML, use elements like `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` instead of generic `<div>` elements. This improves accessibility and SEO.",
            "HTML validation errors often occur due to incorrect nesting. Remember: inline elements cannot contain block-level elements. Also, some elements have specific content models (e.g., `<p>` cannot contain `<div>`).",
            "To create a responsive image, use the `<picture>` element with multiple `<source>` elements or simply use `<img>` with `srcset` and `sizes` attributes for different screen resolutions.",
            "HTML forms should always include proper labels using `<label>` elements with `for` attributes matching input `id`s. This improves accessibility and usability."
        ],
        css: [
            "To center a div horizontally and vertically, use: `display: flex; justify-content: center; align-items: center;` on the parent container.",
            "CSS specificity issues can be resolved by: 1) Using more specific selectors, 2) Avoiding !important unless necessary, 3) Organizing CSS in logical order (cascading).",
            "For responsive design, use media queries like `@media (max-width: 768px) { ... }`. Also consider using CSS Grid and Flexbox for flexible layouts.",
            "CSS variables (custom properties) can help maintain consistency: Define `--primary-color: #4361ee;` in `:root`, then use `color: var(--primary-color);` anywhere.",
            "To fix z-index not working, ensure the element has `position` set to `relative`, `absolute`, or `fixed`. Also check parent elements' stacking contexts."
        ],
        javascript: [
            "To fix 'Uncaught TypeError: Cannot read property X of undefined', use optional chaining (`obj?.property`) or check if the object exists before accessing properties.",
            "For async/await errors, wrap your code in try/catch blocks: `try { const result = await fetch(url); } catch (error) { console.error(error); }`",
            "JavaScript hoisting means variables declared with `var` are hoisted (initialized as undefined), while `let` and `const` are not initialized. Always declare variables before use.",
            "To fix event listeners not working, ensure: 1) DOM is loaded before attaching listeners, 2) Correct selector is used, 3) Event is properly handled with `event.preventDefault()` if needed.",
            "Common JavaScript memory leaks occur from: 1) Forgotten timers/intervals, 2) Detached DOM references, 3) Closures holding references. Use browser DevTools Memory profiler to identify leaks."
        ],
        general: [
            "Always validate user input on both client-side (for UX) and server-side (for security). Never trust client-side validation alone.",
            "Use version control (Git) for all projects. Commit frequently with descriptive messages. Use branches for features/fixes.",
            "Optimize website performance by: 1) Minifying CSS/JS, 2) Compressing images, 3) Using browser caching, 4) Reducing HTTP requests.",
            "Write clean code by: 1) Using meaningful variable/function names, 2) Keeping functions small and focused, 3) Adding comments for complex logic, 4) Following consistent formatting.",
            "Test your code in multiple browsers (Chrome, Firefox, Safari) to ensure cross-browser compatibility. Use feature detection instead of browser detection."
        ]
    };
    
    // Chat history
    let chatHistory = [];
    let currentCategory = 'general';
    
    // Initialize with a welcome message
    addMessage('ai', 'Hello! I\'m your AI coding assistant. How can I help you with HTML, CSS, or JavaScript today? You can also select a category from the sidebar.');
    
    // Function to add message to chat
    function addMessage(sender, text, isCode = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (isCode) {
            const codeBlock = document.createElement('div');
            codeBlock.className = 'code-output';
            codeBlock.textContent = text;
            messageDiv.appendChild(codeBlock);
        } else {
            messageDiv.textContent = text;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Save to history
        if (sender === 'user' || sender === 'ai') {
            chatHistory.push({
                sender,
                text,
                isCode,
                timestamp: new Date().toISOString(),
                category: currentCategory
            });
        }
    }
    
    // Function to simulate AI response
    function simulateAIResponse(userInput) {
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message ai-message';
        typingIndicator.id = 'typingIndicator';
        typingIndicator.textContent = 'AI is typing...';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Process user input to determine category
        const input = userInput.toLowerCase();
        let responseCategory = currentCategory;
        
        if (input.includes('html') || input.includes('tag') || input.includes('element')) {
            responseCategory = 'html';
        } else if (input.includes('css') || input.includes('style') || input.includes('layout')) {
            responseCategory = 'css';
        } else if (input.includes('javascript') || input.includes('js') || input.includes('function')) {
            responseCategory = 'javascript';
        }
        
        // Remove typing indicator after delay
        setTimeout(() => {
            const typingEl = document.getElementById('typingIndicator');
            if (typingEl) {
                typingEl.remove();
            }
            
            // Get a random response from the appropriate category
            const responses = aiResponses[responseCategory];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            // Sometimes include a code block (30% chance)
            const includeCode = Math.random() < 0.3;
            
            if (includeCode) {
                // Add a code example based on category
                let codeExample = '';
                switch(responseCategory) {
                    case 'html':
                        codeExample = '<!DOCTYPE html>\n<html>\n<head>\n  <title>Example</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>';
                        break;
                    case 'css':
                        codeExample = '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}';
                        break;
                    case 'javascript':
                        codeExample = '// Fix for undefined variable error\nconst myVariable = someObject?.property || "default value";\n\n// Using optional chaining and nullish coalescing';
                        break;
                    default:
                        codeExample = '// Example code\nfunction example() {\n  console.log("Hello, world!");\n}';
                }
                
                addMessage('ai', randomResponse);
                addMessage('ai', codeExample, true);
            } else {
                addMessage('ai', randomResponse);
            }
            
            // Update previous chats list
            updatePreviousChats();
            
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }
    
    // Function to update previous chats list
    function updatePreviousChats() {
        // Keep only last 5 chats for demo
        const recentChats = chatHistory.slice(-5);
        previousChats.innerHTML = '';
        
        recentChats.forEach((chat, index) => {
            if (chat.sender === 'user') {
                const chatItem = document.createElement('div');
                chatItem.className = 'previous-chat-item';
                chatItem.textContent = chat.text.length > 30 ? chat.text.substring(0, 30) + '...' : chat.text;
                chatItem.title = chat.text;
                chatItem.addEventListener('click', () => {
                    // Clear current chat and load this one (simplified)
                    chatMessages.innerHTML = '';
                    addMessage('user', chat.text);
                    // In a real app, you would reload the entire conversation
                });
                previousChats.appendChild(chatItem);
            }
        });
    }
    
    // Event Listeners
    
    // Send message on button click
    sendBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatInput.value = '';
            simulateAIResponse(message);
        }
    });
    
    // Send message on Enter key (but allow Shift+Enter for new line)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });
    
    // New Chat button
    newChatBtn.addEventListener('click', function() {
        if (chatHistory.length > 1) {
            if (confirm('Start a new chat? Current conversation will be cleared.')) {
                chatMessages.innerHTML = '';
                chatHistory = [];
                addMessage('ai', 'Hello! I\'m your AI coding assistant. How can I help you with HTML, CSS, or JavaScript today?');
            }
        }
    });
    
    // Category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            currentCategory = category;
            
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Add a message about category change
            const categoryNames = {
                'html': 'HTML',
                'css': 'CSS',
                'javascript': 'JavaScript',
                'general': 'General Programming'
            };
            
            addMessage('ai', `Switched to ${categoryNames[category]} mode. Ask me anything about ${categoryNames[category]}!`);
        });
    });
    
    // Theme toggle for AI page
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('ai-theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('ai-theme', 'light');
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('ai-theme') || localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // Search functionality in sidebar
    const sidebarSearch = document.getElementById('sidebarSearch');
    const sidebarSearchBtn = document.getElementById('sidebarSearchBtn');
    
    if (sidebarSearchBtn && sidebarSearch) {
        sidebarSearchBtn.addEventListener('click', function() {
            const query = sidebarSearch.value.trim();
            if (query) {
                addMessage('user', `Search: ${query}`);
                simulateAIResponse(query);
                sidebarSearch.value = '';
            }
        });
        
        sidebarSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sidebarSearchBtn.click();
            }
        });
    }
    
    // Initialize with a sample chat history
    setTimeout(() => {
        updatePreviousChats();
    }, 500);
});