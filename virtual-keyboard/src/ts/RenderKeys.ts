import data from '../json/alphabet.json'

type Idata = typeof data

class RenderKeys{
  constructor(){
    document.body.innerHTML = this.render(data)
  }

  render(data: Idata){
    return `
    <div class="container">
      <h1>Virtual Keyboard</h1>
      <textarea id="textarea"></textarea>
      <div id="keyboard">
        <div class="keyboard__inner-wrapper">
          ${data.map(item => {
            return `
              <div class="keyboard__key ${item.code}">
                <div class="lang_ru hidden">
                  <div class="default">${item.lang.ru.default}</div>
                  <div class="shift hidden">${item.lang.ru.shift}</div>
                  <div class="caps hidden">${item.lang.ru.caps}</div>
                  <div class="shiftCaps hidden">${item.lang.ru.shiftCaps}</div>
                </div>
                <div class="lang_en">
                  <div class="default">${item.lang.en.default}</div>
                  <div class="shift hidden">${item.lang.en.shift}</div>
                  <div class="caps hidden">${item.lang.en.caps}</div>
                  <div class="shiftCaps hidden">${item.lang.en.shiftCaps}</div>
                </div>
              </div>
            `
          })}
        </div>
      </div>
    </div>
    `
  }
}

export {RenderKeys}