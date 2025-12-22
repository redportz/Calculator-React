
function Keypad({onKeyPress}) {
    const  keys = 
    ["C","/",  "*","-",
     "7", "8", "9", "+",
     "4", "5", "6", "=",
     "1", "2", "3", ".",
     "0"  ];


     const listKeys = keys.map(item => <button key={item} onClick={() => onKeyPress(item)} className="key"> {item} </button>);

     return(
        <div className="keypad">
            {listKeys}
        </div>
     );
}

export default Keypad