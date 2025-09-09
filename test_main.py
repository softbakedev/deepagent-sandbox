#!/usr/bin/env python3
"""
Unit tests for the Hello World application.
"""
import unittest
import sys
import io
from unittest.mock import patch
from main import main


class TestHelloWorld(unittest.TestCase):
    """Test cases for the Hello World application."""

    def setUp(self):
        """Set up test fixtures."""
        self.held_output = io.StringIO()

    def test_default_hello_world(self):
        """Test default output without arguments."""
        with patch('sys.stdout', new=self.held_output):
            with patch('sys.argv', ['main.py']):
                main()
        output = self.held_output.getvalue()
        self.assertEqual(output.strip(), "Hello, World!")

    def test_personalized_greeting(self):
        """Test personalized greeting with --name argument."""
        with patch('sys.stdout', new=self.held_output):
            with patch('sys.argv', ['main.py', '--name', 'Alice']):
                main()
        output = self.held_output.getvalue()
        self.assertEqual(output.strip(), "Hello, Alice!")

    def test_personalized_greeting_with_spaces(self):
        """Test personalized greeting with name containing spaces."""
        with patch('sys.stdout', new=self.held_output):
            with patch('sys.argv', ['main.py', '--name', 'John Doe']):
                main()
        output = self.held_output.getvalue()
        self.assertEqual(output.strip(), "Hello, John Doe!")


if __name__ == '__main__':
    unittest.main()