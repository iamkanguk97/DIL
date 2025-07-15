# HTTP Module

NestJS에서는 `HttpModule`을 제공하는데, 이는 Axios 기반의 모듈입니다. HttpModule을 가지고 외부 서비스와 통신하고 결과값은 RxJS의 `Observable`을 받습니다.

하지만 꼭 HttpModule을 사용하지 않아도 됩니다. 직접 Node.js HTTP 클라이언트 라이브러리인 `got`이나 `undici`를 사용해도 무방합니다.

## Installation

```
npm i --save @nestjs/axios axios
```

## Started

```ts
@Module({
    imports: [HttpModule],
    providers: [CatsService]
})
export class CatsModule {}

@Injectable()
export class CatsService {
    constructor(private readonly httpService: HttpService) {}

    findAll(): Observable<AxiosResponse<Cat[]>> {
        return this.httpService.get('URL');
    }
}
```

-   생성자 주입을 통해서 `HttpService`를 주입합니다. 이 때 HttpModule과 HttpService는 `@nestjs/axios` 패키지에서 가져옵니다.
-   그리고 `AxiosResponse`는 `@nestjs/axios`가 아닌 `axios` 패키지에서 가져옵니다.
-   HttpService의 응답 타입은 Observable로 래핑되어 있습니다.

## Configuration

> [Axios github](https://github.com/axios/axios#request-config)

-   위 링크에서 axios 요청에 대한 옵션들을 확인할 수 있습니다.
-   `register` 메서드를 통해서 직접 HttpModule을 import 할 때 옵션을 넣어줄 수 있습니다.
-   만약 모듈의 옵션을 정적으로 전달하는 대신 비동기적으로 전달하고 싶다면 `registerAsync` 메서드를 사용하면 된다. 대표적인 기법으로는 팩토리 함수 사용하는 것과 클래스 사용이 있습니다.

### Factory function

팩토리 함수는 비동기적일 수 있고, `inject`를 통해서 종속성을 주입할 수 있습니다.

```ts
HttpModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS')
    }),
    inject: [ConfigService]
});
```

### Class

HttpModule 내에 HttpConfigService를 인스턴스화하고 옵션 객체를 생성하는데 사용합니다. 이 때 HttpConfigService는 HttpModuleOptionsFactory 라는 인터페이스를 구현해야 합니다.

```ts
HttpModule.registerAsync({
    useClass: HttpConfigService
});

@Injectable()
class HttpConfigService implements HttpModuleOptionsFactory {
    createHttpOptions(): HttpModuleOptions {
        return {
            timeout: 5000,
            maxRedirects: 5
        };
    }
}
```

만약, HttpModule 내에서 개인 복사본을 만들지 않고 기존의 옵션 프로바이더를 재사용하려면 `useExisting` 옵션을 사용할 수 있습니다.

```ts
HttpModule.registerAsync({
    imports: [ConfigModule],
    useExisting: HttpConfigService
});
```

## Full Example

```ts
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class CatsService {
    private readonly logger = new Logger(CatsService.name);
    constructor(private readonly httpService: HttpService) {}

    async findAll(): Promise<Cat[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<Cat[]>('http://localhost:3000/cats').pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error.response.data);
                    throw 'An error happened!';
                })
            )
        );
        return data;
    }
}
```

Observable을 처리하기 위해서는 `RxJS`의 `firstValueFrom` 또는 `lastValueFrom` 메서드를 사용해서 요청의 데이터를 Promise 형태로 가져올 수 있습니다.
