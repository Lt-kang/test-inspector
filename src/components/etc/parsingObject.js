function ParsingChoice(choice) {
    let text = ""
  
    for (const key in choice) {
      text += `<h3 style="white-space: nowrap; overflow-wrap: normal; word-break: normal; display: inline;">${key}</h3>: ${choice[key]}<br>`
    }
    
    return text
  }


export { ParsingChoice }