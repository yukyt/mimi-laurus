export const VIEW_MODE = {
  SIMULATOR: 1,
  WARDROBE: 2,
  HELP: 3,
};

export const VIEW_NAME_NAME = new Map([
  [VIEW_MODE.SIMULATOR, 'Simulator'],
  [VIEW_MODE.WARDROBE, 'Wardrobe'],
  [VIEW_MODE.HELP, 'Help'],
]);

// Style Rank (for both Item and Stage)
export const RANK = {
  SSS: 6,
  SS: 5,
  S: 4,
  A: 3,
  B: 2,
  C: 1,
};

export const RANK_WEIGHT = new Map([
  [RANK.SSS, 3200.0],
  [RANK.SS, 2612.7],
  [RANK.S, 2089.35],
  [RANK.A, 1690.65],
  [RANK.B, 1309.8],
  [RANK.C, 817.5],
]);

export const STYLE = {
  GORGEOUS: 0,
  SIMPLE: 1,
  ELEGANCE: 2,
  LIVELY: 3,
  MATURE: 4,
  CUTE: 5,
  SEXY: 6,
  PURE: 7,
  WARM: 8,
  COOL: 9,
};

export const STYLE_NAME = new Map([
  [STYLE.GORGEOUS, '華麗'],
  [STYLE.SIMPLE, 'シンプル'],
  [STYLE.ELEGANCE, 'エレガント'],
  [STYLE.LIVELY, 'アクティブ'],
  [STYLE.MATURE, '大人'],
  [STYLE.CUTE, 'キュート'],
  [STYLE.SEXY, 'セクシー'],
  [STYLE.PURE, 'ピュア'],
  [STYLE.WARM, 'ウォーム'],
  [STYLE.COOL, 'クール'],
]);

export const ITEM_CATEGORY = {
  HAIR: 1,
  DRESS: 2,
  COAT: 3,
  TOPS: 4,
  BOTTOMS: 5,
  SOCKS: 7,
  ANKLET: 8,
  SHOES: 9,
  MAKEUP: 10,

  HAIR_ORNAMENT: 13,
  VEIL: 14,
  HAIRPIN: 15,
  EAR: 16,
  EARRINGS: 17,
  SCARF: 19,
  NECKLACE: 20,
  RIGHT_HAND_ORNAMENT: 22,
  LEFT_HAND_ORNAMENT: 23,
  GLOVES: 24,
  RIGHT_HAND_HOLDING: 26,
  LEFT_HAND_HOLDING: 27,
  BOTH_HAND_HOLDING: 28,
  WAIST: 29,

  FACE: 31,
  BODY: 32,
  TATOO: 33,
  WING: 34,
  TAIL: 35,
  FOREGROUND: 36,
  BACKGROUND: 37,
  HANGING: 38,
  GROUND: 39,
  SKIN: 40,
};

export const ITEM_CATEGORY_NAME = new Map([
  [ITEM_CATEGORY.HAIR, 'ヘアスタイル'],
  [ITEM_CATEGORY.DRESS, 'ドレス'],
  [ITEM_CATEGORY.COAT, 'コート'],
  [ITEM_CATEGORY.TOPS, 'トップス'],
  [ITEM_CATEGORY.BOTTOMS, 'ボトムス'],
  [ITEM_CATEGORY.SOCKS, '靴下'],
  [ITEM_CATEGORY.ANKLET, 'アンクレット'],
  [ITEM_CATEGORY.SHOES, 'シューズ'],
  [ITEM_CATEGORY.MAKEUP, 'メイク'],

  [ITEM_CATEGORY.HAIR_ORNAMENT, 'ヘッドアクセ'],
  [ITEM_CATEGORY.VEIL, 'ヴェール'],
  [ITEM_CATEGORY.HAIRPIN, 'カチューシャ'],
  [ITEM_CATEGORY.EAR, 'つけ耳'],
  [ITEM_CATEGORY.EARRINGS, '耳飾り'],
  [ITEM_CATEGORY.SCARF, 'マフラー'],
  [ITEM_CATEGORY.NECKLACE, 'ネックレス'],
  [ITEM_CATEGORY.RIGHT_HAND_ORNAMENT, '右手飾り'],
  [ITEM_CATEGORY.LEFT_HAND_ORNAMENT, '左手飾り'],
  [ITEM_CATEGORY.GLOVES, '手袋'],
  [ITEM_CATEGORY.RIGHT_HAND_HOLDING, '右手持ち'],
  [ITEM_CATEGORY.LEFT_HAND_HOLDING, '左手持ち'],
  [ITEM_CATEGORY.BOTH_HAND_HOLDING, '両手持ち'],
  [ITEM_CATEGORY.WAIST, '腰飾り'],

  [ITEM_CATEGORY.FACE, 'フェイス'],
  [ITEM_CATEGORY.BODY, 'ボディ'],
  [ITEM_CATEGORY.TATOO, 'タトゥー'],
  [ITEM_CATEGORY.WING, '羽根'],
  [ITEM_CATEGORY.TAIL, 'しっぽ'],
  [ITEM_CATEGORY.FOREGROUND, '前景'],
  [ITEM_CATEGORY.BACKGROUND, '後景'],
  [ITEM_CATEGORY.HANGING, '吊り'],
  [ITEM_CATEGORY.GROUND, '床'],
  [ITEM_CATEGORY.SKIN, '肌'],
]);

export const STAGE_SECTION = new Map([
  ['colosseum', 'コロッセオ'],
  ['guild', 'ギルド'],
  ['event', 'イベント'],
  ['scenario', 'シナリオ'],
]);

// JSON column
export const ITEM_JSON_COLUMN = {
  ID: 0,
  CATEGORY: 1,
  NAME: 3,
  STYLE: 4,
  TAG: 5,
};

export const STAGE_JSON_COLUMN = {
  ID: 0,
  NAME: 1,
  STYLE: 3,
  TAG: 4,
};

export const ITEM_SHOW_COUNT = {
  DEFAULT: 50,
  INCREASE: 50,
};

export const INIT_SECTION_ID = 'colosseum';
export const INIT_STAGE_ID = 'C1-1';
