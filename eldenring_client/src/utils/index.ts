import {
  WeaponCategorys,
  WeaponTypes,
  AttackTypes,
  DeteriorationTypes
} from 'define';

export function addMiddleDot(array: string[]): string {
  return `${array.join(' · ')}`;
}

export function getCategoryDisplayText(code: string): string {
  const target = WeaponCategorys.find(item => item.code === code);
  return target !== undefined ? target.displayText : `${code} 없음`;
}

export function getWeaponTypeDisplayText(code: string): string {
  const target = WeaponTypes.find(item => item.code === code);
  return target !== undefined ? target.displayText : `${code} 없음`;
}

export function getAttackTypeDisplayText(code: string): string {
  const target = AttackTypes.find(item => item.code === code);
  return target !== undefined ? target.displayText : `${code} 없음`;
}

export function getDeteriorationTypeDisplayText(code: string): string {
  const target = DeteriorationTypes.find(item => item.code === code);
  return target !== undefined ? target.displayText : `${code} 없음`;
}

export function changeBlankToNumberOrNull(value: string): number | null {
  const _value = value.trim();
  return _value !== '' ? Number(_value) : null;
}

export function changeBlankToStringOrNull(value: string): string | null {
  const _value = value.trim();
  return _value !== '' ? String(_value) : null;
}

export function changeNullToDash(value: string | number | null): string {
  if (value === null) return '-';
  return String(value);
}

export function changeNullToBlank(val: string | number | null): string {
  if (val === null) return '';
  return String(val);
}