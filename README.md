# stylish-hindent README

An extension to run both hindent and stylish-haskell on your
Haskell code.

## Features

- Ability to specify locations for hindent and
  stylish-haskell binaries
  - Use `"stylish-hindent.executables.hindent"` and
    `"stylish-hindent.executables.stylish-haskell"` settings
- Ability to specify extra command line flags for execution
  - Use `"stylish-hindent.commandline.hindent"` and
    `"sylish-hindent.commandline.stylish-haskell"` settings

## Requirements

The binaries `hindent` and `stylish-haskell` are required.
You can use stack for this:

```
$ stack install hindent
$ stack install stylish-haskell
```

## Release Notes


### 1.0.0

Initial release of stylish-hindent
