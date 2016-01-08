# How to contribute

Before sending a patch, please make sure that the following applies:

* Your commit message follows the
[Commit Message Guidelines](#commit-message-guidelines).
* Your patch doesn't have useless merge commits.
* Your coding style is similar to ours (see below).
* Your patch is 100% tested. We don't accept any test regressions.
* All tests and lint checks pass (`npm test`).
* You understand that I'm super grateful for your patch.

## Development Environment

packery-angular is developed using [Node.js](http://nodejs.org/) and
[Gulp](http://gulpjs.com/) and has a number of
dependencies specified in its `package.json` file. To install them just run the
following commands from within your repo directory:

    # npm install --global gulp
    $ npm install

## Coding Style

This section describes my coding style guide. You might not agree with it and
that's fine but if you're going to send me patches treat this guide as a law.

**My main rule is simple:**

> All code in any code-base should look like a single person typed it, no matter
> how many people contributed.
> —[idiomatic.js](https://github.com/rwaldron/idiomatic.js/)

## Commit Message Guidelines

Commit messages are written in a simple format which clearly describes the
purpose of a change.

The format in general should look like this:

```
[TYPE] <Short description>
<Blank line>
<Detailed description>
```

Line lengths in commit messages are strict, use the
[50/72 rule](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

### Header

The first line is the commit message header, which will indicate the type of
change, and a general description of the change. This should fit within 50
characters. For instance:

```
[FIX] Remove the Packery instance on $destroy
```

The title `[FIX]` indicates that the change is a bugfix, while the remainder
clarifies what the change actually contains.

Several commit types are used by packery-angular:

1. `[FIX]` --- Commit fixes a bug or regression
2. `[FEAT]` --- Commit introduces new functionality
3. `[DOCS]` --- Commit modifies documentation. Docs commits should only touch
comments in source code, or scripts and assets which are used to generate the
documentation.
4. `[TEST]` --- Commit modifies tests or test infrastructure only
5. `[CHORE]` --- Commit affects dev-ops, CI, or package dependencies

### Body

The body is a detailed commit message explaining exactly what has changed, and a
summary of the reason why. Lines in the body should be wrapped to 72 characters.
