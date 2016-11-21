import {Injectable, Inject, OpaqueToken} from '@angular/core';
// translation token
export const TRANSLATIONS = new OpaqueToken('translations');


// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './locales/lang.en';
import { LANG_ES_NAME, LANG_ES_TRANS } from './locales/lang.es';
import { LANG_ZH_NAME, LANG_ZH_TRANS } from './locales/lang.zh';

// all traslations
const dictionary = {
	[LANG_EN_NAME]: LANG_EN_TRANS,
	[LANG_ES_NAME]: LANG_ES_TRANS,
	[LANG_ZH_NAME]: LANG_ZH_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
	{ provide: TRANSLATIONS, useValue: dictionary },
];