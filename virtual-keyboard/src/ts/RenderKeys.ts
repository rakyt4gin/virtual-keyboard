import { Idata } from '../types/types';
import data from '../json/alphabet.json';

const currentLang: 'ru' | 'en' = (localStorage.getItem('lang') as 'ru' | 'en')
  ? (localStorage.getItem('lang') as 'ru' | 'en')
  : 'en';

class RenderKeys {
  constructor() {
    document.body.innerHTML = this.render(data);
  }

  render(data: Idata) {
    return `
    <div class="container">
      <h1>Virtual Keyboard</h1>
      <textarea id="textarea"></textarea>
      <div class="keyboard" id="keyboard">
        <div class="keyboard__inner-wrapper">
          ${data
            .map((item) => {
              return `
              <div class="keyboard__key ${item.code}">
                <div class="lang_ru ${currentLang === 'en' && 'hidden'}">
                  <div class="default">${item.lang.ru.default}</div>
                  <div class="shift hidden">${item.lang.ru.shift}</div>
                  <div class="caps hidden">${item.lang.ru.caps}</div>
                  <div class="shiftCaps hidden">${item.lang.ru.shiftCaps}</div>
                </div>
                <div class="lang_en ${currentLang === 'ru' && 'hidden'}">
                  <div class="default">${item.lang.en.default}</div>
                  <div class="shift hidden">${item.lang.en.shift}</div>
                  <div class="caps hidden">${item.lang.en.caps}</div>
                  <div class="shiftCaps hidden">${item.lang.en.shiftCaps}</div>
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>
      <p>Клавиатура создана в операционной системе Windows</p>
      <p>Для переключения языка комбинация: любые ctrl + alt</p>
    </div>
    `;
  }
}

export { RenderKeys };
