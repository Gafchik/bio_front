import i18n from "@/modules/i18n.js"
const trans_prefix = 'app.rules'
const rules = {
    lengthEqual: len => v => (v || '').length === len || i18n.global.t(`${trans_prefix}.length.equal`, {len: len}),
    lengthLess: len => v => (v || '').length < len || i18n.global.t(`${trans_prefix}.length.less`, {len: len}),
    lengthLessOrEqual: len => v => (v || '').length <= len || i18n.global.t(`${trans_prefix}.length.lessOrEqual`, {len: len}),
    lengthMore: len => v => (v || '').length > len || i18n.global.t(`${trans_prefix}.length.more`, {len: len}),
    lengthMoreOrEqual: len => v => (v || '').length >= len || i18n.global.t(`${trans_prefix}.length.moreOrEqual`, {len: len}),
    required: field_name => v => !!v || i18n.global.t(`${trans_prefix}.require`, {field_name: field_name}),
    requiredWith0: field_name => v => (v !== undefined && v !== null && !!(v.toString().length)) || i18n.global.t(`${trans_prefix}.require`, {field_name: field_name}),
    numericValue: () => v => /^[-+]?[0-9]*\.?[0-9]*$/.test(v) || i18n.global.t(`${trans_prefix}.numeric_value`),
    coordinatesValue: () => v => /^(-?\d{1,3}(\,|\.)\d{7})$/.test(v) || i18n.global.t(`${trans_prefix}.coordinates_value`),

    confirmField: (confirm, field_name) => v => v === confirm || i18n.global.t(`${trans_prefix}.confirm_field`, {field_name: field_name}),
    email: () => v => /.+@.+\..+/.test(v) || i18n.global.t(`${trans_prefix}.email_exemple`,{dog: '@'}),
}
export default rules