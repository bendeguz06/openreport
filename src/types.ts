export interface Whistle {
  id: string;
  name: string;
  reason: string;
  ipHash?: string;
  createdAt: Date;
}

export interface WhistleAdapter {
  save(whistle: Whistle): Promise<void>;
  list(): Promise<Whistle[]>;
}

export interface RawWhistle {
  name: string;
  reason: string;
  ip?: string;
}

export interface OpenWhistleConfig {
  adapter: WhistleAdapter;
  salt: string;
}

export interface OpenWhistleClient {
  submit: (whistle: RawWhistle) => Promise<void>;
  list: () => Promise<Whistle[]>;
}
