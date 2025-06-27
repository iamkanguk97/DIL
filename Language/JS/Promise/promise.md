# JavaScript Promise

> 해당 파일은 [자바스크립트 개발자라면 알아야 할 33가지 개념 25. 자바스크립트 바보를 위한 Promise](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-25-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%EfmfD%8A%B8-%EB%B0%94%EB%B3%B4%EB%A5%BC-%EC%9C%84%ED%95%9C-Promise)를 적극적으로 참고한 내용입니다.

## 서론

```
우리는 아이라고 가정하겠습니다. 어머니가 스마트폰을 다음주에 사주기로 약속을 해주셨습니다.
당연히 저희는 스마트폰을 어머니로부터 받을수 있을지 없을지 장담할 수 없습니다.
제가 사고치면 어머니는 당연히 스마트폰을 안사주실 것 같거든요.

이런 상태를 Promise라고 할 수 있습니다.
```

Promise는 크게 3가지 상태를 가질 수 있습니다.

-   `Pending(미결)`: 스마트폰을 가질수 있을지 알 수 없는 상황
-   `Fulfilled(이행)`: 어머니가 기분이 좋아서 스마트폰을 사주신 상황
-   `Rejected(거절)`: 어머니가 기분이 안좋아서 스마트폰을 사주지 않은 상황

```javascript
let isMommyHappy = false;

const willIGetNewPhone = new Promise((resolve, reject) => {
    if (isMommyHappy) {
        resolve('스마트폰 사줌');
    } else {
        reject('스마트폰 사주지 않음');
    }
});

willIGetNewPhone
    .then((fulfilled) => {
        console.log(fulfilled);
    })
    .catch((rejected) => {
        console.log(rejected);
    });
```

## Promise Chaining

> 위의 상황에서 아이가 스마트폰을 받았을 때 친구들한테 자랑하는 로직을 추가해보겠습니다.

```javascript
const talkToFriend = (phone) => {
    const message = `나 ${phone} 스마트폰 받았다!`;
    return Promise.resolve(message);
};

willIGetNewPhone
    .then(talkToFriend)
    .then((fulfilled) => {
        console.log(fulfilled);
    })
    .catch((rejected) => {
        console.log(rejected);
    });
```

## JavaScript는 기다려주지 않는다

```javascript
console.log('Before');

willIGetNewPhone
    .then(talkToFriend)
    .then((fulfilled) => {
        console.log(fulfilled);
    })
    .catch((rejected) => {
        console.log(rejected);
    });

console.log('After');
```

위 소스코드의 실행결과는 다음과 같습니다.

-   "Before"
-   "After"
-   "나 스마트폰 받았다!"

> [!IMPORTANT]
>
> -   어머니가 스마트폰을 사주겠다고 약속한 순간을 생각해봅시다. 우리는 그러면 아무것도 안하고 스마트폰만 기다릴까요? 그렇지 않습니다.
> -   그 동안 밀린 숙제도 하고 나가서 친구들이랑 놀 수 있습니다.
> -   이런 상황을 **비동기(Asynchronous)**라고 합니다.
> -   소스코드(Promise)는 어떤 방해나 기다림 없이 돌아가고 있습니다.

## Promise가 필요한 이유는 무엇일까?
