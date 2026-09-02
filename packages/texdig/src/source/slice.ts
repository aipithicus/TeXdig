/**
 * Lossless lineage between a parent snapshot and a child byte-window snapshot.
 *
 * The child has its own coordinate basis and identity but shares the parent's
 * private immutable byte storage. Rebasing upward is total. Rebasing downward
 * is partial and throws instead of clipping geometry to the window.
 */

import { byteOffset, byteSpan, containsSpan, type ByteOffset, type ByteSpan } from "./span.js";
import { snapshotView, type SourceSnapshot, type SourceSnapshotOptions } from "./snapshot.js";
import { SourceTopology } from "./topology.js";

function assertSnapshotOffset(snapshot: SourceSnapshot, offset: ByteOffset, name: string): void {
  if (!Number.isSafeInteger(offset) || offset < 0 || offset > snapshot.byteLength) {
    throw new RangeError(
      `${name} must be a safe integer in [0, ${String(snapshot.byteLength)}], received ${String(offset)}`,
    );
  }
}

function childOptions(parent: SourceSnapshot, window: ByteSpan): SourceSnapshotOptions {
  const common: SourceSnapshotOptions = {
    sourceId: `${parent.sourceId}#${String(window.start)}-${String(window.end)}`,
    revision: parent.revision,
  };
  const declaredEncoding = parent.decoding.declaredEncoding;
  return declaredEncoding === undefined ? common : { ...common, declaredEncoding };
}

/** A validated parent window and the distinct child snapshot minted over it. */
export class SourceSlice {
  public readonly parent: SourceSnapshot;
  /** The child's extent in parent byte coordinates. */
  public readonly window: ByteSpan;
  public readonly child: SourceSnapshot;

  private constructor(parent: SourceSnapshot, window: ByteSpan, child: SourceSnapshot) {
    this.parent = parent;
    this.window = window;
    this.child = child;
    Object.freeze(this);
  }

  /**
   * Creates a child snapshot over an atom-bounded parent window. Empty windows
   * at atom boundaries are valid and mint empty child coordinate spaces.
   */
  public static create(parent: SourceSnapshot, window: ByteSpan): SourceSlice {
    SourceTopology.of(parent).validateByteSpan(window);
    const stableWindow = byteSpan(window.start, window.end);
    const child = snapshotView(parent, stableWindow, childOptions(parent, stableWindow));
    return new SourceSlice(parent, stableWindow, child);
  }

  public toParent(childOffset: ByteOffset): ByteOffset;
  public toParent(childSpan: ByteSpan): ByteSpan;
  public toParent(childGeometry: ByteOffset | ByteSpan): ByteOffset | ByteSpan {
    if (typeof childGeometry === "number") {
      assertSnapshotOffset(this.child, childGeometry, "child byte offset");
      return byteOffset(this.window.start + childGeometry);
    }

    SourceTopology.of(this.child).validateByteSpan(childGeometry);
    return byteSpan(this.window.start + childGeometry.start, this.window.start + childGeometry.end);
  }

  public toChild(parentOffset: ByteOffset): ByteOffset;
  public toChild(parentSpan: ByteSpan): ByteSpan;
  public toChild(parentGeometry: ByteOffset | ByteSpan): ByteOffset | ByteSpan {
    if (typeof parentGeometry === "number") {
      assertSnapshotOffset(this.parent, parentGeometry, "parent byte offset");
      if (parentGeometry < this.window.start || parentGeometry > this.window.end) {
        throw new RangeError(
          `parent byte offset ${String(parentGeometry)} lies outside slice window [${String(this.window.start)}, ${String(this.window.end)}]`,
        );
      }
      return byteOffset(parentGeometry - this.window.start);
    }

    SourceTopology.of(this.parent).validateByteSpan(parentGeometry);
    if (!containsSpan(this.window, parentGeometry)) {
      throw new RangeError(
        `parent byte span [${String(parentGeometry.start)}, ${String(parentGeometry.end)}) lies outside slice window [${String(this.window.start)}, ${String(this.window.end)}); intersect with the window before rebasing down`,
      );
    }
    return byteSpan(
      parentGeometry.start - this.window.start,
      parentGeometry.end - this.window.start,
    );
  }
}
