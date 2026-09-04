# TeXdig conformance fixture format

This file is the single normative description of the conformance fixture container. A consumer can implement a reader and reproduce every census from this document alone.

## File grammar

Files are UTF-8 text. A file consists of header lines followed by zero or more rows. Blank lines are ignored. `#` begins a comment anywhere on a row. A header has the exact form `# key: value`; after that leading `# `, another `#` begins an inline comment. Other lines beginning with `#` are comments. Header keys are lowercase ASCII. Only `digest` may repeat; all other headers are singletons. Consumers reject missing or malformed required headers and an unknown `schema`.

Required headers are `family` (`group/name`), `schema` (`1`), and `generator` (`texdig-conformance 0.0.0`). `convention` is required whenever derived offsets occur and is `atoms` in this corpus. `seed` is a non-zero hexadecimal uint32 for random families. `rule` states census enumeration in plain text. `laws` is a space-separated list of law identifiers. Each census has one or more `digest` headers:

```text
# digest: sha256:<64 lowercase hex digits> canon:rows-v1 count:<decimal cases> tier:<default|deep>
```

Rows contain three or more fields separated by exactly ` ; `. Field one is the input bytes as uppercase hexadecimal pairs separated by one space, or `-` for empty input. Field two is the declared encoding as `E:<label>`; labels are non-empty ASCII encoding names made from letters, digits, `.`, `_`, `+`, and `-`. Every fixture in this corpus uses `E:utf-8`. The declaration is recorded metadata and never licenses transcoding, normalization, or replacement of the input bytes. Family fields begin at field three and are defined below. Non-negative decimal integers have no sign or leading padding; a signed integer has one leading `-` only when negative. A span is half-open and written `[a,b)`. Lists are comma-separated; `-` denotes an empty list where a prefixed list token requires a value.

## Shared token vocabulary

- Decoder unit: `start-end:S:HEX` for a well-formed scalar or `start-end:I:HEX` for one preserved invalid byte. `HEX` is uppercase without padding.
- Declared encoding: `E:<label>`.
- Decoder result: `U:<units>`; invalid count: `N:<decimal>`; leading BOM flag: `M:0|1`.
- Line starts: `L:0,4,9`; per-offset line indexes: `I:0,0,1`; line/column positions: `P:line/byteCol/atomCol/utf16Col,...`.
- Coordinate boundary: `B:byte/utf16/atom`; repeated boundaries are comma-separated.
- Occurrence metadata token: a non-empty ASCII token beginning with a letter or digit and continuing with letters, digits, `.`, `_`, `+`, or `-`.
- Occurrence claim: `start-end/kind/producerId@version/priority/ruleId`; `priority` is a signed 32-bit integer and `-` in the final slot means no rule id.
- Occurrence ordinal list: discovery ordinals separated by `.`, or `-` for empty. A lookup signature is `geometryOrdinals/priorityOrdinals`.
- Occurrence-selection bitmap: one `0` or `1` per batch ordinal in discovery order, or `-` for an empty batch.
- Pairing symbol: `OA`, `OB`, `CA`, or `CB`, where `O`/`C` is the role and `A`/`B` is the compatibility key. Pairing words are comma-separated.
- Pairing match: `openOrdinal>closeOrdinal`. A mismatch appends `/expected/found`; a dangling close is `closeOrdinal@[start,end)`; an unclosed open is `openOrdinal@position`. The combined residue list prefixes these three forms with `X`, `D`, and `U`, respectively.
- Span-set list: half-open spans joined as `[a,b),[c,d)`, or `-` for empty. Raw lists retain input order; result lists are normalized.
- Span-set membership bitmap: one `0` or `1` per input byte in offset order, or `-` for a zero-byte carrier.
- Booleans are `0` and `1`. Family-specific prefixes distinguish otherwise similar values.

## Digest canonicalization

`rows-v1` visits cases in the stated enumeration order. For each case it takes the row exactly as it would be written explicitly, without a comment, appends one LF byte (`\n`), and feeds the UTF-8 bytes to SHA-256. The lowercase hexadecimal digest covers the concatenation. CRLF is never used in canonical rows. Counts are decimal case counts. Explicit illustration rows do not alter a census digest.

The `tier` field controls execution cadence, not fixture authority. A default-tier check may retain a parsed deep digest without recomputing its value; it still rejects missing, extra, malformed, or wrongly sized deep census metadata. A deep check recomputes every digest.

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
- `O1`: freezing preserves discovery order and ordinal identity, including duplicate geometry, overlap, and nesting.
- `O2`: kind, structured producer, and rule-id tables preserve values in first-appearance order.
- `O3`: geometry order is start ascending, end descending, then discovery ordinal.
- `O4`: priority order is priority descending, then geometry order.
- `O5`: intersecting-span and containing-position lookups agree with brute force under both orders; empty span queries and the EOF position return no records.
- `O6`: batch rebasing equals elementwise byte translation, preserves discovery ordinals, metadata, and both lookup orders, round-trips through the exact slice bases, composes through nested slices, and rejects any outside member without clipping.
- `SEL1`: none, all, ordinal, and predicate construction validate the exact batch extent, collapse duplicate ordinals, and expose count, membership, and ascending enumeration consistently.
- `SEL2`: union, intersection, and subtraction agree with pointwise Boolean-array operations over the batch ordinals.
- `SEL3`: none/all identities, idempotence, commutativity where applicable, absorption, self-subtraction, complement, and double complement hold; complement never exposes or counts an unused tail bit.
- `SEL4`: selected-record projection filters the batch's geometry and priority orders without changing discovery ordinals.
- `SEL5`: equality and binary algebra use frozen-batch reference identity; a different value-identical batch compares unequal and is rejected by binary operations.
- `SEL6`: `coverage()` is the explicit identity-dropping projection and equals the normalized union of selected spans while the selection retains equal-geometry ordinals separately.
- `PAIR1`: compatible snapshots' selected tokens form one geometry-ordered nonoverlapping stream; every close pops exactly the top open, compatibility yields one match, and mismatch never searches lower in the stack.
- `PAIR2`: a popped incompatibility retains both ordinals plus expected/found names, an empty-stack close retains its consuming span, and each final open retains an EOF boundary position; consuming residue is in source order and final opens are inner-first.
- `PAIR3`: matched and residue selections are disjoint exact-batch partitions of both inputs; matches are one-to-one forward edges and strict-stack envelopes never cross.
- `PAIR4`: results retain the exact open selection, close selection, and their independent local ordinals; separately constructed identity-compatible snapshots are accepted, while a shared role, overlapping token geometry, or incompatible snapshot is rejected.
- `PAIR5`: `pairedRegions()` deliberately drops delimiter identity into the normalized union of matched opener-to-closer envelopes and excludes every residue item.
- `PAIR6`: a policy retains a nonblank stable name and copied structured producer stamp; its compatibility and expected/found-name functions are the only policy-dependent decisions and invalid names or callback results are rejected.
- `B1`: normalization drops empty spans, sorts the remainder, and merges duplicate, nested, overlapping, and adjacent material into nonempty strictly separated spans.
- `B2`: coverage is bitmap population, point containment is the indexed bitmap value, and equality requires compatible snapshot identity plus equal normalized members.
- `B3`: union, intersection, subtraction, and whole-snapshot complement agree with pointwise bitmap operations.
- `B4`: empty/whole identities, idempotence, commutativity where applicable, absorption, self-subtraction, complement, and double-complement laws hold.
- `B5`: binary operations accept separately constructed identity-compatible snapshots and reject a changed source id, content hash, or revision.
- `B6`: normalized coverage rebasing equals elementwise byte translation, round-trips through the exact slice bases, and composes through nested slices; direct downward rebasing succeeds exactly when every member lies within the slice window and otherwise rejects without clipping.

## Family fields and enumeration

- Every row begins `bytes ; E:<declaredEncoding>`. The suffixes below start with field three.
- `utf8/named`: `U:<units> ; N:<invalidCount> ; M:<bom>`. Rows are the union of the decoder's named adversarial and scalar-boundary cases, without duplicates.
- `utf8/classes`: the same fields. For each length, enumerate base-24 codes from zero upward; position zero receives the least-significant digit. Length-one rows are explicit. Digest headers are ordered for lengths one through five; lengths one through four are default and length five is deep.
- `utf8/random`: the same canonical row, digest-only. Generate 5,000 cases. Length is `5 + next()%12`; even-numbered cases choose each byte from the 24 representatives and odd-numbered cases use `next()%256`.
- `span/predicates`: `A:[a,b) ; B:[c,d) ; C:<contains> ; Q:<properlyContains> ; I:<intersects> ; X:<crosses>`. The five zero input bytes are a carrier with six boundaries. Enumerate each span start-major/end-major, left span outermost.
- `topology/lines`: `L:<starts> ; I:<lineIndex per offset> ; P:<position per offset>`. Recursively visit the current input before appending each of `A`, `CR`, `LF`, `CRLF`. Rows through four pieces are explicit; the digest covers exactly five pieces.
- `topology/conversions`: `B:<boundaries>`. Each boundary is byte/UTF-16/atom under `atoms`. Named rows are explicit. The 1,000-row census uses `length=next()%33`, then `next()%256` per byte.
- `snapshot/identity`: hash vector suffixes are `V:<sha256>`. Compatibility suffixes are `A:<sourceId>/<revision> ; R:<rightBytes>|<rightDeclaredEncoding>|<sourceId>|<revision> ; K:<compatible>`; the right input's declaration is explicit because compatibility ignores decoding metadata and compares only the identity triple. The digest census suffixes are `M:<mutatedIndex> ; C:<fingerprintChanged>` for xor-FF at indices 0 through 31.
- `slice/laws`: canonical digest suffixes are `W:[parentStart,parentEnd) ; C:<childBytes> ; N:[childStart,childEnd)>[parentStart,parentEnd) ; O:<outsideExists>`. Generate 500 inputs using the stated seed and rule; all chosen boundaries come from the reference decoder's atoms.
- `occurrence/batch`: `C:<claims> ; K:<kinds> ; D:<producerId@version> ; R:<ruleIds> ; G:<geometryOrdinals> ; Y:<priorityOrdinals> ; X:<spanQueries> ; P:<positionQueries>`. `C`, `K`, `D`, and `R` retain discovery/first-appearance order. `G` and `Y` use the two total orders above. `X` enumerates every half-open query span over input boundaries in start-major then end-major order; `P` enumerates positions from zero through EOF. Each lookup entry is a signature, entries are comma-separated, and no entry may be omitted. Four named rows make empty, duplicate, overlapping, nested, priority, and structural-producer cases explicit. For each of 500 digest cases, draw `length=1+next()%12`, then `length` bytes as `next()%256`, then `claimCount=next()%13`. Each claim consumes six draws in this order: `start=next()%length`; `end=start+1+next()%(length-start)`; `kind=next()%4` over `token,delimiter,comment,residue`; `producer=next()%3` over `lexer@1,parser@2,lexer@2`; `priority=next()%9-4`; and `rule=next()%3` over `-,scan-a,scan-b`. For `O6`, wrap that exact input in the root bytes `41 42 <input> 43`: an outer slice removes `41` and `43`, an inner slice removes `42`, and a direct slice removes both prefixes and the suffix. Rebase each claim by the corresponding fixed offset; no additional random draws occur and the canonical row is unchanged.
- `occurrence/selection`: `C:<claims> ; A:<rawLeftOrdinals> ; B:<rawRightOrdinals> ; N:<left> ; M:<right> ; F:<priorityNonnegativePredicate> ; U:<union> ; I:<intersection> ; S:<leftSubtractRight> ; X:<leftComplement> ; K:<leftCount> ; P:<leftMembership> ; G:<leftGeometryOrder> ; Y:<leftPriorityOrder> ; V:<leftCoverage> ; Q:<leftEqualsRight>`. Raw lists retain order and duplicates; every result list is an ascending ordinal set except `G` and `Y`, which retain the named batch order. Five named rows make empty and singleton batches, duplicate ordinal input, equal-geometry identities, overlap coverage, and complement tails across 32- and 64-bit boundaries explicit. For each of 500 digest cases, draw `length=1+next()%12`, then `length` bytes, then `claimCount=next()%70`. Claims use the same six draws and vocabularies as `occurrence/batch`. For each side, draw `pickCount=next()%(2*claimCount+1)`, then that many ordinals as `next()%claimCount`; when the batch is empty the pick-count draw yields zero and no ordinal draw occurs. `F` selects priority greater than or equal to zero.
- `pairing/strict-stack`: `T:<word> ; P:<policyName>/<producerId>@<version> ; M:<matches> ; R:<orderedResidue> ; X:<mismatches> ; D:<danglingCloses> ; U:<unclosedOpens> ; O:<openResidueOrdinals> ; C:<closeResidueOrdinals> ; V:<pairedCoverage>`. Opens and closes inhabit separate identity-compatible batches, and each role discovers its selected tokens from right to left so its local ordinals deliberately oppose geometry order. Token at word position `p` occupies `[2p,2p+1)`, and policy `keys-equal/pairing-oracle@1` compares the `A`/`B` key. Six named rows make empty, single, nested, sequential, mismatch, dangling, and unclosed outcomes explicit. The 5,461-row default census enumerates every word of length zero through six over `OA,OB,CA,CB`: base-4 codes ascend and position zero receives the least-significant digit.
- `span-set/algebra`: `A:<rawLeft> ; B:<rawRight> ; N:<normalizedLeft> ; M:<normalizedRight> ; U:<union> ; I:<intersection> ; S:<leftSubtractRight> ; C:<leftComplement> ; V:<leftCoverage> ; P:<leftMembership> ; Q:<leftEqualsRight> ; W:[sliceStart,sliceEnd) ; R:<scopedLeftRebasedToChild> ; O:<leftWhollyInsideWindow>`. The input is a zero-byte carrier whose length defines the snapshot extent. Five named rows make zero-length extent, unsorted input, duplicates, empty spans, nesting, overlap, adjacency, whole coverage, algebra results, and both downward-rebase outcomes explicit. For each of 500 digest cases, draw `length=next()%17`; `leftCount=next()%9`, then two `next()%(length+1)` boundaries per left span; `rightCount=next()%9`, then two boundaries per right span; and two final boundaries for the slice window. Sort each boundary pair into start/end without dropping equality; the oracle bitmap performs normalization. For the nested part of `B6`, wrap the exact carrier in root bytes `41 42 <input> 43` and compare the two-slice and direct elementwise translations by two bytes; no additional random draws occur and the canonical row is unchanged.
