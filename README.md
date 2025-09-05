# Hello World Python Project

A minimal Python "Hello World" project with CLI support.

## Description

This project contains a simple Python script that prints "Hello, World!" to the console. It also supports an optional `--name` argument to personalize the greeting.

## Requirements

- Python 3.x

## Usage

Run the basic hello world:
```bash
python3 main.py
```

Run with a personalized greeting:
```bash
python3 main.py --name Alice
```

## Examples

```bash
$ python3 main.py
Hello, World!

$ python3 main.py --name Bob
Hello, Bob!
```

## Testing

To run the unit tests:
```bash
python3 test_main.py
```

Or if you have pytest installed:
```bash
pytest test_main.py
```