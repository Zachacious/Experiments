const moo = require("moo");

let lexer = moo.compile({
  // KW: {
  //   match: /[a-zA-Z]+/,
  //   type: moo.keywords(
  //     Object.fromEntries(
  //       ["while", "if", "else", "log", "let"].map((kw) => ["KW_" + kw, kw])
  //     )
  //   ),
  // },
  KW: ["let", "const"],
  TYPE: ["int", "float", "bool", "string"],
  // SPACE: { match: /\s+/, lineBreaks: true },
  IDENT: /[A-Za-z_$]+[A-Za-z_0-9$]*/,
  HEX: /#(?:[A-Za-z0-9]{3}|[A-Za-z0-9]{6})\b/,
  // STRING: /"(?:\\["\\]|[^\n"\\])*"/,
  STRING: [
    { match: /"""[^]*?"""/, lineBreaks: true, value: (x) => x.slice(3, -3) },
    {
      match: /"(?:\\["\\rn]|[^"\\])*?"/,
      lineBreaks: true,
      value: (x) => x.slice(1, -1),
    },
    {
      match: /'(?:\\['\\rn]|[^'\\])*?'/,
      lineBreaks: true,
      value: (x) => x.slice(1, -1),
    },
  ],

  WS: /[ \t]+/,

  LINE_COMMENT: /\/\/.*?$/,
  BLOCK_COMMENT: {
    match: /\/\*[^]*?\*\//,
    lineBreaks: true,
  },

  NUM: /(?:\+|-)?[0-9]+(?:\.[0-9]+)?/,
  // INT: /0|[1-9][0-9]*/,

  INC: "++",
  DEC: "--",

  BS_RIGHT: ">>",
  BS_LEFT: "<<",
  BS_RIGHT_ASSIGN: ">>=",
  BS_LEFT_ASSIGN: "<<=",

  PLUS_ASSIGN: "+=",
  MINUS_ASSIGN: "-=",
  MULT_ASSIGN: "*=",
  DIV_ASSIGN: "/=",
  MOD_ASSIGN: "%=",
  LOG_AND_ASSIGN: "&&=",
  LOG_OR_ASSIGN: "||=",

  COMP_EQ: "==",
  NEQ: "!=",
  FAT_ARROW: "=>",
  LT: "<",
  GT: ">",
  LTE: "<=",
  GTE: ">=",
  LOG_AND: "&&",
  LOG_OR: "||",

  BS_AND: "&",
  BS_OR: "|",
  BS_XOR: "^",

  POW: "**",

  ASSIGN_EQ: "=",
  DOUBLE_QUOTE: /"/,
  SINGLE_QUOTE: /'/,
  HILDE: /~/,
  LITERAL_QUOTE: /`/,
  TRUE: "true",
  FALSE: "false",
  NULL: "null",
  UNDEF: "undefined",
  LPAREN: "(",
  RPAREN: ")",
  LBRACKET: "[",
  RBRACKET: "]",
  LBRACE: "{",
  RBRACE: "}",
  COMMA: ",",
  COLON: ":",
  DOT: ".",
  NL: { match: /\r\n/, lineBreaks: true },
  PLUS: "+",
  MINUS: "-",
  MULT: "*",
  DIV: "/",
  MOD: "%",
  NOT: "!",
  COLON: ":",
  SEMICOLON: ";",
});

module.exports = lexer;
