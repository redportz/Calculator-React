import Display from "./Display.jsx";
import Keypad from "./Keypad.jsx";
import React, {useState} from "react";

function isOperator(key) {
  return key === "+" || key === "-" || key === "*" || key === "/";
}

function isDigit(key) {
  return key.length === 1 && key >= "0" && key <= "9";
}

function isSafeExpression(str) {
  const allowed = "0123456789+-*/. ";
  for (const ch of str) {
    if (!allowed.includes(ch)) return false;
  }
  return true;
}


function Calculator() {
  const [display, setDisplay] = useState("0");
  const [justEvaluated,setJustEvaluated] =useState(false);

  function handleKeyPress(key) {
    setDisplay((prev)=> {
        if(key ==="C"){
            setJustEvaluated(false);
            return "0";
        }

        if(justEvaluated && (isDigit(key) || key === ".")){
            setJustEvaluated(false);
            return key === "." ? "0." : key;
        }

        if (key ==="="){
            try {
                const expre = prev;
                
                if (!isSafeExpression(expre)) {
                    return prev;
                }

                const trimmed = expre.trim();
                if (trimmed.length ===0){
                    return "0";
                }

                const lastChar = trimmed.slice(-1);
                if (isOperator(lastChar)){
                    return prev;
                }
                
                const result = Function(`"use struct"; return (${trimmed})`)();

                setJustEvaluated(true);

                if(!Number.isFinite(result)){
                    return "Error";
                }
                return String(result);
            } catch {
                return "Error";
            }
        }
        if (isDigit(key)){
            setJustEvaluated(false);
            if (prev === "0") {
                return key
            }
            return prev +key;
        }
        if (key ==="."){
            setJustEvaluated(false);

            const lastChunk = prev.split(/[+\-*/]/).pop();

            if(lastChunk.includes(".")){
                return prev;
            }

            const last = prev.trim().slice(-1);
            if (prev === "0"){
                return "0.";
            }

            if(prev ==="" || isOperator(last)){
                return prev +"0.";
            }
            return prev + "."
        }

        if (isOperator(key)){
            setJustEvaluated(false);

            const trimmed = prev.trim();
            const last = trimmed.slice(-1);

            if (isOperator(last)) {
                return trimmed.splice(0,-1) +key;
            }
            return trimmed + key;
        }
        return prev;
    });
}

  return (
    <div className="Calculator-container">
      <Display value={display} />
      <Keypad onKeyPress={handleKeyPress} />
    </div>
  );
}

export default Calculator