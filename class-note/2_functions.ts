//함수 리턴 값에 타입 지정
function add(): number{
    return 20;
}

//파라미터&리턴값에 타입지정
function sumf(a: number, b: number): number{
    return a+b;
}
sumf(10, 20);

//함수의 optional parameter
function log(a: string, b: string, c?:string){
    log('hello', 'ts');
}