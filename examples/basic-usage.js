// Basic usage example for usertune.js
import { Usertune } from 'usertune.js';

async function example() {
  // Initialize the client
  const client = new Usertune({
    workspace: 'your-workspace-id',
    accessToken: 'your-access-token'
  });

  try {
    // Get personalized content
    const content = await client.content('homepage-banner', {
      user_tier: 'premium',
      location: 'san-francisco',
      age: 28
    });

    console.log('Content received:', content.data);
    console.log('Variant ID:', content.metadata.variant_id);

    // Track a conversion using the content's track method
    if (content.metadata.variant_id) {
      await content.track('purchase', 99.99);
      console.log('Conversion tracked successfully!');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run example
example(); 