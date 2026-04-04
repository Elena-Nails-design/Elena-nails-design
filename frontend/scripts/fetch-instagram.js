import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const OUTPUT_FILE = path.join(__dirname, '../src/data/instagram.json');

async function fetchInstagramFeed() {
  if (!TOKEN) {
    console.error('❌ Error: INSTAGRAM_ACCESS_TOKEN is missing in environment variables.');
    process.exit(1);
  }

  try {
    console.log('🔄 Fetching Instagram feed...');
    
    // 1. Fetch Media
    // Fields: id, caption, media_type, media_url, permalink, timestamp, thumbnail_url
    const response = await axios.get(`https://graph.instagram.com/me/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url',
        access_token: TOKEN
      }
    });

    const posts = response.data.data;
    
    // 2. Filter and Map Data (Keep only IMAGE and VIDEO/CAROUSEL_ALBUM)
    const formattedPosts = posts
      .filter(post => post.media_type !== 'VIDEO') // Optional: basic display might return different types
      .map(post => ({
        id: post.id,
        caption: post.caption || '',
        media_url: post.media_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
        media_type: post.media_type,
        thumbnail_url: post.thumbnail_url || post.media_url
      }))
      .slice(0, 24); // Keep latest 24 posts

    // 3. Save to JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(formattedPosts, null, 2));
    console.log(`✅ Success! Saved ${formattedPosts.length} posts to ${OUTPUT_FILE}`);

    // 4. (Optional) Refresh the Long-Lived Token
    // Meta says: refresh tokens that are > 24 hours old. 
    // We do it every run to be safe.
    try {
      const refreshResponse = await axios.get(`https://graph.instagram.com/refresh_access_token`, {
        params: {
          grant_type: 'ig_refresh_token',
          access_token: TOKEN
        }
      });
      console.log('✨ Token refreshed successfully.');
      // Note: In GitHub Actions, we can't easily update the Secret itself from the script
      // But for 60-day tokens, refreshing periodically is good practice.
    } catch (refreshErr) {
      console.warn('⚠️ Token refresh failed (might not be needed yet):', refreshErr.message);
    }

  } catch (error) {
    console.error('❌ Failed to fetch Instagram data:', error.response?.data || error.message);
    process.exit(1);
  }
}

fetchInstagramFeed();
