import {Injectable, Inject} from '@angular/core';
import { TRANSLATIONS } from './translate';

@Injectable()
export class TranslateService {
	private _currentLang: string;
	private _allLangs: any[] = [
		{ display: 'English', value: 'en' },
		{ display: 'Español', value: 'es' },
		{ display: '华语', value: 'zh' },
	];

	public get currentLang() {
	  return this._currentLang;
	}

	public get allLang() {
		return this._allLangs;
	}

    public isCurrentLang(lang: string): boolean {
      return (lang === this._currentLang);
    }

  	// inject our translations
	constructor(@Inject(TRANSLATIONS) private _translations: any) {
	}

	public use(lang: string): void {
		// set current language
		this._currentLang = lang;
	}

	private translate(key: string): string {
		// private perform translation
		let translation = key;
    	if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
			return this._translations[this.currentLang][key];
		}

		return translation;
	}

	public instant(key: string) {
		// public perform translation
		return this.translate(key);
	}
}