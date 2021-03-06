/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
// import
var dictionary = {
  errors: {
    CYCLE: '#CYCLE!',
    DIV_BY_ZERO: '#DIV/0!',
    ERROR: '#ERROR!',
    NA: '#NV',
    NAME: '#NAME?',
    NUM: '#ZAHL!',
    REF: '#BEZUG!',
    VALUE: '#WERT!'
  },
  functions: {
    ABS: 'ABS',
    ACOS: 'ARCCOS',
    ACOSH: 'ARCCOSHYP',
    ACOT: 'ARCCOTAN',
    ACOTH: 'ARCCOTANHYP',
    AND: 'UND',
    ASIN: 'ARCSIN',
    ASINH: 'ARCSINHYP',
    ATAN2: 'ARCTAN2',
    ATAN: 'ARCTAN',
    ATANH: 'ARCTANHYP',
    AVERAGE: 'MITTELWERT',
    AVERAGEA: 'MITTELWERTA',
    AVERAGEIF: 'MITTELWERTWENN',
    BASE: 'BASIS',
    BIN2DEC: 'BININDEZ',
    BIN2HEX: 'BININHEX',
    BIN2OCT: 'BININOKT',
    BITAND: 'BITUND',
    BITLSHIFT: 'BITLVERSCHIEB',
    BITOR: 'BITODER',
    BITRSHIFT: 'BITRVERSCHIEB',
    BITXOR: 'BITXODER',
    CEILING: 'OBERGRENZE',
    CHAR: 'ZEICHEN',
    CHOOSE: 'WAHL',
    CLEAN: 'SÄUBERN',
    CODE: 'CODE',
    COLUMNS: 'SPALTEN',
    CONCATENATE: 'VERKETTEN',
    CORREL: 'KORREL',
    COS: 'COS',
    COSH: 'COSHYP',
    COT: 'COTAN',
    COTH: 'COTANHYP',
    COUNT: 'ANZAHL',
    COUNTA: 'ANZAHL2',
    COUNTBLANK: 'ANZAHLLEEREZELLEN',
    COUNTIF: 'ZÄHLENWENN',
    COUNTIFS: 'ZÄHLENWENNS',
    COUNTUNIQUE: 'COUNTUNIQUE',
    CSC: 'COSEC',
    CSCH: 'COSECHYP',
    CUMIPMT: 'KUMZINSZ',
    CUMPRINC: 'KUMKAPITAL',
    DATE: 'DATUM',
    DATEDIF: 'DATEDIF',
    DATEVALUE: 'DATWERT',
    DAY: 'TAG',
    DAYS360: 'TAGE360',
    DAYS: 'TAGE',
    DB: 'GDA2',
    DDB: 'GDA',
    DEC2BIN: 'DEZINBIN',
    DEC2HEX: 'DEZINHEX',
    DEC2OCT: 'DEZINOKT',
    DECIMAL: 'DEZIMAL',
    DEGREES: 'GRAD',
    DELTA: 'DELTA',
    DOLLARDE: 'NOTIERUNGDEZ',
    DOLLARFR: 'NOTIERUNGBRU',
    EDATE: 'EDATUM',
    EFFECT: "EFFEKTIV",
    EOMONTH: 'MONATSENDE',
    ERF: 'GAUSSFEHLER',
    ERFC: 'GAUSSFKOMPL',
    EVEN: 'GERADE',
    EXP: 'EXP',
    FALSE: 'FALSCH',
    FIND: 'FINDEN',
    FORMULATEXT: 'FORMELTEKST',
    FV: 'ZW',
    HEX2BIN: 'HEXINBIN',
    HEX2DEC: 'HEXINDEZ',
    HEX2OCT: 'HEXINOKT',
    HOUR: 'STUNDE',
    IF: 'WENN',
    IFERROR: 'WENNFEHLER',
    IFNA: 'WENNNV',
    INDEX: 'INDEX',
    INT: 'GANZZAHL',
    IPMT: 'ZINSZ',
    ISBINARY: 'ISBINARY',
    ISBLANK: 'ISTLEER',
    ISERR: 'ISTFEHL',
    ISERROR: 'ISTFEHLER',
    ISEVEN: 'ISTGERADE',
    ISFORMULA: 'ISTFORMEL',
    ISLOGICAL: 'ISTLOG',
    ISNA: 'ISTNV',
    ISNONTEXT: 'ISTKTEXT',
    ISNUMBER: 'ISTZAHL',
    ISODD: 'ISTUNGERADE',
    ISOWEEKNUM: 'ISOKALENDERWOCHE',
    ISPMT: 'ISPMT',
    ISREF: 'ISTBEZUG',
    ISTEXT: 'ISTTEXT',
    LEFT: 'LINKS',
    LEN: 'LÄNGE',
    LN: 'LN',
    LOG10: 'LOG10',
    LOG: 'LOG',
    MATCH: 'VERGLEICH',
    MAX: 'MAX',
    MAXA: 'MAXA',
    MAXPOOL: 'MAXPOOL',
    MEDIAN: 'MEDIAN',
    MEDIANPOOL: 'MEDIANPOOL',
    MIN: 'MIN',
    MINA: 'MINA',
    MINUTE: 'MINUTE',
    MMULT: 'MMULT',
    MOD: 'REST',
    MONTH: 'MONAT',
    NA: 'NV',
    NOMINAL: 'NOMINAL',
    NOT: 'NICHT',
    NOW: 'JETZT',
    NPER: 'ZZR',
    OCT2BIN: 'OKTINBIN',
    OCT2DEC: 'OKTINDEZ',
    OCT2HEX: 'OKTINHEX',
    ODD: 'UNGERADE',
    OFFSET: 'BEREICH.VERSCHIEBEN',
    OR: 'ODER',
    PI: 'PI',
    PMT: 'RMZ',
    POWER: 'POTENZ',
    PPMT: 'KAPZ',
    PROPER: 'GROSS2',
    PV: 'BW',
    RADIANS: 'BOGENMASS',
    RAND: 'ZUFALLSZAHL',
    RATE: 'ZINS',
    REPT: 'WIEDERHOLEN',
    RIGHT: 'RECHTS',
    ROUND: 'RUNDEN',
    ROUNDDOWN: 'ABRUNDEN',
    ROUNDUP: 'AUFRUNDEN',
    ROWS: 'ZEILEN',
    RRI: 'ZSATZINVEST',
    SEARCH: 'SUCHEN',
    SEC: 'SEC',
    SECH: 'SECHYP',
    SECOND: 'SEKUNDE',
    SHEET: 'BLATT',
    SHEETS: 'BLÄTTER',
    SIN: 'SIN',
    SINH: 'SINHYP',
    SLN: 'LIA',
    SPLIT: 'SPLIT',
    SQRT: 'WURZEL',
    SUM: 'SUMME',
    SUMIF: 'SUMMEWENN',
    SUMIFS: 'SUMMEWENNS',
    SUMPRODUCT: 'SUMMENPRODUKT',
    SUMSQ: 'QUADRATESUMME',
    SWITCH: '',
    SYD: 'DIA',
    TAN: 'TAN',
    TANH: 'TANHYP',
    TBILLEQ: 'TBILLÄQUIV',
    TBILLPRICE: 'TBILLKURS',
    TBILLYIELD: 'TBILLRENDITE',
    TEXT: 'TEXT',
    TIME: 'ZEIT',
    TIMEVALUE: 'ZEITWERT',
    TODAY: 'HEUTE',
    TRANSPOSE: 'MTRANS',
    TRIM: 'GLÄTTEN',
    TRUE: 'WAHR',
    TRUNC: 'KÜRZEN',
    VLOOKUP: 'SVERWEIS',
    WEEKDAY: 'WOCHENTAG',
    WEEKNUM: 'KALENDERWOCHE',
    XOR: 'XODER',
    YEAR: 'JAHR',
    YEARFRAC: 'BRTEILJAHRE'
  },
  langCode: 'deDE',
  ui: {
    NEW_SHEET_PREFIX: 'Sheet'
  }
};
export default dictionary;