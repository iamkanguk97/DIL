# JavaScript Object.freeze()와 Object.seal()

> **JavaScript로 간단한 프로젝트를 하고 있는데, `Object.freeze()` 를 처음 사용해보았는데 관련해서 정리를 한번 해보려고 합니다.**

## 요약

-   **`Object.freeze()` 와 `Object.seal()` 은 객체의 불변성을 유지하기 위해 사용됩니다.**
-   **`Object.freeze()`가 `seal` 보다 강제성이 높습니다. `seal`은 프로퍼티 값 수정은 가능합니다.**
-   **중첩 객체는 불변성을 보장하지 못합니다. 따라서, 재귀를 통해 중첩 객체까지 freeze를 적용하는 유틸 함수를 직접 구현해서 사용할 수 있습니다.**

---

**JavaScript는 다른 언어들과 다르게 객체에 접근해서 직접 값을 수정할 수 있고 Property 추가도 가능합니다.<br/>
그리고, `const`로 선언해도 수정 또는 추가가 가능합니다.**

> [!IMPORTANT]
>
> **< JavaScript에서 `const`로 선언해도 객체 프로퍼티 추가 및 수정이 가능한 이유는 무엇일까요? >**
>
> -   `const`는 값의 재할당을 막는 것이지, 값 내부의 변경을 막는 것이 아닙니다.
> -   JavaScript 참조 타입(object - 객체/배열/함수)는 변수에 실제 값이 저장되는 것이 아닌 메모리에 있는 실제 값의 주소가 저장됩니다.
> -   따라서, const로 선언된 참조 타입 변수는 재할당이 불가능하지만, 해당 주소가 가리키는 메모리 공간의 내용은 변경이 가능합니다.

```javascript
const person = {
    name: 'iamkanguk',
    age: 29
};

person.age = 30;
console.log(person);

person.city = 'Seoul';
console.log(person);

const arr = [10, 20, 30];
arr[0] = 50;
console.log(arr);

person = { name: 'iam!!' }; // ERROR!
```

**이러한 작동 방식이 유연하다고 생각할 수 있지만, 객체의 불변성을 지켜주지 못한다는 단점이 있습니다.** 이러한 문제점을 해결하기 위해서 `Object.freeze()` 와 `Object.seal()` 이 있습니다.

## Object.freeze()

> [!NOTE]
>
> -   개발자가 생성한 상수 객체를 고정합니다.
> -   만약, 객체에 접근해서 수정하지 못하도록 하고 싶다면 해당 메서드를 사용하는게 좋을 것 같습니다.

```javascript
const obj = {
    a: 1
};

Object.freeze(obj);

obj.a = 2;
obj.b = 100;

console.log(obj.a); // 1
console.log(obj.b); // undefined
```

## Object.seal()

> [!NOTE]
>
> -   `Object.freeze()` 와 다르게 객체의 프로퍼티 수정만 가능합니다.

```javascript
const obj = {
    a: 1
};

Object.seal(obj);

obj.a = 2;
obj.b = 100;

console.log(obj.a); // 2
console.log(obj.b); // undefined
```

## 공통점과 차이점 정리, 그리고 결함

### 공통점

-   전달된 객체들은 확장할 수 없게 되었기 때문에 새로운 속성을 추가할 수 없습니다.
-   전달된 객체 내부의 모든 요소들은 구성 불가능하게 되어 삭제할 수 없습니다.

### 차이점

-   Object.seal은 프로퍼티를 수정할 수 있습니다.
-   하지만 Object.freeze는 프로퍼티를 수정할 수 없습니다.

### 결함

```javascript
const obj = {
    a: {
        b: 1
    }
};

Object.freeze(obj);

console.log(obj.a); // { b: 1 }

obj.a.b = 2;
console.log(obj.a); // { b: 2 }
```

위 코드와 같이, 중첩된 객체에서는 값이 변하고 있습니다. 이런 경우는 `Object.freeze()`를 사용해도 불변성을 보장받지 못합니다.<br/>
이런 경우는 어떻게 객체를 완전하게 얼려야 할까요?

```javascript
function deepFreeze(object) {
    // 객체에 정의된 속성명을 추출
    const propNames = Object.getOwnPropertyNames(object);

    // 스스로를 동결하기 전에 속성을 동결
    for (let name of propNames) {
        let value = object[name];

        object[name] = value && typeof value === 'object' ? deepFreeze(value) : value;
    }

    return Object.freeze(object);
}
```

재귀적으로 내부 객체까지 freeze를 적용해주는 함수입니다.

```javascript
function deepFreeze(object) {
    // 객체에 정의된 속성명을 추출
    var propNames = Object.getOwnPropertyNames(object);

    // 스스로를 동결하기 전에 속성을 동결
    for (let name of propNames) {
        let value = object[name];

        object[name] = value && typeof value === 'object' ? deepFreeze(value) : value;
    }

    return Object.freeze(object);
}

const obj = {
    a: {
        b: 1
    }
};

deepFreeze(obj);

console.log(obj.a); // { b: 1 }

obj.a.b = 2;
console.log(obj.a); // { b: 1 }
```

조금 다른 버전으로는 아래와 같이 작성할 수 있을 것 같습니다.<br/>
어떤 분은 `Object.isFrozen()`을 사용하셨네요!

```javascript
export const deepFreeze = object => {
    Object.keys(object).forEach(prop => {
        if (typeof object[prop] === 'object' && !Object.isFrozen(object[prop])) {
            deepFreeze(object[prop]);
        }
    });
    return Object.freeze(object);
};
```

---

## References

-   [Object.freeze vs Object.seal - 불변성과 관련된 두 가지 네이티브 메서드](https://ui.toast.com/posts/ko_20220420)
-   [Object.freeze는 정말 얼려줄까?](https://velog.io/@brgndy/Object.freeze%EB%8A%94-%EC%A0%95%EB%A7%90-%EC%96%BC%EB%A0%A4%EC%A4%84%EA%B9%8C)
-   [Object.freeze와 Object.seal은 무엇인가?](https://velog.io/@muman_kim/Object.freeze%EC%99%80-Object.seal%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
