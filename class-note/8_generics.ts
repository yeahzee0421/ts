// function logText(text){
//     console.log(text);
//     return text;
// }

// logText(89);
// logText('123123');
// logText(true);
//text의 타입을 지정해주지 않았으므로 암묵적으로 any 타입이다. 
// >logText 안에 숫자를 넣든, 문자를 넣든 상관이 없다.

//문자열 T를 들고가서 함수 안에서 한바퀴 돈 다음에 반환까지 T의 타입인 string이 된다.
function logText<T> (text: T): T {  
    console.log(text);
    return text;
}
//generic을 사용하면 return되는 인자의 타입을 호출할 때 지정해줄 수 있음. 
//generic의 장점 
//단순히 여러 종류의 타입을 받기 위해서 중복된(불필요한) 
// 함수를 계속해서 재생성하는 것은 유지보수 측면에서 bad

const str = logText<string> ('hi'); //직접 지정해주는 방식. 
str.split('');
const isIt = logText<boolean> (true);

//인터페이스에 제네릭 선언> 얼마든지 value의 타입을 바꿀 수 있다.  
interface Dropdown{
    value: string,
    selected: boolean;
}

const obj: Dropdown = {value: '10', selected: true};

interface Dropdown_<T>{
    value: T;
    selected: boolean;
}
const obj_: Dropdown_<number> = {value: 10, selected: false};

//제네릭의 타입 제한
// logTextLen 함수에 들어갈 수 있는 타입T를 정의를 한 다음에 
// text의 타입을 제네릭 타입으로 정의하고 리턴값을 T로
function logTextLen<T>(text: T[]): T[] { //배열로 가정을 하고 메소드 사용 가능 
    console.log(text.length);
    text.forEach(function (text){
        console.log(text);
    })
    return text;
}
logTextLen(['abcdabcd', 'efg']); //이 함수에 어떤 타입이 들어올지 모르기때문에 제한 필요. 

//정의된 타입 이용
interface lenType {
    length: number;
}
function textLength<T extends lenType> (text: T): T {
    text.length;
    return text;
}
textLength({length: 10}); //length라는 속성만 들어가면 객체 넣어도 ㄱㅊ 

//제네릭 타입 제한 by keyof
interface Items{
    name: string;
    price: number;
    stock: number;
}
//Items에 있는 key들 중에 한 가지가 제네릭의 타입이 된다. 
//getItemOp의 파라미터로는 Items의 key들 중 하나만 들어갈 수 있다. 
function getItemOp<T extends keyof Items>(itemOp: T): T{
    return itemOp;
}
//자동완성 ctrl+space
getItemOp("name");