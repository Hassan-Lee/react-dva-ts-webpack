/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 14:58:43
 * @LastEditTime: 2019-10-09 15:25:31
 * @LastEditors: Please set LastEditors
 */
// @ts-nocheck
module.exports = {
  extends: ['stylelint-config-css-modules', 'stylelint-config-standard'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global', 'local'] }
    ],
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    'block-no-empty': true,
    'function-comma-space-after': 'always',
    'selector-pseudo-class-no-unknown': null,
    'shorthand-property-no-redundant-values': null,
    'at-rule-empty-line-before': null,
    'at-rule-name-space-after': 'always',
    'comment-empty-line-before': null,
    'declaration-bang-space-before': null,
    'declaration-empty-line-before': null,
    'declaration-block-trailing-semicolon': 'always',
    'function-comma-newline-after': null,
    'function-name-case': null,
    'function-parentheses-newline-inside': null,
    'function-max-empty-lines': null,
    'function-whitespace-after': null,
    'number-leading-zero': null,
    'number-no-trailing-zeros': null,
    'rule-empty-line-before': null,
    'selector-combinator-space-after': null,
    'selector-list-comma-newline-after': null,
    'selector-pseudo-element-colon-notation': null,
    'unit-no-unknown': null,
    'no-descending-specificity': null,
    'value-list-max-empty-lines': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': null
  }
};
