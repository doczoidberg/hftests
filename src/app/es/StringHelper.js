/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
export function collatorFromConfig(config) {
  var sensitivity = config.caseSensitive ? config.accentSensitive ? 'variant' : 'case' : config.accentSensitive ? 'accent' : 'base';
  var caseFirst = config.caseFirst;
  var ignorePunctuation = config.ignorePunctuation;
  return new Intl.Collator(config.localeLang, {
    sensitivity: sensitivity,
    caseFirst: caseFirst,
    ignorePunctuation: ignorePunctuation
  });
}