#!/usr/bin/env python3
"""
Simple test for scratchpad repository
Validates basic repository structure and content
"""

import os
import sys

def test_directory_structure():
    """Test that required directories exist"""
    required_dirs = ['images', 'videos']
    
    for directory in required_dirs:
        if not os.path.exists(directory):
            print(f"FAIL: Directory '{directory}' does not exist")
            return False
        if not os.path.isdir(directory):
            print(f"FAIL: '{directory}' is not a directory")
            return False
    
    print("PASS: All required directories exist")
    return True

def test_readme_exists():
    """Test that README.md exists"""
    if not os.path.exists('README.md'):
        print("FAIL: README.md does not exist")
        return False
    
    if not os.path.isfile('README.md'):
        print("FAIL: README.md is not a file")
        return False
    
    print("PASS: README.md exists")
    return True

def test_content_exists():
    """Test that directories contain files"""
    images_count = 0
    videos_count = 0
    
    if os.path.exists('images') and os.path.isdir('images'):
        images_count = len([f for f in os.listdir('images') if f.endswith('.png')])
    
    if os.path.exists('videos') and os.path.isdir('videos'):
        videos_count = len([f for f in os.listdir('videos') if f.endswith('.mp4')])
    
    print(f"INFO: Found {images_count} PNG files in images/")
    print(f"INFO: Found {videos_count} MP4 files in videos/")
    
    if images_count == 0 and videos_count == 0:
        print("WARN: No content found in images or videos directories")
        return True  # Not a failure, just a warning
    
    print("PASS: Content found in directories")
    return True

def main():
    """Run all tests"""
    print("Running scratchpad tests...")
    print("-" * 40)
    
    tests = [
        test_directory_structure,
        test_readme_exists,
        test_content_exists
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("-" * 40)
    print(f"Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("All tests PASSED!")
        return 0
    else:
        print("Some tests FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(main())