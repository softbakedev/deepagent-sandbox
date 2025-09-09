#!/usr/bin/env python3
"""
A simple Hello World CLI application.
"""
import argparse


def main():
    """Main entry point for the Hello World application."""
    parser = argparse.ArgumentParser(description="Say hello to the world or a specific person")
    parser.add_argument(
        "--name",
        type=str,
        help="Name to greet (default: World)"
    )
    
    args = parser.parse_args()
    
    if args.name:
        print(f"Hello, {args.name}!")
    else:
        print("Hello, World!")


if __name__ == "__main__":
    main()