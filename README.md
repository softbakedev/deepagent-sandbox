# Hello Python

A minimal Python "Hello World" project with CLI support.

## Description

This is a simple Python script that prints "Hello, World!" to the console. It supports an optional `--name` argument to personalize the greeting.

## Usage

### Basic usage:
```bash
python3 main.py
```
Output: `Hello, World!`

### With a custom name:
```bash
python3 main.py --name Alice
```
Output: `Hello, Alice!`

## Requirements

- Python 3.x (no additional dependencies required)

## Testing

Run the unit tests with:
```bash
python3 test_main.py
```

Or if you have pytest installed:
```bash
pytest test_main.py
```