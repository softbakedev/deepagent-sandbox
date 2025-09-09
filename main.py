#!/usr/bin/env python3
"""
A simple Hello World CLI application.
"""

import argparse


def main():
    parser = argparse.ArgumentParser(description="A simple Hello World application")
    parser.add_argument(
        "--name",
        type=str,
        help="Name to personalize the greeting (default: World)"
    )
    
    args = parser.parse_args()
    
    if args.name:
        print(f"Hello, {args.name}!")
    else:
        print("Hello, World!")


if __name__ == "__main__":
    main()