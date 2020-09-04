/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
// import
var dictionary = {
  errors: {
    CYCLE: '#CYCLE!',
    DIV_BY_ZERO: '#DĚLENÍ_NULOU!',
    ERROR: '#ERROR!',
    NA: '#NENÍ_K_DISPOZICI',
    NAME: '#NÁZEV?',
    NUM: '#ČÍSLO!',
    REF: '#ODKAZ!',
    VALUE: '#HODNOTA!'
  },
  functions: {
    ABS: 'ABS',
    ACOS: 'ARCCOS',
    ACOSH: 'ARCCOSH',
    ACOT: 'ACOT',
    ACOTH: 'ACOTH',
    AND: 'A',
    ASIN: 'ARCSIN',
    ASINH: 'ARCSINH',
    ATAN2: 'ARCTG2',
    ATAN: 'ARCTG',
    ATANH: 'ARCTGH',
    AVERAGE: 'PRŮMĚR',
    AVERAGEA: 'AVERAGEA',
    AVERAGEIF: 'AVERAGEIF',
    BASE: 'BASE',
    BIN2DEC: 'BIN2DEC',
    BIN2HEX: 'BIN2HEX',
    BIN2OCT: 'BIN2OCT',
    BITAND: 'BITAND',
    BITLSHIFT: 'BITLSHIFT',
    BITOR: 'BITOR',
    BITRSHIFT: 'BITRSHIFT',
    BITXOR: 'BITXOR',
    CEILING: 'ZAOKR.NAHORU',
    CHAR: 'ZNAK',
    CHOOSE: 'ZVOLIT',
    CLEAN: 'VYČISTIT',
    CODE: 'KÓD',
    COLUMNS: 'SLOUPCE',
    CONCATENATE: 'CONCATENATE',
    CORREL: 'CORREL',
    COS: 'COS',
    COSH: 'COSH',
    COT: 'COT',
    COTH: 'COTH',
    COUNT: 'POČET',
    COUNTA: 'POČET2',
    COUNTBLANK: 'COUNTBLANK',
    COUNTIF: 'COUNTIF',
    COUNTIFS: 'COUNTIFS',
    COUNTUNIQUE: 'COUNTUNIQUE',
    CSC: 'CSC',
    CSCH: 'CSCH',
    CUMIPMT: 'CUMIPMT',
    CUMPRINC: 'CUMPRINC',
    DATE: 'DATUM',
    DATEDIF: 'DATEDIF',
    DATEVALUE: 'DATUMHODN',
    DAY: 'DEN',
    DAYS360: 'ROK360',
    DAYS: 'DAYS',
    DB: 'ODPIS.ZRYCH',
    DDB: 'ODPIS.ZRYCH2',
    DEC2BIN: 'DEC2BIN',
    DEC2HEX: 'DEC2HEX',
    DEC2OCT: 'DEC2OCT',
    DECIMAL: 'DECIMAL',
    DEGREES: 'DEGREES',
    DELTA: 'DELTA',
    DOLLARDE: 'DOLLARDE',
    DOLLARFR: 'DOLLARFR',
    EDATE: 'EDATE',
    EFFECT: "EFFECT",
    EOMONTH: 'EOMONTH',
    ERF: 'ERF',
    ERFC: 'ERFC',
    EVEN: 'ZAOKROUHLIT.NA.SUDÉ',
    EXP: 'EXP',
    FALSE: 'NEPRAVDA',
    FIND: 'NAJÍT',
    FORMULATEXT: 'FORMULATEXT',
    FV: 'BUDHODNOTA',
    HEX2BIN: 'HEX2BIN',
    HEX2DEC: 'HEX2DEC',
    HEX2OCT: 'HEX2OCT',
    HOUR: 'HODINA',
    IF: 'KDYŽ',
    IFERROR: 'IFERROR',
    IFNA: 'IFNA',
    INDEX: 'INDEX',
    INT: 'CELÁ.ČÁST',
    IPMT: 'PLATBA.ÚROK',
    ISBINARY: 'ISBINARY',
    ISBLANK: 'JE.PRÁZDNÉ',
    ISERR: 'JE.CHYBA',
    ISERROR: 'JE.CHYBHODN',
    ISEVEN: 'ISEVEN',
    ISFORMULA: 'ISFORMULA',
    ISLOGICAL: 'JE.LOGHODN',
    ISNA: 'JE.NEDEF',
    ISNONTEXT: 'JE.NETEXT',
    ISNUMBER: 'JE.ČISLO',
    ISODD: 'ISODD',
    ISOWEEKNUM: 'ISOWEEKNUM',
    ISPMT: 'ISPMT',
    ISREF: 'JE.ODKAZ',
    ISTEXT: 'JE.TEXT',
    LEFT: 'ZLEVA',
    LEN: 'DÉLKA',
    LN: 'LN',
    LOG10: 'LOG',
    LOG: 'LOGZ',
    MATCH: 'POZVYHLEDAT',
    MAX: 'MAX',
    MAXA: 'MAXA',
    MAXPOOL: 'MAXPOOL',
    MEDIAN: 'MEDIAN',
    MEDIANPOOL: 'MEDIANPOOL',
    MIN: 'MIN',
    MINA: 'MINA',
    MINUTE: 'MINUTA',
    MMULT: 'SOUČIN.MATIC',
    MOD: 'MOD',
    MONTH: 'MĚSÍC',
    NA: 'NEDEF',
    NOMINAL: 'NOMINAL',
    NOT: 'NE',
    NOW: 'NYNÍ',
    NPER: 'POČET.OBDOBÍ',
    OCT2BIN: 'OCT2BIN',
    OCT2DEC: 'OCT2DEC',
    OCT2HEX: 'OCT2HEX',
    ODD: 'ZAOKROUHLIT.NA.LICHÉ',
    OFFSET: 'POSUN',
    OR: 'NEBO',
    PI: 'PI',
    PMT: 'PLATBA',
    POWER: 'POWER',
    PPMT: 'PLATBA.ZÁKLAD',
    PROPER: 'VELKÁ2',
    PV: 'SOUČHODNOTA',
    RADIANS: 'RADIANS',
    RAND: 'NÁHČÍSLO',
    RATE: 'ÚROKOVÁ.MÍRA',
    REPT: 'OPAKOVAT',
    RIGHT: 'ZPRAVA',
    ROUND: 'ZAOKROUHLIT',
    ROUNDDOWN: 'ROUNDDOWN',
    ROUNDUP: 'ROUNDUP',
    ROWS: 'ŘÁDKY',
    RRI: 'RRI',
    SEARCH: 'HLEDAT',
    SEC: 'SEC',
    SECH: 'SECH',
    SECOND: 'SEKUNDA',
    SHEET: 'SHEET',
    SHEETS: 'SHEETS',
    SIN: 'SIN',
    SINH: 'SINH',
    SLN: 'ODPIS.LIN',
    SPLIT: 'SPLIT',
    SQRT: 'ODMOCNINA',
    SUM: 'SUMA',
    SUMIF: 'SUMIF',
    SUMIFS: 'SUMIFS',
    SUMPRODUCT: 'SOUČIN.SKALÁRNÍ',
    SUMSQ: 'SUMA.ČTVERCŮ',
    SWITCH: '',
    SYD: 'ODPIS.NELIN',
    TAN: 'TG',
    TANH: 'TGH',
    TBILLEQ: 'TBILLEQ',
    TBILLPRICE: 'TBILLPRICE',
    TBILLYIELD: 'TBILLYIELD',
    TEXT: 'HODNOTA.NA.TEXT',
    TIME: 'ČAS',
    TIMEVALUE: 'ČASHODN',
    TODAY: 'DNES',
    TRANSPOSE: 'TRANSPOZICE',
    TRIM: 'PROČISTIT',
    TRUE: 'PRAVDA',
    TRUNC: 'USEKNOUT',
    VLOOKUP: 'SVYHLEDAT',
    WEEKDAY: 'DENTÝDNE',
    WEEKNUM: 'WEEKNUM',
    XOR: 'XOR',
    YEAR: 'ROK',
    YEARFRAC: 'YEARFRAC'
  },
  langCode: 'csCZ',
  ui: {
    NEW_SHEET_PREFIX: 'Sheet'
  }
};
export default dictionary;