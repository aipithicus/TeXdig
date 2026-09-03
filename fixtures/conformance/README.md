# TeXdig conformance fixture format

This file is the single normative description of the conformance fixture container. A consumer can implement a reader and reproduce every census from this document alone.

## File grammar

Files are UTF-8 text. A file consists of header lines followed by zero or more rows. Blank lines are ignored. `#` begins a comment anywhere on a line. A header has the exact form `# key: value`; header keys are lowercase ASCII and may repeat only where stated. Consumers reject an unknown `schema`.

Required headers are `family` (`group/name`), `schema` (`1`), and `generator` (`texdig-conformance 0.0.0`). `convention` is required whenever derived offsets occur and is `atoms` in this corpus. `seed` is a non-zero hexadecimal uint32 for random families. `rule` states census enumeration in plain text. `laws` is a space-separated list of law identifiers. Each census has one or more `digest` headers:

```text
# digest: sha256:<64 lowercase hex digits> canon:rows-v1 count:<decimal cases> tier:<default|deep>
```

Rows contain two or more fields separated by exactly ` ; `. Field one is the input bytes as uppercase hexadecimal pairs separated by one space, or `-` for empty input. Family fields are defined below. Decimal integers have no sign or leading padding. A span is half-open and written `[a,b)`. Lists are comma-separated; `-` denotes an empty list where a prefixed list token requires a value.

## Shared token vocabulary

- Decoder unit: `start-end:S:HEX` for a well-formed scalar or `start-end:I:HEX` for one preserved invalid byte. `HEX` is uppercase without padding.
- Decoder result: `U:<units>`; invalid count: `N:<decimal>`; leading BOM flag: `M:0|1`.
- Line starts: `L:0,4,9`; per-offset line indexes: `I:0,0,1`; line/column positions: `P:line/byteCol/atomCol/utf16Col,...`.
- Coordinate boundary: `B:byte/utf16/atom`; repeated boundaries are comma-separated.
- Booleans are `0` and `1`. Family-specific prefixes distinguish otherwise similar values.

## Digest canonicalization

`rows-v1` visits cases in the stated enumeration order. For each case it takes the row exactly as it would be written explicitly, without a comment, appends one LF byte (`\n`), and feeds the UTF-8 bytes to SHA-256. The lowercase hexadecimal digest covers the concatenation. CRLF is never used in canonical rows. Counts are decimal case counts. Explicit illustration rows do not alter a census digest.

## PRNG

Seeded families use xorshift32 in uint32 arithmetic. Starting from the header seed, each draw performs `state ^= state << 13`, `state ^= state >>> 17`, `state ^= state << 5`, then returns `state >>> 0`. A byte is `output % 256`; a class pick is `output % classCount`; length selection is stated by the family. A zero seed is invalid.

## UTF-8 byte classes

The classes from Unicode Table 3-7 are: ASCII `00-7F`; continuations `80-8F`, `90-9F`, `A0-BF`; never-valid `C0-C1`; leads `C2-DF`; `E0`; `E1-EC`; `ED`; `EE-EF`; `F0`; `F1-F3`; `F4`; never-valid `F5-FF`. Both boundary bytes represent each class, in this order:

```text
00 7F 80 8F 90 9F A0 BF C0 C1 C2 DF E0 E1 EC ED EE EF F0 F1 F3 F4 F5 FF
```

## Laws

- `U1`: decoder units tile the exact input; invalid units preserve one raw byte.
- `U2`: decisions ending at least four bytes before a prefix boundary are stable under extension.
- `U3`: valid units are admissible Unicode scalars with their shortest permitted width.
- `U4`: acceptance and scalar values agree with fatal UTF-8 decoding with the BOM retained.
- `P1`: `contains` agrees with cell inclusion, with empty containment decided at boundaries.
- `P2`: `properlyContains` is containment without equality.
- `P3`: `intersects` agrees with non-empty cell overlap.
- `P4`: `crosses` is overlap with neither span containing the other.
- `T1`: line starts follow byte-level CR, LF, and CRLF recognition.
- `T2`: line extents partition the bytes and retain terminators.
- `T3`: every byte offset, including EOF, maps to the last line start not greater than it.
- `T4`: a span projects to the lines containing its material; an empty span projects to its position's line.
- `T5`: line and zero-based byte, atom, and UTF-16 columns agree with independent accumulated widths.
- `C1`: byte, atom, and UTF-16 conversions round-trip at every atom boundary.
- `C2`: interior byte positions and the middle UTF-16 position of a supplementary scalar are rejected.
- `S1`: every named single-byte mutation changes the SHA-256 fingerprint.
- `S2`: compatibility is equality of source id, content hash, and revision.
- `L1`: parent/child offset and span maps are mutual inverses on the window.
- `L2`: nested slice maps compose to the direct root slice.
- `L3`: downward maps reject geometry outside or crossing the window.

## Family fields and enumeration

- `utf8/named`: `bytes ; U:<units> ; N:<invalidCount> ; M:<bom>`. Rows are named adversarial and boundary cases.
- `utf8/classes`: the same fields. For each length, enumerate base-24 codes from zero upward; position zero receives the least-significant digit. Length-one rows are explicit. Digest headers are ordered for lengths one through five; lengths one through four are default and length five is deep.
- `utf8/random`: the same canonical row, digest-only. Generate 5,000 cases. Length is `5 + next()%12`; even-numbered cases choose each byte from the 24 representatives and odd-numbered cases use `next()%256`.
- `span/predicates`: `bytes ; A:[a,b) ; B:[c,d) ; C:<contains> ; Q:<properlyContains> ; I:<intersects> ; X:<crosses>`. The five zero input bytes are a carrier with six boundaries. Enumerate each span start-major/end-major, left span outermost.
- `topology/lines`: `bytes ; L:<starts> ; I:<lineIndex per offset> ; P:<position per offset>`. Recursively visit the current input before appending each of `A`, `CR`, `LF`, `CRLF`. Rows through four pieces are explicit; the digest covers exactly five pieces.
- `topology/conversions`: `bytes ; B:<boundaries>`. Each boundary is byte/UTF-16/atom under `atoms`. Named rows are explicit. The 1,000-row census uses `length=next()%33`, then `next()%256` per byte.
- `snapshot/identity`: hash vector rows are `bytes ; V:<sha256>`. Compatibility rows are `leftBytes ; A:<sourceId>/<revision> ; R:<rightBytes>|<sourceId>|<revision> ; K:<compatible>`. The digest census rows are `carrier ; M:<mutatedIndex> ; C:<fingerprintChanged>` for xor-FF at indices 0 through 31.
- `slice/laws`: canonical digest rows are `bytes ; W:[parentStart,parentEnd) ; C:<childBytes> ; N:[childStart,childEnd)>[parentStart,parentEnd) ; O:<outsideExists>`. Generate 500 inputs using the stated seed and rule; all chosen boundaries come from the reference decoder's atoms.
