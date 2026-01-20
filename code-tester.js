// Code Tester JavaScript for CodeFixLab

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const htmlInput = document.getElementById('htmlInput');
    const cssInput = document.getElementById('cssInput');
    const jsInput = document.getElementById('jsInput');
    const runBtn = document.getElementById('runBtn');
    const resetBtn = document.getElementById('resetBtn');
    const previewFrame = document.getElementById('previewFrame');
    const errorDisplay = document.getElementById('errorDisplay');
    
    // Default code examples
    const defaultHTML = `<!DOCTYPE html>
<html>
<head>
    <title>My Test Page</title>
</head>
<body>
    <h1>Welcome to Code Tester</h1>
    <p>Edit the HTML, CSS, and JavaScript code on the left and click "Run Code" to see the result here.</p>
    <div id="demo">Try changing this text with JavaScript!</div>
    <button onclick="changeText()">Click Me</button>
</body>
</html>`;
    
    const defaultCSS = `body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #4361ee;
    border-bottom: 2px solid #3a0ca3;
    padding-bottom: 10px;
}

p {
    line-height: 1.6;
    color: #333;
}

#demo {
    background-color: #e9ecef;
    padding: 15px;
    border-radius: 5px;
    margin: 20px 0;
    font-weight: bold;
}

button {
    background-color: #4361ee;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #3a0ca3;
}`;
    
    const defaultJS = `function changeText() {
    const demo = document.getElementById('demo');
    demo.textContent = 'Text changed successfully with JavaScript!';
    demo.style.backgroundColor = '#4cc9f0';
    demo.style.color = '#000';
}

// Additional example: Change background on click
document.body.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') {
        this.style.backgroundColor = this.style.backgroundColor === 'lightblue' ? '#f5f5f5' : 'lightblue';
    }
});

console.log('Code Tester initialized successfully!');`;
    
    // Initialize with default code
    htmlInput.value = defaultHTML;
    cssInput.value = defaultCSS;
    jsInput.value = defaultJS;
    
    // Function to update the preview
    function updatePreview() {
        try {
            // Get the code from inputs
            const htmlCode = htmlInput.value;
            const cssCode = cssInput.value;
            const jsCode = jsInput.value;
            
            // Create a complete HTML document
            const fullHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${cssCode}</style>
</head>
<body>
    ${htmlCode}
    <script>
        // Wrap JS code in try-catch to display errors
        try {
            ${jsCode}
        } catch(error) {
            // Display error in the page itself
            document.body.innerHTML += '<div style="color: red; padding: 10px; margin: 10px 0; border: 1px solid red; background: #ffe6e6;"><strong>JavaScript Error:</strong> ' + error.message + '</div>';
            console.error(error);
        }
    </script>
</body>
</html>`;
            
            // Write to the iframe
            const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(fullHTML);
            iframeDoc.close();
            
            // Clear any previous error display
            errorDisplay.textContent = '';
            errorDisplay.style.display = 'none';
            
            // Log success
            console.log('Preview updated successfully');
            
        } catch (error) {
            // Display error in error panel
            errorDisplay.textContent = `Error: ${error.message}`;
            errorDisplay.style.display = 'block';
            console.error('Preview update error:', error);
        }
    }
    
    // Function to reset to default code
    function resetToDefault() {
        if (confirm('Reset all code to default examples?')) {
            htmlInput.value = defaultHTML;
            cssInput.value = defaultCSS;
            jsInput.value = defaultJS;
            updatePreview();
        }
    }
    
    // Function to clear all code
    function clearAllCode() {
        htmlInput.value = '';
        cssInput.value = '';
        jsInput.value = '';
        updatePreview();
    }
    
    // Event Listeners
    
    // Run button
    runBtn.addEventListener('click', updatePreview);
    
    // Reset button
    resetBtn.addEventListener('click', resetToDefault);
    
    // Clear button (if exists)
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllCode);
    }
    
    // Auto-run on code change (with debounce)
    let debounceTimer;
    function debounceUpdate() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updatePreview, 1000);
    }
    
    htmlInput.addEventListener('input', debounceUpdate);
    cssInput.addEventListener('input', debounceUpdate);
    jsInput.addEventListener('input', debounceUpdate);
    
    // Tab switching for code editors
    const tabButtons = document.querySelectorAll('.tab-btn');
    const editorPanels = document.querySelectorAll('.editor-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding editor panel
            editorPanels.forEach(panel => {
                if (panel.id === `${tabName}Panel`) {
                    panel.style.display = 'block';
                } else {
                    panel.style.display = 'none';
                }
            });
        });
    });
    
    // Code editor enhancements
    function setupEditorLineNumbers(textarea) {
        // This would add line numbers to textareas
        // For simplicity, we'll just enhance the textarea with basic features
        textarea.addEventListener('keydown', function(e) {
            // Tab key support
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                
                // Insert tab character
                this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
                
                // Move cursor position
                this.selectionStart = this.selectionEnd = start + 2;
            }
            
            // Auto-indent on new line (simplified)
            if (e.key === 'Enter') {
                const start = this.selectionStart;
                const beforeCursor = this.value.substring(0, start);
                const lines = beforeCursor.split('\n');
                const currentLine = lines[lines.length - 1];
                
                // Count leading spaces/tabs
                const indentMatch = currentLine.match(/^(\s*)/);
                if (indentMatch) {
                    setTimeout(() => {
                        const currentPos = this.selectionStart;
                        this.value = this.value.substring(0, currentPos) + indentMatch[0] + this.value.substring(currentPos);
                        this.selectionStart = this.selectionEnd = currentPos + indentMatch[0].length;
                    }, 0);
                }
            }
        });
    }
    
    // Apply enhancements to all code textareas
    setupEditorLineNumbers(htmlInput);
    setupEditorLineNumbers(cssInput);
    setupEditorLineNumbers(jsInput);
    
    // Initialize with first preview
    updatePreview();
    
    // Save code to localStorage (with user permission)
    function saveCodeToStorage() {
        try {
            const codeData = {
                html: htmlInput.value,
                css: cssInput.value,
                js: jsInput.value,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('codeTesterSavedCode', JSON.stringify(codeData));
            console.log('Code saved to localStorage');
        } catch (error) {
            console.warn('Could not save code to localStorage:', error);
        }
    }
    
    // Load code from localStorage
    function loadCodeFromStorage() {
        try {
            const savedData = localStorage.getItem('codeTesterSavedCode');
            if (savedData) {
                const codeData = JSON.parse(savedData);
                htmlInput.value = codeData.html || defaultHTML;
                cssInput.value = codeData.css || defaultCSS;
                jsInput.value = codeData.js || defaultJS;
                updatePreview();
                console.log('Code loaded from localStorage');
            }
        } catch (error) {
            console.warn('Could not load code from localStorage:', error);
        }
    }
    
    // Auto-save on changes (with debounce)
    let saveTimer;
    function debounceSave() {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(saveCodeToStorage, 2000);
    }
    
    htmlInput.addEventListener('input', debounceSave);
    cssInput.addEventListener('input', debounceSave);
    jsInput.addEventListener('input', debounceSave);
    
    // Ask user if they want to load saved code
    window.addEventListener('load', function() {
        setTimeout(() => {
            const savedData = localStorage.getItem('codeTesterSavedCode');
            if (savedData && confirm('Load previously saved code?')) {
                loadCodeFromStorage();
            }
        }, 500);
    });
});