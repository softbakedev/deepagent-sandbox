#!/usr/bin/env python3
"""
Unit tests for the Hello World application.
"""

import unittest
import sys
import io
from unittest.mock import patch
import main


class TestHelloWorld(unittest.TestCase):
    
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.held, sys.stdout = sys.stdout, io.StringIO()
    
    def tearDown(self):
        """Clean up after each test method."""
        sys.stdout = self.held
    
    def test_default_greeting(self):
        """Test default 'Hello, World!' output."""
        with patch('sys.argv', ['main.py']):
            main.main()
            output = sys.stdout.getvalue().strip()
            self.assertEqual(output, "Hello, World!")
    
    def test_personalized_greeting(self):
        """Test personalized greeting with --name argument."""
        with patch('sys.argv', ['main.py', '--name', 'Alice']):
            main.main()
            output = sys.stdout.getvalue().strip()
            self.assertEqual(output, "Hello, Alice!")
    
    def test_personalized_greeting_different_name(self):
        """Test personalized greeting with a different name."""
        with patch('sys.argv', ['main.py', '--name', 'Bob']):
            main.main()
            output = sys.stdout.getvalue().strip()
            self.assertEqual(output, "Hello, Bob!")


if __name__ == '__main__':
    unittest.main()