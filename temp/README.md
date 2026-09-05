# Temporary Workspaces

`temp/` is TeXdig's workspace-local root for disposable work created by agents and automation. This README is the directory's only tracked entry; every other child is ignored by Git.

## Contract

- Allocate one uniquely named child directory per operation. Use an owner-specific prefix and an atomically generated random suffix, such as `grammars-check-<random>`; timestamps alone are not collision-safe.
- Resolve `temp/` from the repository root, not from the caller's current directory or an ambient operating-system temporary-directory variable.
- Treat each child as exclusively owned by its creator. Clean it in a `finally` path and delete only that child; never sweep `temp/` or remove a sibling that another process may own.
- Do not import from `temp/` or use it for source, fixtures, configuration, or durable evidence. Promote reviewed source and fixtures to their tracked locations, and move retained run outputs to `artifacts/` with the provenance required by the producing workflow.
- Keep client state out of this directory. In particular, `.codex/` is reserved for Codex project configuration and is not a scratch root.
- Gitignore is not a security boundary. Do not place credentials or other secrets here.
