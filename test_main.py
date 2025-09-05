#!/usr/bin/env python3
"""
Unit tests for main.py
"""

import unittest
from unittest.mock import patch
from io import StringIO
import sys
import os

# Add the current directory to the path so we can import main
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import main


class TestMain(unittest.TestCase):
    """Test cases for the main module."""
    
    def test_main_without_name(self):
        """Test main function without name argument."""
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            with patch('sys.argv', ['main.py']):
                main.main()
                self.assertEqual(mock_stdout.getvalue().strip(), "Hello, World!")
    
    def test_main_with_name(self):
        """Test main function with name argument."""
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            with patch('sys.argv', ['main.py', '--name', 'Alice']):
                main.main()
                self.assertEqual(mock_stdout.getvalue().strip(), "Hello, Alice!")
    
    def test_main_with_name_bob(self):
        """Test main function with different name."""
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            with patch('sys.argv', ['main.py', '--name', 'Bob']):
                main.main()
                self.assertEqual(mock_stdout.getvalue().strip(), "Hello, Bob!")


if __name__ == '__main__':
    unittest.main()