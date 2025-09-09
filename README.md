# Hello World Python CLI

A minimal Python CLI application that greets the world or a specific person.

## Features

- Prints "Hello, World!" by default
- Accepts an optional `--name` argument to personalize the greeting
- Zero external dependencies

## Usage

### Basic usage:
```bash
python3 main.py
```
Output: `Hello, World!`

### Personalized greeting:
```bash
python3 main.py --name Alice
```
Output: `Hello, Alice!`

## Requirements

- Python 3.x (no additional dependencies required)

## Testing

Run the included unit tests:
```bash
python3 -m unittest test_main.py
```

## Project Structure

```
hello-python/
├── main.py       # Main CLI application
├── test_main.py  # Unit tests
└── README.md     # This file
```