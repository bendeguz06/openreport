import type { WhistleAdapter, Whistle } from "../types.js";

export abstract class BaseAdapter implements WhistleAdapter {
  abstract save(whistle: Whistle): Promise<void>;
  abstract list(): Promise<Whistle[]>;
}
