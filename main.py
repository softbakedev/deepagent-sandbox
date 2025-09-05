#!/usr/bin/env python3
"""
A simple Hello World program that can personalize greetings.
"""

import argparse


def main():
    """Main function that handles command line arguments and prints greeting."""
    parser = argparse.ArgumentParser(description='A simple Hello World program')
    parser.add_argument(
        '--name',
        type=str,
        help='Name to personalize the greeting'
    )
    
    args = parser.parse_args()
    
    if args.name:
        print(f"Hello, {args.name}!")
    else:
        print("Hello, World!")


if __name__ == "__main__":
    main()