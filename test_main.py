#!/usr/bin/env python3
"""
Unit tests for the Hello World CLI application.
"""
import unittest
import sys
from io import StringIO
from main import get_greeting, main


class TestHelloWorld(unittest.TestCase):
    """Test cases for the Hello World application."""
    
    def test_get_greeting_default(self):
        """Test default greeting without name."""
        result = get_greeting()
        self.assertEqual(result, "Hello, World!")
    
    def test_get_greeting_with_name(self):
        """Test greeting with custom name."""
        result = get_greeting("Alice")
        self.assertEqual(result, "Hello, Alice!")
    
    def test_get_greeting_with_empty_name(self):
        """Test greeting with empty string name."""
        result = get_greeting("")
        self.assertEqual(result, "Hello, World!")
    
    def test_main_default(self):
        """Test main function with default arguments."""
        # Capture stdout
        old_stdout = sys.stdout
        sys.stdout = StringIO()
        
        # Mock sys.argv for default case
        old_argv = sys.argv
        sys.argv = ['main.py']
        
        try:
            main()
            output = sys.stdout.getvalue().strip()
            self.assertEqual(output, "Hello, World!")
        finally:
            sys.stdout = old_stdout
            sys.argv = old_argv
    
    def test_main_with_name(self):
        """Test main function with name argument."""
        # Capture stdout
        old_stdout = sys.stdout
        sys.stdout = StringIO()
        
        # Mock sys.argv for name case
        old_argv = sys.argv
        sys.argv = ['main.py', '--name', 'Bob']
        
        try:
            main()
            output = sys.stdout.getvalue().strip()
            self.assertEqual(output, "Hello, Bob!")
        finally:
            sys.stdout = old_stdout
            sys.argv = old_argv


if __name__ == '__main__':
    unittest.main()