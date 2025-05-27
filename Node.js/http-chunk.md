# Node.js 내장 HTTP 모듈의 응답 데이터 처리

Framework 없이 Node.js를 가지고 HTTP 서버를 구현하는 방법을 조사하는 중에, `Axios`와 같은 서드파티 라이브러리를 활용해서 외부로부터 데이터를 받는 방법과 다르다는 것을 확인했습니다. 몰랐던 부분이라고 생각하여 기록을 해보려고 합니다.

## 요약

> -   **Node의 내장 HTTP 모듈은 Stream 형식의 데이터를 Chunk화 해서 처리합니다. 따라서 이벤트 리스너 메서드를 사용해서 응답을 받아옵니다.**
> -   **요즘은 Axios와 같은 서드파티 라이브러리를 사용합니다. Axios를 예로 들면 내부에서도 HTTP 모듈을 사용하고 있기 때문에 마찬가지로 Stream 형식의 데이터를 Chunk화 해서 처리합니다.**

## 실제 사용 사례

> **Node.js 내부 HTTP 모듈을 활용한 소스코드는 다음과 같습니다.**

```javascript
import http from 'http';

const request = http.get('외부API URL', response => {
    let data = '';

    // 해당 부분!
    response.on('data', chunk => {
        data += chunk;
    });

    response.on('end', () => {
        try {
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    });
});
```

> **Axios를 활용한 소스코드는 다음과 같습니다.**

```javascript
import axios from 'axios';

axios
    .get('외부API URL')
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });
```

## Node HTTP는 왜 이런 방식으로 소스코드를 작성해야 하는가?

> -   https://nodejs.org/api/http.html#class-httpclientrequest
> -   https://velog.io/@seungsang00/HTTP-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EA%B3%BC-Node.js%EC%9D%98-http-%EB%AA%A8%EB%93%88

-   `http.IncomingMessage` 가 `ReadableStream` 인터페이스를 상속받고 있습니다.<br/>
-   **ReadableStream 인터페이스는 Stream 형식의 데이터를 받아야 하기 때문에 Node의 내장 모듈인 http를 사용하게 되면 `on`과 같은 이벤트 리스너 메서드를 사용해서 응답값을 받아야 합니다.**

## Axios는 내부에서 어떻게 처리하는가?

> -   https://github.com/axios/axios/blob/v1.x/lib/adapters/http.js
> -   https://github.com/axios/axios/blob/v1.x/lib/defaults/index.js

확인해보니 Axios도 내부에서 `http` 모듈을 사용하는 것 같습니다.<br/>
참고로, axios를 사용하게 되면 `responseType`을 설정할 수 있습니다.

```javascript
import axios from 'axios';

const response = await axios.get('', { responseType: 'json' });

/**
 * responseType
 * - json (default)
 * - stream
 * - text
 * - arraybuffer
 * - blob
 * 등..
 */
```

`responseType`을 `json`으로 설정하면 내부적으로 Stream 형식의 데이터를 받아서 처리하는 것이 아니지 않냐? 고 생각할 수 있지만 그렇지 않습니다.<br/>
**axios 공식 GitHub Repository를 보면 결국 모든 부분이 Stream 데이터를 이벤트 리스너로 처리하도록 되어있습니다.**

또한 `responseType`이 `json`인 경우에는 `transformResponse` 파이프라인을 통해서 `JSON.parse`를 수행한다는 것을 볼 수 있습니다.

---

## References

-   https://github.com/axios/axios/blob/v1.x/lib/adapters/http.js
-   https://github.com/axios/axios/blob/v1.x/lib/defaults/index.js
-   https://nodejs.org/api/http.html#class-httpclientrequest
-   https://velog.io/@seungsang00/HTTP-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EA%B3%BC-Node.js%EC%9D%98-http-%EB%AA%A8%EB%93%88
