#!/usr/bin/env python3
import argparse

def get_greeting(name=None):
    """Generate a greeting message."""
    return f"Hello, {name or 'World'}!"

def main():
    """Main CLI entrypoint."""
    parser = argparse.ArgumentParser(description='Print a personalized greeting')
    parser.add_argument('--name', help='Name to greet (default: World)')
    args = parser.parse_args()
    
    print(get_greeting(args.name))

if __name__ == '__main__':
    main()