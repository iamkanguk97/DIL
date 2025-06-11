# Type과 Interface의 차이

TypeScript에서 `type`과 `interface`는 모두 타입의 형태를 정의하는 데 사용되는 도구입니다. 하지만 어떤 상황에서는 `type`을, 어떤 상황에서는 `interface`를 사용하는게 더 좋다! 라는 가이드라인은 있는 것 같습니다.<br/>
지금부터 그에 대한 내용을 알아보려고 합니다.

## 요약

| 특징                 | type                                                                                                | interface                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 선언 병합            | 불가능(동일 이름 타입 선언시 오류)                                                                  | 가능(동일 이름 인터페이스 자동 병합)                        |
| 확장 방식            | &(인터섹션 타입) 연산자 사용                                                                        | `extends` 키워드 사용                                       |
| 타입 표현            | 원시타입, 유니온/인터섹션/튜플, 조건부/매핑 타입 등 모든 타입 정의 가능. 클래스 `implements` 불가능 | 주로 객체형태, 함수 시크니처 정의. 클래스 `implements` 가능 |
| Computed Value       | 사용 가능                                                                                           | 사용 불가능                                                 |
| 유니온/인터섹션 타입 | 사용 가능                                                                                           | 사용 불가능                                                 |
| 용도                 | 복잡하고 다양한 타입 조합, 함수 타입 정의                                                           | 객체 모델, 클래스 구현 계약, 라이브러리 타입 확장           |

> [!IMPORTANT]
>
> -   `type`은 모든 타입을 선언할 때 사용할 수 있고 `interface`는 객체에 대한 타입을 선언할 때만 사용할 수 있다.
> -   확장 불가능한 타입을 선언하고 싶다면 `type`을 사용하면 되고, 확장 가능한 타입을 선언하고 싶다면 `interface`를 사용하면 된다.
> -   객체의 형태를 정의하거나 클래스가 구현해야 할 계약을 정의할 때는 `interface`를 고려합니다. 특히 공개 API나 라이브러리를 만들 때 선언 병합 기능을 통해 사용자가 타입을 확장하기 용이하게 해줍니다.
> -   `interface`로 표현할 수 없는 더 복잡하고 다양한 형태의 타입을 정의해야 할 때는 `type`을 사용합니다. 유니온/튜플/원시타입의 별칭 그리고 조건부/매핑 타입과 같은 고급 타입 기능을 사용할 때는 필수적입니다.
> -   함수 타입을 정의할 때는 `type`이 간결하고 읽기 쉽습니다.

## (1) 확장(상속)하는 법

### interface

> [!TIP]
>
> -   `extends` 키워드를 통해 확장할 수 있습니다.

```ts
interface Person {
    name: string;
    age: number;
}

interface Student extends Person {
    school: string;
}

const iamkangukii: Student = {
    name: 'iamkanguk',
    age: 29,
    school: 'hello'
};
```

### type

> [!TIP]
>
> -   `&` 키워드를 통해 확장할 수 있습니다.
> -   extends 키워드는 사용할 수 없습니다.

```ts
type Person = {
    name: string;
    age: number;
};

type Student = Person & {
    school: string;
};

const iamkangukii: Student = {
    name: 'iamkanguk',
    age: 29,
    school: 'hello'
};
```

### 예외

> [!TIP]
>
> -   type은 extends 키워드를 사용할 수 없지만 interface가 type을 확장할 수 있습니다.
> -   반대로 type도 interface를 확장할 수 있습니다.

## (2) 선언적 확장 (Declaration Merging)

> [!IMPORTANT]
>
> -   타입 객체의 확장성을 위해서는 `interface`를 사용하는 것이 좋습니다.

### interface

> [!TIP]
>
> -   선언적 확장이 가능합니다.
> -   같은 이름으로 interface를 선언하면 확장됩니다.
> -   타입스크립트 컴파일러가 자동으로 합쳐서 하나의 interface로 만듭니다.
> -   라이브러리나 모듈의 타입을 확장하거나, 기존 인터페이스에 새로운 속성을 추가할 때 유용합니다.

```ts
interface Person {
    name: string;
    age: number;
}

interface Person {
    gender: string;
}

const kanguk: Person = {
    gender: 'female',
    name: 'asdf',
    age: 30
};
```

### type

> [!TIP]
>
> -   선언적 확장이 불가능합니다.
> -   동일한 이름의 타입이 선언되면 중복으로 인한 에러가 발생합니다.

```ts
type Person = {
    name: string;
    age: number;
};

// ERROR!
type Person = {
    gender: string;
};
```

## (3) 타입의 표현 범위

### interface

> [!TIP]
>
> -   **주로 객체의 형태(속성 및 메서드)를 정의하는데 사용됩니다.**
> -   원시 자료형에는 사용할 수 없습니다.
> -   함수 타입도 정의할 수 있지만 주로 객체 지향적인 관점에서 활용됩니다.

```ts
interface Person {
    name: string;
    age: number;
    gender: string;
}
```

### type

> [!TIP]
>
> -   객체의 타입을 정의할 때도 사용할 수 있습니다만, interface를 사용하는 것이 더욱 좋습니다.
> -   단순한 원시값(Primitive Type), 튜플(Tuple), 유니언(Union) 타입을 선언할 때는 좋습니다.
> -   **조건부 타입(Conditional Type), 매핑 타입(Mapped Type) 등 고급 타입 기능을 정의할 때 사용합니다.**

```ts
type Name = string;
type Age = number;
type Person = [string, string, string];
type ID = string | number;
```

## (4) Computed Value 사용

### interface

> [!TIP]
>
> -   사용 불가

```ts
type Subjects = 'math' | 'science' | 'history';

interface Grades {
    [key in Subjects]: string;
}
```

### type

> [!TIP]
>
> -   사용 가능

```ts
type Subjects = 'math' | 'science' | 'history';

type Grades = {
    [key in Subjects]: string;
};
```

---

## References

-   [TypeScript - type과 interface의 차이](https://velog.io/@wlwl99/TypeScript-type%EA%B3%BC-interface%EC%9D%98-%EC%B0%A8%EC%9D%B4)
-   [[TypeScript] type과 interface 사용법과 공통점 및 차이점](https://velog.io/@keynene/TypeScript-type%EA%B3%BC-interface-%EC%82%AC%EC%9A%A9%EB%B2%95%EA%B3%BC-%EA%B3%B5%ED%86%B5%EC%A0%90-%EB%B0%8F-%EC%B0%A8%EC%9D%B4%EC%A0%90)
