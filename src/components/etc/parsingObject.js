// function ParsingChoice(choice) {
//     let text = ""

//     const escapeHtml = (unsafe) => {
//       return unsafe
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
//     }
  
//     for (const key in choice) {
//       text += `<h3 style="white-space: nowrap; overflow-wrap: normal; word-break: normal; display: inline;">${key}</h3>: ${choice[key]}<br>`
//     }
    
//     return text
//   }


// export { ParsingChoice }

function ParsingChoice(choice) {
  let text = ""

  for (const key in choice) {
    text += `**${key}**: ${choice[key] ?? "null"}\n\n`
  }
  
  return text
}

export { ParsingChoice }