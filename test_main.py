#!/usr/bin/env python3
import unittest
import sys
from io import StringIO
from main import get_greeting, main

class TestMain(unittest.TestCase):
    
    def test_get_greeting_default(self):
        """Test default greeting without name."""
        result = get_greeting()
        self.assertEqual(result, "Hello, World!")
    
    def test_get_greeting_with_name(self):
        """Test greeting with custom name."""
        result = get_greeting("Alice")
        self.assertEqual(result, "Hello, Alice!")
    
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