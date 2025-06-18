# CDN Usage Guide

You can use counterapi directly in the browser via CDN without any build tools.

## 🚀 Quick Start

### Option 1: Minified Version (Recommended)
```html
<script src="https://cdn.jsdelivr.net/npm/counterapi@latest/dist/counter.browser.min.js"></script>
<script>
  const counter = new Counter({
    workspace: 'your-workspace'
  });
  
  // Increment a counter
  counter.up('page-visits').then(result => {
    console.log(`Counter value: ${result.data.up_count}`);
  });
</script>
```

### Option 2: Unminified Version (for development)
```html
<script src="https://cdn.jsdelivr.net/npm/counterapi@latest/dist/counter.browser.js"></script>
```

### Option 3: Specific Version (Recommended for production)
```html
<script src="https://cdn.jsdelivr.net/npm/counterapi@1.0.0/dist/counter.browser.min.js"></script>
```

## 📖 Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CounterAPI CDN Example</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .counter-display {
            display: flex;
            gap: 40px;
            margin: 20px 0;
        }
        .counter-box {
            text-align: center;
        }
        .counter-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #0366d6;
        }
        button {
            background-color: #0366d6;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            margin: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>CounterAPI Example</h1>
    
    <div class="counter-display">
        <div class="counter-box">
            <h3>Up Count</h3>
            <div class="counter-value" id="up-count">-</div>
        </div>
        <div class="counter-box">
            <h3>Down Count</h3>
            <div class="counter-value" id="down-count">-</div>
        </div>
    </div>
    
    <div>
        <button id="btn-up">Increment (+1)</button>
        <button id="btn-down">Decrement (-1)</button>
        <button id="btn-get">Get Value</button>
        <button id="btn-reset">Reset</button>
    </div>
    
    <pre id="response" style="background:#f1f8ff; padding:10px; margin-top:20px; overflow:auto;"></pre>

    <script src="https://cdn.jsdelivr.net/npm/counterapi@latest/dist/counter.browser.min.js"></script>
    <script>
        // Initialize CounterAPI client
        const counter = new Counter({
            workspace: 'test'  // Replace with your workspace
        });

        // Counter name
        const counterName = 'demo-counter';
        
        // DOM elements
        const upCountElement = document.getElementById('up-count');
        const downCountElement = document.getElementById('down-count');
        const responseElement = document.getElementById('response');
        
        // Button event listeners
        document.getElementById('btn-up').addEventListener('click', async () => {
            try {
                const result = await counter.up(counterName);
                updateUI(result);
            } catch (error) {
                handleError(error);
            }
        });
        
        document.getElementById('btn-down').addEventListener('click', async () => {
            try {
                const result = await counter.down(counterName);
                updateUI(result);
            } catch (error) {
                handleError(error);
            }
        });
        
        document.getElementById('btn-get').addEventListener('click', async () => {
            try {
                const result = await counter.get(counterName);
                updateUI(result);
            } catch (error) {
                handleError(error);
            }
        });
        
        document.getElementById('btn-reset').addEventListener('click', async () => {
            try {
                const result = await counter.reset(counterName);
                updateUI(result);
            } catch (error) {
                handleError(error);
            }
        });
        
        // Update UI with response data
        function updateUI(result) {
            // Display full response
            responseElement.textContent = JSON.stringify(result, null, 2);
            
            // Extract data
            const data = result.data || result;
            
            // Update counter displays
            if (data) {
                if (data.up_count !== undefined) {
                    upCountElement.textContent = data.up_count;
                }
                
                if (data.down_count !== undefined) {
                    downCountElement.textContent = data.down_count;
                }
            }
        }
        
        // Handle errors
        function handleError(error) {
            console.error('Error:', error);
            responseElement.textContent = 'Error: ' + (error.message || JSON.stringify(error));
        }
        
        // Get initial counter value
        counter.get(counterName).then(updateUI).catch(handleError);
    </script>
</body>
</html>
```

## 🎯 Available URLs

Once published to NPM, your package will be available at:

- **Latest minified**: `https://cdn.jsdelivr.net/npm/counterapi@latest/dist/counter.browser.min.js`
- **Latest unminified**: `https://cdn.jsdelivr.net/npm/counterapi@latest/dist/counter.browser.js`
- **Specific version**: `https://cdn.jsdelivr.net/npm/counterapi@1.0.0/dist/counter.browser.min.js`
- **With SRI**: JSDelivr provides integrity hashes at `https://www.jsdelivr.com/package/npm/counterapi`

## 📝 Notes

1. **Global Variable**: The library is available as `Counter` in the global scope
2. **Dependencies**: Axios is bundled, so no additional dependencies needed
3. **Browser Support**: Works in all modern browsers (ES2020+)
4. **Size**: Minified version is optimized for production use
5. **Caching**: JSDelivr provides global CDN caching for fast loading

## 🔧 Advanced Usage

### With Module Pattern
```html
<script src="https://cdn.jsdelivr.net/npm/counterapi@latest/dist/counter.browser.min.js"></script>
<script>
  (function() {
    const counter = new Counter({ workspace: 'your-workspace' });
    
    // Your code here
  })();
</script>
```

### Loading Multiple Versions
```html
<!-- Load specific version -->
<script src="https://cdn.jsdelivr.net/npm/counterapi@1.0.0/dist/counter.browser.min.js"></script>
```

### With Integrity Check
```html
<!-- Get SRI hash from https://www.jsdelivr.com/package/npm/counterapi -->
<script 
  src="https://cdn.jsdelivr.net/npm/counterapi@1.0.0/dist/counter.browser.min.js"
  integrity="sha384-..."
  crossorigin="anonymous">
</script>
``` 