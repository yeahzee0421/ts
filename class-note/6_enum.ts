enum Shoes{
    Nike = '나이키',
    Adidas = '아디다스'
}

var myShoes = Shoes.Nike;
console.log(myShoes); //'나이키'



enum Answer {
    Yes = 'Y',
    No = 'N'
}

function askQuestion(answer: Answer){
    if(answer === Answer.Yes){
        console.log('정답');
    }
    if(answer === Answer.No){
        console.log('오답');
    }
}
askQuestion(Answer.Yes); 
//enum에서 제공하는 데이터만 사용 가능 
//dropdown등 목록이 필요한 경우에 enum을 많이 쓴다.