# 🔥TS with REACT
🔍GoGo(‾◡◝)

## ⚒️JS의 한계와 TS의 장점
JS의 가장 큰 특징 중 하나는 <code>동적 타입 언어</code>라는 것이다. 
<br>
그렇다면, 왜 *JS가 아닌 TS를 사용하고자 하는가??* 
<br>
- JS를 사용할 때 빈번히 발생하는 타입 에러 감소
- 리액트 사용 시 어떤 prop을 넘겨야 하는지 매번 확인하는 작업 불필요
- 객체 구조를 정의하는 <code>Interface</code>를 사용하여 협업에 용이

## 🪄enum에 대하여

enum이 type으로 사용된 경우. <code>typeof</code>을 사용했다.  
``` typescript
enum WeekDays {
    MON = "Mon",
    TUES = "Tues",
    WEDNES = "WEDS",
    THURS= = "Thurs",
    FRI="Fri"
}

type WeekDaysKey = keyof typeof WeekDays;
function logDays(key: WeekDaysKey, message: string){
    const day = WeekDays[key];
    if( day <= WeekDays.WEDNES ){
        console.log(`It's still ${day}day, ${message}`);
    }
}
```

## 🪄Union
``` typescript
type ProductItem = {
    id: number;
    name: string;
    type: string;
    price: number;
    quantity: number;
    imageUrl: string;
};

type CardItem = {
    id: number;
    name: string;
    type: string;
    imageUrl: string;
}

type PromotionEventItem = ProductItme | CardItem;
const logPromotionItem = (item: PromotionEventItem) => {
    console.log(item.name);
    console.log(item.price); //error
}

```

## 🪄Indexed Access Types(인덱스드 엑세스 타입)
배열의 요소 타입 조회 시 사용 

``` typescript
type PromotionList = [
    {type: "product", name: "a"}
    {type: "product", name: "b"}
    {type: "card", name: "c"}
];

type ElementOf<T> = typeof T[number];

//type PromotionType = {type: string; name: string}
type PromotionType = ElementOf<PromotionList>;

type 
```

## 🪄Mapped Types
``` typescript
const BottomSheetMap = {
    RECENT_CONTACTS: RecentContactBottomSheet,
    CARD_SELECT: CardSelectBottomSheet,
    //...
    STICKER: StickerBottomSheet
};

export type BOTTOM_SHEET_ID = keyof typeof BottomSheetMap;

//불필요한 반복이 발생하는 코드
type BottomSheetStore = {
    RECENT_CONTACTS: {
        resolver?:(payload: any) => void;
        args?: any;
        isOpened: boolean;
    };
    CARD_SELECT: {
        resolver?:(payload: any) => void;
        args?: any;
        isOpened: boolean;
    };
    //...
};

//Mapped Types를 통한 효율적 타입 선언
type BottomSheetStore = {
    [index in BOTTOM_SHEET_ID]: {
        resolver?:(payload: any) => void;
        args?: any;
        isOpened: boolean;
    };
};

//as를 사용하여 새로운 키 재지정하는 경우
type BottomSheetStore = {
    [index in BOTTOM_SHEET_ID as `${index}_BOTTOM_SHEET`]: {
        resolver?:(payload: any) => void;
        args?: any;
        isOpened: boolean;
    };
};
```

## 🪄호출 시그니처(call signature) 제네릭 및 타입 제한 
UseRequesterHookType 호출할 때 제네릭 타입을 구체 타입으로 한정. 
특정 타입(유니온 타입 포함)으로 제약할 수도 있고, 특정 인터페이스나 클래스도 사용 가능
``` typescript
export type UseRequesterHookType = <RequestData = void, ResponseData = void>(
    baseURL?:
    string | Headers,
    defaultHeader?: Headers
) => [RequestStatus, Requester<RequestData, ResponseData>];
```
other example
```typescript
//Recoil
function useSelectPagination <T extends CardListContent | CommonProductResponse>({
    categoryAtom,
    //...
}: useSelectPaginationProps<T>): {
    intersectionRef: RefObject<HTMLDivElemnt>,
    data: T[];
    categoryId: number;
    isLoading: boolean;
    isEmpty: boolean
}{
    //...
    return {
        intersectionRef,
        data: swappedData ?? [], //??
        categoryId,
        isLoading,
        isEmpty,
    }
};
```
cf. null 병합 연산자 <code>??</code> - a??b의 결과는 a가 null 또는 undefined가 아니면 a고 그 외에는 b이다. 

``` typescript
const { intersectionRef, data, isLoading, isEmpty } = useSelectPagination<CardListContent> ({
    categoryAtom: replyCardCategoryIdAtom, 
    ///...
});
```

## 🪄제네릭 클래스
외부에서 입력된 타입을 클래스 내부에 적용할 수 있는 클래스
``` typescript
class localDB<T>{
    //...
    async put(table: string, row: T): Promise<T>{
        return new Promise<T>((resolved, rejected) => { /*T 타입 데이터를 DB에 저장*/})
    }
    async get(table: string, key: any): Promise<T>{
        return new Promise<T>((resolved, rejected) => { /*T 타입의 데이터를 DB에서 가져옴*/})
    }
    async getTable(table: sring): Promise<T[]>{
        return new Promise<T>(((resolved, rejected) => { /*T[] 타입의 테이블을 DB에서 가져옴*/}))
    }
}
```

## 확장된 제네릭. 여러 개의 매개변수 사용
``` typescript
export class APIRes<Ok, Err=string>{
    private readonlyData: Ok | Err | null; private
    //...
    constructor (data: Ok | Err | null, statusCode: number | null, status: ResponseStatus){
        this.data = data;
        this.status = status;
        //...
    }

    public static Success <T, E= string>(data: T): APIRes<T,E>{
        return new this<T,E>(data, 200, ResponseStatus.SUCCESS);
    }
    //...
}
```

``` typescript
export interface ApiRes<Data>{
    data: Data;
    statusCode: string;
    statusMessage?: string; //선택적 프로퍼티 '?'
};
```

API 응답 값 타입 지정 예시
``` typescript
export const fetchPriceInfo = (): Promise<ApiRes<PriceInfo>> => {
    const priceUrl = "~~"; //url
    return request({
        method: "GET",
        url: priceUrl,
    });
};
```
<br>
__Enum vs Union__
<br>
- 유니온 타입은 <code>타입</code>이기 때문에 어떤 타입을 가졌는지 전부 기억해야 한다. 변경이 필요하면 사용되고 있는 곳을 모두 refactoring 해줘야 한다.
- enum은 <code>값</code>이기 때문에 검증이 가능하며 <code>iterable</code>하다. 

---
# 🔥비동기 처리
비동기처리를 다룰 때 고려해야할 사항들
- 현재 비동기 동작이 어떤 상태인가?
- 비동기 동작을 위해 필요한 정보가 무엇인가?
- 요청이 성공했다면 받은 정보를 어떻게 저장하고 관리할 것인가?
- 요청이 실패했다면 에러 처리를 어떻게 할 것인가?
- 비동기 요청에 대한 코드를 쉽게 유지보수할 수 있도록 어떻게 구조화하고 관리할 것인가?

# 🔥API Logic
1. Common REQUEST, 공통으로 사용하는 parameter 타입 정의 
``` typescript
export interface CommonRequest{
    name: string,
    mood: string,
    cardId: number,
    status: string,
    //...
}
```

2. Common RESPONSE, DB에서 응답값을 줄 때 공통적으로 주는 부분 
``` typescript
export interface CommonResponse{
    name: string,
    mood: string,
    cardId: number,
    status?: string,
    //...
}
```

3. API 호출하는 상황에서 받아올 데이터 정의
``` typescript
export interface User{
    name: string,
    mood: string;
    //...
}
```

4. REQUEST 할 데이터 타입 정의
``` typescript
export interface UserInfoResponse extends CommonResponse{
    userInfo: User[]
}
```

5. Axios & API Logic
``` typescript
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const Axios: AxiosInstance = axios.create({
    headers:{
        access_token: `${accessToken}`
    }
});

export const getAPIbyAxios = async <T>(baseURL: string, params: CommonRequest): Promise<T | null> {
    try{
        const {status, data}: AxiosResponse<T> = await getAPIbyAxios.post(baseURL, params); {
            catch(e){
                console.log(e);
            }
        }
    }
}
```

6. call API
``` typescript
import { CommonRequest } from '~~';
import { UserResponse } from '~~';

const fetchData = useCallback(async() => {
    const baseURL = `${baseURL}`
    const params: CommonRequest = {
        name: 'abc',
        mood: '슬픔',
        cardId: 1,
    }
    const data = await getAPIbyAxios<UserResponse>(baseURL params);
    //data.list에서 forEach, map 등 다양한 메소드 사용하여 각 배열의 인자에도 접근 가능.
}, []);
```
---

### Reference
- about 'this' method
https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/

- about extension SW
https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle

- typescript config doc
https://www.typescriptlang.org/tsconfig

- handbook
   - 우아한 타입스크립트 with 리액트
   - https://joshua1988.github.io/ts/guide/functions.html#this
