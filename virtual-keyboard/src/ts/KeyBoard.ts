import data from '../json/alphabet.json';
import { Idata } from '../types/types';

const currentLang: 'ru' | 'en' = (localStorage.getItem('lang') as 'ru' | 'en')
  ? (localStorage.getItem('lang') as 'ru' | 'en')
  : 'en';

enum reducerActionTypes {
  UPDATE_CURRET_LETTER = 'UPDATE_CURRET_LETTER',
  UPDATE_CURENT_LETTER_STATUS = 'UPDATE_CURENT_LETTER_STATUS',
  UPDATE_CURENT_LETTER_LANG = 'UPDATE_CURENT_LETTER_LANG',
}

type stateType = {
  currentLang: 'ru' | 'en';
  currentLetterState: 'default' | 'shift' | 'caps' | 'shiftCaps';
  currentLetterKey: string | null;
  firstStepOfChangeLang: boolean;
  secondStepOfChangeLang: boolean;
  cursorPosition: number;
};

type actionType = {
  type: string;
  payload: any;
};

class Keyboard {
  data: Idata;

  state: stateType;

  keyboard: HTMLDivElement | null;

  textarea: HTMLTextAreaElement;

  constructor() {
    this.state = {
      currentLang,
      firstStepOfChangeLang: false,
      secondStepOfChangeLang: false,
      currentLetterKey: null,
      currentLetterState: 'default',
      cursorPosition: 0,
    };
    this.keyboard = null;
    this.textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    document.addEventListener('keydown', this.handlekeyDownClick.bind(this));
    document.addEventListener('keyup', this.handlekeyUpClick.bind(this));
    this._init();
    this.data = data;
  }

  changeLanguage() {
    if (
      this.state.firstStepOfChangeLang == true &&
      this.state.secondStepOfChangeLang == true
    ) {
      const currentLangArray1 = this.keyboard?.querySelectorAll(
        `.lang_${this.state.currentLang}`
      );
      currentLangArray1?.forEach((item) => {
        item.classList.add('hidden');
      });
      this.reducer({
        type: reducerActionTypes.UPDATE_CURENT_LETTER_LANG,
        payload: this.state.currentLang === 'en' ? 'ru' : 'en',
      });
      localStorage.setItem('lang', this.state.currentLang);
      const currentLangArray2 = this.keyboard?.querySelectorAll(
        `.lang_${this.state.currentLang}`
      );
      currentLangArray2?.forEach((item) => {
        item.classList.remove('hidden');
      });
    }
  }

  handlekeyUpClick(e: KeyboardEvent) {
    if (e.code !== 'CapsLock') {
      (document.querySelector(`.${e.code}`) as HTMLDivElement).classList.remove(
        'active'
      );
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      this.reducer({
        type: reducerActionTypes.UPDATE_CURENT_LETTER_STATUS,
        payload: this.checkLetterStatus('shiftUp'),
      });
    }
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
      this.state.firstStepOfChangeLang = false;
    }
    if (e.code === 'AltLeft' || e.code === 'AltRight') {
      this.state.secondStepOfChangeLang = false;
    }
    this.changeLanguage();
  }

  handlekeyDownClick(e: KeyboardEvent) {
    e.preventDefault();
    const action: actionType = {
      type: reducerActionTypes.UPDATE_CURRET_LETTER,
      payload: e.code,
    };
    (document.querySelector(`.${e.code}`) as HTMLDivElement).classList.add(
      'active'
    );
    this.reducer(action);
    this.renderLetter();
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
      this.state.firstStepOfChangeLang = true;
    }
    if (e.code === 'AltLeft' || e.code === 'AltRight') {
      this.state.secondStepOfChangeLang = true;
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      this.reducer({
        type: reducerActionTypes.UPDATE_CURENT_LETTER_STATUS,
        payload: this.checkLetterStatus('shiftDown'),
      });
    }
    this.changeLanguage();
  }

  checkLetterStatus(
    code: 'default' | 'shiftDown' | 'shiftUp' | 'caps' | 'shiftCaps'
  ) {
    if (this.state.currentLetterState === 'default') {
      if (code == 'shiftDown') return 'shift';
      return code;
    }
    if (this.state.currentLetterState === 'shift') {
      if (code == 'caps') return 'shiftCaps';
      if (code == 'shiftDown') return 'shift';
      if (code == 'shiftUp') return 'default';
    }
    if (this.state.currentLetterState === 'caps') {
      if (code == 'shiftDown') return 'shiftCaps';
      if (code == 'caps') return 'default';
    }
    if (this.state.currentLetterState === 'shiftCaps') {
      if (code == 'shiftDown') return 'shiftCaps';
      if (code == 'shiftUp') return 'caps';
      if (code == 'caps') return 'shift';
    }
  }

  handleClickLetter(e: Event) {
    const target = (e.target as HTMLDivElement).closest(
      '.keyboard__key'
    ) as HTMLDivElement;
    let targetClass;
    if (target) {
      targetClass = target.classList[1];
    }
    const action: actionType = {
      type: reducerActionTypes.UPDATE_CURRET_LETTER,
      payload: targetClass,
    };
    this.reducer(action);
    this.renderLetter();
  }

  changeLetterStatus(status: string) {
    if (status === 'default') {
      document.querySelector('.CapsLock')?.classList.remove('active');
    } else if (status === 'caps') {
      document.querySelector('.CapsLock')?.classList.add('active');
    }
    const currentLetterStatusArray = this.keyboard?.querySelectorAll(
      `.${this.state.currentLetterState}`
    );
    const currentLangArray = this.keyboard?.querySelectorAll(
      `.lang_${this.state.currentLang}`
    );
    currentLangArray?.forEach((item) => {
      item.querySelectorAll('div').forEach((item) => {
        item.classList.add('hidden');
      });
    });
    currentLetterStatusArray?.forEach((item) => {
      item.classList.remove('hidden');
    });
  }

  _init() {
    this.keyboard = document.querySelector('#keyboard') as HTMLDivElement;
    this.keyboard.addEventListener('click', this.handleClickLetter.bind(this));
    this.keyboard.addEventListener(
      'mousedown',
      this.activateActiveClass.bind(this)
    );
    this.keyboard.addEventListener(
      'mouseup',
      this.deactivateActiveClass.bind(this)
    );
    this.keyboard.addEventListener(
      'mouseout',
      this.deactivateActiveClass.bind(this)
    );
    this.textarea.addEventListener(
      'click',
      this.updateCursorPostiton.bind(this)
    );
    this.textarea.addEventListener('input', (e) => {
      const splitValue = this.textarea.value.split('');
      splitValue.splice(this.state.cursorPosition, 1);
      this.textarea.value = splitValue.join('');
    });
  }

  deactivateActiveClass(e: Event) {
    const target = (e.target as HTMLDivElement).closest(
      '.keyboard__key'
    ) as HTMLDivElement;
    if (target) {
      if (!target.classList.contains('CapsLock')) {
        target.classList.remove('active');
      }
    }
  }

  activateActiveClass(e: Event) {
    const target = (e.target as HTMLDivElement).closest(
      '.keyboard__key'
    ) as HTMLDivElement;
    if (target) {
      target.classList.add('active');
    }
  }

  updateCursorPostiton() {
    setTimeout(() => {
      this.state.cursorPosition = this.textarea.selectionStart;
    }, 0);
  }

  reducer(action: actionType) {
    switch (action.type) {
      case reducerActionTypes.UPDATE_CURRET_LETTER:
        this.state.currentLetterKey = action.payload;
        break;
      case reducerActionTypes.UPDATE_CURENT_LETTER_STATUS:
        this.state.currentLetterState = action.payload;
        break;
      case reducerActionTypes.UPDATE_CURENT_LETTER_LANG:
        this.state.currentLang = action.payload;
        break;
    }
    this.changeLetterStatus(this.state.currentLetterState);
  }

  renderLetter() {
    const code = this.state.currentLetterKey as string;
    const letter = this.data
      .filter((item) => item.code === code)
      .map(
        (item) =>
          item.lang[this.state.currentLang][this.state.currentLetterState]
      )[0];
    this.textarea.value = this.getTextAreaValue(letter);
    this.textarea.selectionStart = this.state.cursorPosition;
    this.textarea.selectionEnd = this.state.cursorPosition;
    this.textarea.focus();
  }

  getTextAreaValue(letter: string) {
    const splitValue = this.textarea.value.split('');
    if (this.deleteLetter(letter)) {
      splitValue.splice(this.state.cursorPosition, 1);
    } else if (this.backSpaceLetter(letter)) {
      if (this.state.cursorPosition > 0) {
        splitValue.splice(this.state.cursorPosition - 1, 1);
        this.state.cursorPosition--;
      } else {
        splitValue.splice(this.state.cursorPosition, 0);
      }
    } else {
      splitValue.splice(
        this.state.cursorPosition,
        0,
        this.convertLetter(letter)
      );
    }
    return splitValue.join('');
  }

  backSpaceLetter(letter: string) {
    return letter === 'Backspace';
  }

  deleteLetter(letter: string) {
    return letter === 'Del';
  }

  convertLetter(letter: string): string {
    switch (letter) {
      case 'Tab':
        this.state.cursorPosition += 3;
        return '   ';
      case 'Enter':
        this.state.cursorPosition++;
        return '\n ';
      case 'Shift':
        return '';
      case 'Ctrl':
        return '';
      case 'Alt':
        return '';
      case 'Win':
        return '';
      case 'CapsLock':
        this.reducer({
          type: reducerActionTypes.UPDATE_CURENT_LETTER_STATUS,
          payload: this.checkLetterStatus('caps'),
        });
        return '';
      case ' ':
        this.state.cursorPosition++;
        return ' ';
      default:
        this.state.cursorPosition++;
        return letter;
    }
  }
}

export { Keyboard };
