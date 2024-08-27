### Hexlet tests and linter status:

[![Actions Status](https://github.com/Darya876/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Darya876/frontend-project-46/actions)

### Project tests and linter status:

[![Node CI](https://github.com/Darya876/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/Darya876/frontend-project-46/actions/workflows/main.yml)

### CodeClimate maintability:

[![Maintainability](https://api.codeclimate.com/v1/badges/85c369f1b0b3c043878d/maintainability)](https://codeclimate.com/github/Darya876/frontend-project-46/maintainability)

### CodeClimate test coverage:

[![Test Coverage](https://api.codeclimate.com/v1/badges/85c369f1b0b3c043878d/test_coverage)](https://codeclimate.com/github/Darya876/frontend-project-46/test_coverage)

# Difference calculator

Here you can find a difference calculator package which compares two configuration files and shows a difference

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

Then you can install the difference calculator package:

```sh
$ make install
```

## Get difference

The programm accepts yaml and json extensions. For help use:

```sh
$ gendiff -h
```

Now you can try three different format to make a difference between two files:

1. Stylish (default format)
2. Plain
3. Json

```sh
$ gendiff -f <format> filepath1.json filepath2.json
```

```sh
$ gendiff -f <format> filepath1.yaml filepath2.yaml
```

```sh
$ gendiff -f <format> filepath1.yml filepath2.yml
```

## Examples of use

### help-option

<img src="./screenshots/gendiff(help).png" alt='help-option'>

### stylish

<img src="./screenshots/gendiff-stylish.png" alt='format stylish'>

### plain

<img src="./screenshots/gendiff-plain.png" alt='format plain'>

### json

<img src="./screenshots/gendiff-json.png" alt='format stylish'>
