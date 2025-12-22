// Quick test script to verify Storyblok connection
// Run with: node scripts/test-storyblok.js

const StoryblokClient = require('storyblok-js-client').default;
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Storyblok Connection...\n');

// Read .env file manually
const envPath = path.join(__dirname, '..', '.env');
let accessToken = 'pXYm0ntr5Tgzae6F8nb22gtt'; // Default from your .env
let region = 'eu';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const tokenMatch = envContent.match(/NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN\s*=\s*"?([^"\n]+)"?/);
  const regionMatch = envContent.match(/NEXT_PUBLIC_STORYBLOK_REGION\s*=\s*"?([^"\n]+)"?/);
  
  if (tokenMatch) accessToken = tokenMatch[1];
  if (regionMatch) region = regionMatch[1];
  
  console.log(`📋 Using token: ${accessToken.substring(0, 10)}...`);
  console.log(`📋 Region: ${region}\n`);
} catch (e) {
  console.log('⚠️  Could not read .env file, using hardcoded values\n');
}

const client = new StoryblokClient({
  accessToken: accessToken.trim(),
  region: region.trim()
});

async function testConnection() {
  try {
    // Test 1: Basic API connection
    console.log('Test 1: API Connection');
    const response = await client.get('cdn/spaces/me');
    console.log(`✅ Connected to: ${response.data.space.name}`);
    console.log(`   Space ID: ${response.data.space.id}`);
    console.log(`   Region: ${response.data.space.domain}\n`);

    // Test 2: Fetch stories
    console.log('Test 2: Fetching Stories');
    const stories = await client.get('cdn/stories', { 
      version: 'draft',
      per_page: 5 
    });
    console.log(`✅ Found ${stories.data.stories.length} stories`);
    stories.data.stories.forEach(story => {
      console.log(`   - ${story.name} (${story.full_slug})`);
    });
    console.log();

    // Test 3: Fetch home page
    console.log('Test 3: Fetching Home Page');
    try {
      const home = await client.get('cdn/stories/home', { version: 'draft' });
      console.log(`✅ Home page exists: ${home.data.story.name}`);
      console.log(`   Components: ${home.data.story.content.body?.length || 0} blocks\n`);
    } catch (e) {
      console.log('⚠️  Home page not found (create it in Storyblok)\n');
    }

    console.log('🎉 All tests passed! Storyblok is connected correctly.');
    
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('401')) {
      console.error('\n💡 Tip: Check your access token in .env file');
    } else if (error.message.includes('404')) {
      console.error('\n💡 Tip: Verify your Space ID');
    }
    
    process.exit(1);
  }
}

testConnection();
