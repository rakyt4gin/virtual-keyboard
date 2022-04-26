import { RenderKeys } from "./ts/RenderKeys";

new RenderKeys()


// const textarea = document.querySelector('#textarea') as HTMLTextAreaElement;
// const button = document.querySelector('button') as HTMLButtonElement;
// let cursor: number
// let arr = []
// textarea.onclick = function() {
//   setTimeout(() => {
//     cursor = textarea.selectionStart
//   }, 0);
// }

// textarea.oninput = function() {
//   setTimeout(() => {
//     cursor = textarea.selectionStart
//   }, 0);
// }

// button.onclick = function() {
//   arr = textarea.value.split('')
//   arr.splice(cursor - 1, 1)
//   cursor -=1
//   textarea.value = arr.join('')
//   textarea.focus()
// }

// document.addEventListener('keydown', (e: KeyboardEvent) => {
//   const a = `
//   {
//     "keyCode": "${e.keyCode}",
//     "code": "${e.code}",
//     "lang": {
//       "en": {
//         "default": "${e.key}",
//         "shift": "${e.key.toUpperCase()}",
//         "caps": "${e.key.toUpperCase()}",
//         "shiftCaps": "${e.key}"
//       },
//       "ru":{
//         "default": "${e.key}",
//         "shift": "${e.key.toUpperCase()}",
//         "caps": "${e.key.toUpperCase()}",
//         "shiftCaps": "${e.key}"
//       }
//     }
//   },

//   `
//   console.log(a);
// })


