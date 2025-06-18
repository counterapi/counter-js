# CDN Usage Guide

You can use usertune.js directly in the browser via CDN without any build tools.

## 🚀 Quick Start

### Option 1: Minified Version (Recommended)
```html
<script src="https://cdn.jsdelivr.net/npm/usertune.js@latest/dist/usertune.browser.min.js"></script>
<script>
  const client = new Usertune({
    workspace: 'your-workspace-id'
  });
  
  // Get content
  client.content('banner-content').then(content => {
    document.getElementById('banner').innerHTML = content.data.title;
  });
</script>
```

### Option 2: Unminified Version (for development)
```html
<script src="https://cdn.jsdelivr.net/npm/usertune.js@latest/dist/usertune.browser.js"></script>
```

### Option 3: Specific Version (Recommended for production)
```html
<script src="https://cdn.jsdelivr.net/npm/usertune.js@1.0.0/dist/usertune.browser.min.js"></script>
```

## 📖 Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usertune.js CDN Example</title>
</head>
<body>
    <div id="banner">Loading...</div>
    <button id="track-btn">Track Conversion</button>

    <script src="https://cdn.jsdelivr.net/npm/usertune.js@latest/dist/usertune.browser.min.js"></script>
    <script>
        // Initialize Usertune client
        const client = new Usertune({
            workspace: 'your-workspace-id',
            // accessToken: 'your-token' // Only needed for private content
        });

        // Get and display content
        async function loadContent() {
            try {
                const content = await client.content('homepage-banner', {
                    user_tier: 'free',
                    location: 'us'
                });
                
                document.getElementById('banner').innerHTML = `
                    <h1>${content.data.title}</h1>
                    <p>${content.data.content}</p>
                    ${content.data.cta_url ? `<a href="${content.data.cta_url}">${content.data.cta_text}</a>` : ''}
                `;
            } catch (error) {
                console.error('Failed to load content:', error);
                document.getElementById('banner').innerHTML = 'Failed to load content';
            }
        }

        // Track conversion
        document.getElementById('track-btn').addEventListener('click', async () => {
            try {
                await client.track('button_click');
                console.log('Conversion tracked!');
            } catch (error) {
                console.error('Failed to track conversion:', error);
            }
        });

        // Load content when page loads
        loadContent();
    </script>
</body>
</html>
```

## 🎯 Available URLs

Once published to NPM, your package will be available at:

- **Latest minified**: `https://cdn.jsdelivr.net/npm/usertune.js@latest/dist/usertune.browser.min.js`
- **Latest unminified**: `https://cdn.jsdelivr.net/npm/usertune.js@latest/dist/usertune.browser.js`
- **Specific version**: `https://cdn.jsdelivr.net/npm/usertune.js@1.0.0/dist/usertune.browser.min.js`
- **With SRI**: JSDelivr provides integrity hashes at `https://www.jsdelivr.com/package/npm/usertune.js`

## 📝 Notes

1. **Global Variable**: The library is available as `Usertune` in the global scope
2. **Dependencies**: Axios is bundled, so no additional dependencies needed
3. **Browser Support**: Works in all modern browsers (ES2020+)
4. **Size**: Minified version is optimized for production use
5. **Caching**: JSDelivr provides global CDN caching for fast loading

## 🔧 Advanced Usage

### With Module Pattern
```html
<script src="https://cdn.jsdelivr.net/npm/usertune.js@latest/dist/usertune.browser.min.js"></script>
<script>
  (function() {
    const client = new Usertune({ workspace: 'your-workspace' });
    
    // Your code here
  })();
</script>
```

### Loading Multiple Versions
```html
<!-- Load specific version -->
<script src="https://cdn.jsdelivr.net/npm/usertune.js@1.0.0/dist/usertune.browser.min.js"></script>
```

### With Integrity Check
```html
<!-- Get SRI hash from https://www.jsdelivr.com/package/npm/usertune.js -->
<script 
  src="https://cdn.jsdelivr.net/npm/usertune.js@1.0.0/dist/usertune.browser.min.js"
  integrity="sha384-..."
  crossorigin="anonymous">
</script>
``` 