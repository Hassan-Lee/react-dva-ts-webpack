/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 14:58:43
 * @LastEditTime: 2019-09-12 14:58:43
 * @LastEditors: your name
 */
// @ts-nocheck
module.exports = {
	extends: ['stylelint-config-css-modules', 'stylelint-config-standard', 'stylelint-config-ydj/less'],
	rules: {
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
		'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
	}
}
