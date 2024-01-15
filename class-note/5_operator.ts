function logMessage(value: string | number){
    console.log(value);
}
logMessage('hello');
logMessage(100);

//유니온 타입의 장점?
//타입 가드: 특정 타입으로 타입의 범위를 좁혀나가는 과정 
function _logMessage(value: string | number){
    if(typeof value === 'number'){
        value.toFixed; //any와 다르게 타입에 사용가능한 속성들 자동 호출 
    }
    else{
        value.toString(); 
    }
    throw new TypeError('value must be string or number');
}
logMessage('hello');
logMessage(100);

interface Developer{
    name: string;
    skill: string;
}

interface Person{
    name: string;
    age: number;
}
//union으로 두 인터페이스를 지정해도 모든 속성을 사용가능한 것이 아니라 
//공통된 name만 사용가능
//intersection으로 모든 속성을 포함하는 하나의 타입이라고 정의 가능
function askSomeone(someone: Developer | Person){
    someone.name; 
    // someone.age;
    // someone.skill;
}
//데이터에 따라서 넘겨주는. 
askSomeone({name: 'Dev1', skill: 'web'}); 
askSomeone({name: 'Dev2', age: 24});