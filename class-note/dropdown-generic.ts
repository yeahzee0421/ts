interface DropdownItem<T>{
  value: T;
  selected: boolean;
}

const emails_: DropdownItem<string>[] = [
  { value: 'naver.com', selected: true },
  { value: 'gmail.com', selected: false },
  { value: 'hanmail.net', selected: false },
];

const numberOfProducts_: DropdownItem<number>[] = [
  { value: 1, selected: true },
  { value: 2, selected: false },
  { value: 3, selected: false },
];

//첫번째 방법: extends + union
function createDropdownItem_<T extends string | number>( item: DropdownItem<T> ): HTMLOptionElement {
  const option = document.createElement('option');
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option; 
}

//두번째 방법: 제네릭 타입을 toString() 메서드를 가진 타입으로 제한 
function createDropdownItem__<T extends { toString: Function }>( item: DropdownItem<T> ): HTMLOptionElement {
  const option = document.createElement('option');
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option; 
}

// NOTE: 이메일 드롭 다운 아이템 추가
emails_.forEach(function (email: DropdownItem<string>){
  const item = createDropdownItem_<string>(email);
  const selectTag = document.querySelector('#email-dropdown');
  selectTag.appendChild(item);
});

numberOfProducts_.forEach(function (product: DropdownItem<number>){
  const item = createDropdownItem_<number>(product);
  const selectTag = document.querySelector("#product-dropdown");
  selectTag.appendChild(item);
})