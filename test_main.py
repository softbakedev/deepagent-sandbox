#!/usr/bin/env python3
"""
Unit tests for main.py
"""
import unittest
import sys
from io import StringIO
from unittest.mock import patch
import main

class TestMain(unittest.TestCase):
    """Test cases for the main module."""
    
    def test_hello_world_default(self):
        """Test default hello world output."""
        # Capture stdout
        captured_output = StringIO()
        with patch('sys.stdout', captured_output):
            with patch('sys.argv', ['main.py']):
                main.main()
        
        self.assertEqual(captured_output.getvalue().strip(), "Hello, World!")
    
    def test_hello_with_name(self):
        """Test personalized greeting."""
        captured_output = StringIO()
        with patch('sys.stdout', captured_output):
            with patch('sys.argv', ['main.py', '--name', 'Alice']):
                main.main()
        
        self.assertEqual(captured_output.getvalue().strip(), "Hello, Alice!")
    
    def test_hello_with_different_name(self):
        """Test personalized greeting with a different name."""
        captured_output = StringIO()
        with patch('sys.stdout', captured_output):
            with patch('sys.argv', ['main.py', '--name', 'Bob']):
                main.main()
        
        self.assertEqual(captured_output.getvalue().strip(), "Hello, Bob!")

if __name__ == '__main__':
    unittest.main()