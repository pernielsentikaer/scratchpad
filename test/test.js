const fs = require('fs');
const path = require('path');

// Simple test runner
function test(description, testFn) {
  try {
    testFn();
    console.log(`✓ ${description}`);
    return true;
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  ${error.message}`);
    return false;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test suite
let passedTests = 0;
let totalTests = 0;

console.log('Running scratchpad tests...\n');

// Test 1: README.md exists and has content
totalTests++;
if (test('README.md exists and has content', () => {
  assert(fs.existsSync('README.md'), 'README.md file should exist');
  const content = fs.readFileSync('README.md', 'utf8');
  assert(content.trim().length > 0, 'README.md should not be empty');
  assert(content.includes('scratchpad'), 'README.md should mention scratchpad');
})) {
  passedTests++;
}

// Test 2: Images directory exists
totalTests++;
if (test('images directory exists', () => {
  assert(fs.existsSync('images'), 'images directory should exist');
  assert(fs.statSync('images').isDirectory(), 'images should be a directory');
})) {
  passedTests++;
}

// Test 3: Videos directory exists
totalTests++;
if (test('videos directory exists', () => {
  assert(fs.existsSync('videos'), 'videos directory should exist');
  assert(fs.statSync('videos').isDirectory(), 'videos should be a directory');
})) {
  passedTests++;
}

// Test 4: Repository structure is valid
totalTests++;
if (test('repository has valid structure', () => {
  const items = fs.readdirSync('.');
  const expectedItems = ['README.md', 'images', 'videos', 'package.json', 'test'];
  
  expectedItems.forEach(item => {
    assert(items.includes(item), `Repository should contain ${item}`);
  });
})) {
  passedTests++;
}

// Test 5: Media files have valid extensions
totalTests++;
if (test('media files have valid extensions', () => {
  const imageFiles = fs.readdirSync('images');
  const videoFiles = fs.readdirSync('videos');
  
  imageFiles.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    assert(['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext), 
           `Image file ${file} should have a valid image extension`);
  });
  
  videoFiles.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    assert(['.mp4', '.avi', '.mov', '.mkv', '.webm'].includes(ext), 
           `Video file ${file} should have a valid video extension`);
  });
})) {
  passedTests++;
}

// Summary
console.log('\nTest Results:');
console.log(`${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
  console.log('✓ All tests passed!');
  process.exit(0);
} else {
  console.log('✗ Some tests failed');
  process.exit(1);
}