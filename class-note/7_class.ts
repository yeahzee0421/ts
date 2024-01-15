class Person{
    private name: string; //클래스 유효범위까지 설정 가능
    public age: number; 
    readonly log: string; //읽기만 가능 
    
    //상단 부분에 타입 정의
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
}