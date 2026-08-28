---
name: setup-python-deep-modules
description: Wire import-linter into a Python repo so each package is a deep module, with implementation hidden in subfolders and reachable only through its entry-point files. User-invoked.
---

# Setup Python Deep Modules

Make every package in this Python repo a **deep module**: a lot of behaviour behind a small interface. A package's public surface is its **entry points** (root modules such as `__init__.py` and root files), while everything in its subfolders (such as `_lib/` or `lib/`) is hidden. This skill installs [import-linter](https://import-linter.readthedocs.io/) and the contracts that make entry points the only way in, then proves the rules bite.

For vocabulary (deep module, interface, seam, depth), call the Skill tool with "codebase-design" and use its language throughout.

## The shape this enforces

```
src/packages/
  <name>/
    __init__.py     ← primary entry point (public). Import this from outside.
    client.py       ← additional entry point (public). Packages may expose several.
    _lib/           ← implementation: hidden from outside, free to import each other.
    tests/          ← co-located tests + fixtures (private subfolder).
```

The public surface is the package's **root files**, not just one `__init__.py`. By convention implementation lives in `_lib/` (or `lib/`) and tests in `tests/`, giving every package the same clean shape. The rule itself is path-depth based: anything in subfolders is private, so you never extend the config to add a folder.

Five contracts, all enforced as errors:

1. **Entry-point boundary from app**: code outside a package (app code or root services) may import only that package's entry points (root modules), never anything in its subfolders.
2. **Entry-point boundary across packages**: a package's own internal files import each other freely, but may reach other packages only through their entry points, never their subfolder internals.
3. **Tests through the entry points**: files under `<pkg>/tests/` may import any package's entry points and their own `tests/` fixtures, but never any package's subfolder internals (not even their own). Integration tests across packages are fine; deep imports are not.
4. **Tests folder is private**: files under `<pkg>/tests/` are reachable only from test files; application code may not import test fixtures or helpers.
5. **No cycles**: no circular dependencies across packages.

**Entry points, not giant monolithic files.** Because the public surface is *every* root file, a package can expose several small entry points (`__init__.py`, `client.py`, `models.py`) instead of funnelling everything into one giant file. Keep entry points lean and hide complex implementation in `_lib/`.

## Steps

### 1. Detect the environment

- **Package manager and environment**:
  - `uv.lock` or `pyproject.toml` with `[tool.uv]` → `uv` (`uv add --dev import-linter`, `uv run lint-imports`).
  - `poetry.lock` → `poetry` (`poetry add --group dev import-linter`, `poetry run lint-imports`).
  - `pdm.lock` → `pdm` (`pdm add -d import-linter`, `pdm run lint-imports`).
  - `Pipfile.lock` → `pipenv`.
  - Fallback: standard `pip` / `venv` (`pip install import-linter`).
- **Packages root**:
  - If `src/packages/` exists use `src/packages/`, else `packages/` or `src/`. Confirm the choice with the user if the repo has an established convention.
- **Existing config**:
  - Check for existing `[tool.importlinter]` in `pyproject.toml` or a `.importlinter` file. If present, do **not** overwrite; merge the five contracts in.
- **Upstream verification**:
  - When encountering non-standard package layouts or workspace monorepos, use `search_web` and `read_url_content` to inspect upstream `import-linter` docs for custom contract syntax.

**Done when:** package manager, packages root, config location, and existing contract status are all known.

### 2. Install import-linter

Install `import-linter` as a development dependency using the detected package manager.

**Done when:** `import-linter` is installed and executable via `lint-imports --version`.

### 3. Write the config

If `pyproject.toml` exists, add the `[tool.importlinter]` configuration:

```toml
[tool.importlinter]
root_packages = ["packages"]

[[tool.importlinter.contracts]]
name = "Entry point boundary from app"
type = "forbidden"
source_modules = ["app"]
forbidden_modules = ["packages.*._lib", "packages.*.lib"]

[[tool.importlinter.contracts]]
name = "Entry point boundary across packages"
type = "forbidden"
source_modules = ["packages"]
forbidden_modules = ["packages.*._lib", "packages.*.lib"]
ignore_imports = [
    "packages.$1._lib -> packages.$1._lib",
    "packages.$1.lib -> packages.$1.lib"
]

[[tool.importlinter.contracts]]
name = "Tests through entry points"
type = "forbidden"
source_modules = ["packages.*.tests"]
forbidden_modules = ["packages.*._lib", "packages.*.lib"]

[[tool.importlinter.contracts]]
name = "Tests folder is private"
type = "forbidden"
source_modules = ["app", "packages"]
forbidden_modules = ["packages.*.tests"]
ignore_imports = ["packages.$1.tests -> packages.$1.tests"]

[[tool.importlinter.contracts]]
name = "No cycles"
type = "independence"
modules = ["packages"]
```

If the repo prefers standalone configuration, copy [`importlinter.config.ini`](./importlinter.config.ini) to `.importlinter`.

**Done when:** configuration exists with the correct `root_packages` and all five architectural contracts.

### 4. Wire it into the checks

- Add a `lint:boundaries` or `lint-imports` task in `pyproject.toml` / `Makefile` / `tox.ini` / task runner.
- Fold it into the repo's umbrella check command (e.g. `check`, `lint`, or `ci`).
- If there is no umbrella script, add `lint-imports` to CI workflows.

**Done when:** `lint-imports` runs as part of standard developer checks and CI.

### 5. Scaffold the example package

Create `<packages-root>/example/` as a starter template:

- `__init__.py`: Public entry point. Expose one function that delegates to an internal module (demonstrating that the package is visibly deep).
- `_lib/impl.py`: Internal implementation file in a subfolder, imported by `__init__.py`, hidden from external code.
- `tests/test_example.py`: Tests importing only `from packages.example import ...`, asserting against the public interface.

**Done when:** the example package exists, exposes its behavior through the root module, and hides implementation in `_lib/`.

### 6. Prove the rules bite

This is the completion criterion for the whole skill: a config that does not fail on a violation is worthless.

1. Run `lint-imports`. It must **pass** on the clean example package.
2. Temporarily add a deep import to `tests/test_example.py` (e.g. `from packages.example._lib.impl import internal_function`). Run `lint-imports` again; it must **fail** with `Tests through entry points`.
3. Revert the deep import. Run once more, and it must **pass**.

**Done when:** you have observed a pass, then a failure on the deep import, then a pass again.

### 7. Document the convention

Write a `README.md` in the packages directory (`<packages-root>/README.md`) covering:
- The `packages/<name>/` layout (root entry points, `_lib/` for implementation, `tests/` for tests).
- Rule: "Import only through a package's root entry points."
- How to run `lint-imports`.

Add a context pointer in `AGENTS.md` (or `CLAUDE.md`): `Packages are deep modules: see [packages/README.md](./packages/README.md) before adding or importing one.`

**Done when:** `<packages-root>/README.md` exists and is linked from `AGENTS.md`.
