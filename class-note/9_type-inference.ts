var a; //type을 지정하지않으면 기본적으로 any 
var b = 10; 
var c = 'abcd';

function getP(p = 10){
    var v = 'value';
    return p + v;
}

interface DropD<T>{
    value: T;
    title: string;
}

interface DetailedDropD<T> extends DropD<T>{
    des: string;
    tag: T;
}

var items: DropD<string> = {
    value: 'value-string',
    title: 'one'
}

var detailedItem: DetailedDropD<string> = {
    title: 'abcd',
    des: '설명',
    tag: 'a',
    value: 'a'
}

//Best common type
var arr = [1, 2, true] //union type으로 묶어나간다. 