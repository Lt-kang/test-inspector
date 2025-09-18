import { useState } from 'react';

function ProblemInfoButton({onClickFunction}) {
    return (
        <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-2"
        onClick={onClickFunction}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-info h-4 w-4">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </button>
    )
}

function CorrectButton({onClickFunction}) {
    return (
        <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
        onClick={onClickFunction}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-check h-4 w-4 text-green-600">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </button>
    )
}

function WrongButton({onClickFunction}) {
    return (
        <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
        onClick={onClickFunction}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-x h-4 w-4 text-red-600">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
    )
}

function UnresolvedButton({onClickFunction}) {
    return (
        <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
        onClick={onClickFunction}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-rotate-ccw h-4 w-4">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
        </button>
    )
}

function CustomButton({onClickFunction, Text, style={}, noMargin=false}) {
    return (
        <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
        style={{...style, marginLeft: noMargin ? "0px" : "5px"}}
        onClick={onClickFunction}>
        {Text}
      </button>
    )
}

function SaveButton({onClickFunction, loadCheck, Text="Save", style={}, noMargin=false}) {
  const [saveState, setSaveState] = useState('idle'); // 'idle', 'saving', 'saved'
  
  const handleClick = () => {
      if (!loadCheck) {
        return ;
      }

      setSaveState('saving');
      
      try {
        
          onClickFunction();

          console.log("SaveButton clicked");
          setSaveState('saved');
          
          // 2초 후 원래 상태로 복귀
          setTimeout(() => {
              setSaveState('idle');
          }, 2000);
      } catch (error) {
        // console.log(error);
          setSaveState('idle');
      }
  };
  
  const getButtonContent = () => {
    
      switch(saveState) {
          case 'saving':
              return (
                  <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      Saving...
                  </>
              );
          case 'saved':
              return (
                  <>
                      <svg className="w-4 h-4 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Saved!
                  </>
              );
          default:
              return Text;
      }
  };
  
  const getButtonClass = () => {
      let baseClass = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-9 rounded-md px-3";
      
      switch(saveState) {
          case 'saving':
              return baseClass + " bg-blue-50 border-blue-300 text-blue-700 cursor-wait";
          case 'saved':
              return baseClass + " bg-green-50 border-green-300 text-green-700 animate-pulse";
          default:
              return baseClass + " bg-background hover:bg-accent hover:text-accent-foreground";
      }
  };
  
  return (
      <button 
          className={getButtonClass()}
          style={{...style, marginLeft: noMargin ? "0px" : "5px"}}
          onClick={handleClick}
          disabled={saveState === 'saving'}
      >
          {getButtonContent()}
      </button>
  )
}


function SpecialCustomButton({onClickFunction, Text, style={}, noMargin=false}) {
  return (
    <div class="flex justify-center">
      <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
      style={{...style, marginLeft: noMargin ? "0px" : "5px"}}
      onClick={onClickFunction}>
      {Text}
    </button>
    </div>
  )
}


const button_on = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
const button_off = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
function AnswerHideButton({answerShow, setAnswerShow}) {
    return (
      <div class="flex justify-center">
      <button class={answerShow ? button_on : button_off}
              onClick={() => setAnswerShow(!answerShow)}>
        {answerShow ? "해답 숨기기" : "해답 보기"}
      </button>
    </div>
    )
}


function KeyButton({keyInfo, setKeyInfo}) {
  return (
  <button 
  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
  style={{marginRight: "7px"}}
  onClick={() => {
    setKeyInfo(keyInfo)
    console.log(keyInfo)
    }}>
        {keyInfo}
      </button>
  )
}

export { ProblemInfoButton, CorrectButton, WrongButton, UnresolvedButton, CustomButton, SpecialCustomButton, AnswerHideButton, KeyButton, SaveButton };