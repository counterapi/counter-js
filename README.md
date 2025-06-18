# usertune.js

<div align="center">
  <img src="https://usertune.io/favicon/apple-icon.png" alt="Usertune" width="200" height="200" />
  
  <h3>JavaScript library for Usertune's API</h3>
  <p>Modern, type-safe client for Node.js & Browser</p>

  [![CI Status](https://github.com/usertune/usertune.js/workflows/CI/badge.svg)](https://github.com/usertune/usertune.js/actions)
  [![npm version](https://badge.fury.io/js/usertune.js.svg)](https://badge.fury.io/js/usertune.js)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## 🚀 Features

- **🎯 Simple API** - Clean, intuitive interface with just two main methods
- **🔒 Type-Safe** - Full TypeScript support with comprehensive type definitions
- **⚡ Modern** - ES modules, async/await, built for modern JavaScript
- **🌐 Universal** - Works in Node.js and browsers
- **🎛️ Flexible** - Support for custom attributes and personalization
- **📦 Zero Config** - Works out of the box with sensible defaults
- **🔄 Smart Tracking** - Automatic variant ID management for seamless conversion tracking

## 📦 Installation

```bash
npm install usertune.js
```

## 🏃 Quick Start

```typescript
import { Usertune } from 'usertune.js';

// For public content (no authentication required)
const client = new Usertune({
  workspace: 'your-workspace-id'
});

const content = await client.content('public-banner');
console.log(content.data);

// Track conversions
await client.track('purchase', 99.99);
```

### CDN Usage (Browser)

You can also use usertune.js directly in the browser via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/usertune.js@latest/dist/usertune.browser.min.js"></script>
<script>
  const client = new Usertune({
    workspace: 'your-workspace-id'
  });
  
  client.content('banner-content').then(content => {
    console.log(content.data);
  });
</script>
```

See [CDN.md](CDN.md) for complete examples and usage patterns.


## 📚 API Reference

### Constructor

```typescript
const client = new Usertune(config: UsertuneConfig)
```

**Config Options:**
- `workspace` (required) - Your Usertune workspace identifier
- `accessToken` (optional) - Your API access token (required only for private content)
- `timeout` (optional) - Request timeout in milliseconds (defaults to `10000`)
- `debug` (optional) - Enable debug logging (defaults to `false`)

### Methods

#### `content(contentSlug, attributes?)`

Retrieve personalized content for a user.

```typescript
const content = await client.content('banner-content', {
  user_tier: 'premium',
  location: 'berlin',
  age: 28
});

console.log(content.data.title);
console.log(content.metadata.variant_id);
```

**Parameters:**
- `contentSlug` (string) - The content piece identifier
- `attributes` (object, optional) - Custom attributes for personalization

**Returns:** `ContentResponse`
```typescript
{
  data: {
    [key: string]: any;
  };
  metadata: {
    variant_id: string | null;
    [key: string]: any;
  };
}
```

#### `track(conversionType, conversionValue?)`

Track a conversion event. Must be called after `content()` to have a variant ID.

```typescript
await client.track('purchase', 75.99);
await client.track('signup'); // Value is optional
```

**Parameters:**
- `conversionType` (string) - Type of conversion (e.g., 'purchase', 'signup', 'click')
- `conversionValue` (number, optional) - Monetary value of the conversion

// For personalized content (authentication required)
const privateClient = new Usertune({
  workspace: 'your-workspace-id',
  accessToken: 'your-access-token'
});

// Get personalized content
const content = await privateClient.content('homepage-banner', {
  user_tier: 'premium',
  location: 'san-francisco'
});

## 🎨 Usage Examples

### Public Content Access (No Authentication Required)

```typescript
import { Usertune } from 'usertune.js';

// For public content, no accessToken needed
const client = new Usertune({
  workspace: 'my-workspace'
});

const content = await client.content('public-banner');
console.log(content.data);
```

### Private Content Access (Authentication Required)

```typescript
import { Usertune } from 'usertune.js';

// For private/personalized content, accessToken is required
const client = new Usertune({
  workspace: 'my-workspace',
  accessToken: 'your-access-token'
});

const content = await client.content('personalized-banner', {
  user_tier: 'premium'
});
console.log(content.data);
```

### Basic Content Retrieval

```typescript
import { Usertune } from 'usertune.js';

const client = new Usertune({
  workspace: 'my-workspace',
  accessToken: 'access_token_here'
});

const content = await client.content('hero-banner');
console.log(content.data);
```

### Personalized Content with Attributes

```typescript
const content = await client.content('product-recommendation', {
  user_tier: 'premium',
  purchase_history: 'electronics',
  location: 'us-west',
  age_group: '25-34'
});
```

### Complete Flow with Tracking

```typescript
// Get personalized content
const content = await client.content('checkout-banner', {
  cart_value: 150,
  user_segment: 'high-value'
});

// Display content to user
displayBanner(content.data);

// Track conversion when user completes purchase
if (userCompletedPurchase) {
  await content.track('purchase', 150.00);
}
```

### Error Handling

```typescript
try {
  const content = await client.content('my-content');
  console.log(content);
} catch (error) {
  if (error.status === 404) {
    console.log('Content not found');
  } else if (error.status === 401) {
    console.log('Invalid access token');
  } else {
    console.log('Request failed:', error.message);
  }
}
```

## 🛠️ Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
npm run test:watch
npm run test:coverage
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Type Checking

```bash
npm run typecheck
```

## 📋 Requirements

- Node.js >= 14.0.0
- Modern browsers with ES2020 support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [usertune.io](https://usertune.io)
- **Documentation**: [docs.usertune.io](https://docs.usertune.io)
- **GitHub**: [github.com/yourusername/usertune.js](https://github.com/yourusername/usertune.js)
- **npm**: [npmjs.com/package/usertune.js](https://npmjs.com/package/usertune.js)

---

<div align="center">
  Made with ❤️ by the <a href="https://usertune.io">Usertune</a> team
</div>
