interface User{
    name: string;
    age: number;
}

var user1: User = {
    name: 'lee',
    age: 24
}

function getUser(user: User){
    console.log(user);
}
const Newbee = {
    name: 'Kim',
    age: 25
}
getUser(Newbee);

//함수의 구조에 인터페이스 활용 
interface AddFunction{
    (a: number, b: number): number;
}
var sum: AddFunction;
sum = function(a: number, b:number): number{
    return a+b;
}

//인덱싱
interface StringArray{
    [index: number]: string //그때그때 임의로 속성을 추가할 수 있음 
}
var arr: StringArray = ['a', 'b', 'c'];
// arr[0] = 10;

//딕셔너리 패턴
interface StringRedexDictionary{
    [key: string]: RegExp;
}
var obj: StringRedexDictionary = {
    // sth: /abc/,
    // cssFile: /\.css$/,
    // jsFile: /\.js$/,
}

Object.keys(obj).forEach(function(value){});

// //인터페이스 확장 
// interface Person{
//     name: string,
//     age: number;
// }
// interface Developer extends Person{
//     skill: string;
// }

// var lee: Developer = {
//     skill: 'ts',
//     age: 24,
//     name: 'lee'
// }