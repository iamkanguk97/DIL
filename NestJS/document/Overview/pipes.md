# Pipes

> [!NOTE]
>
> - Pipe는 Injectable 데코레이터를 적용해야 하며, `PipeTransform` 인터페이스를 구현해야 합니다.
> - 주로 Transformation(변환)과 Validation(유효성 검사)에 사용됩니다.

- Pipe는 Controller Route Handler가 처리하는 인수에 대해 작동합니다. 메서드가 호출되기 직전에 Pipe를 주입하면서 메서드로 전달될 인수를 받아서 처리합니다.
- 변환과 유효성 검사 모두 이루어지고 Pipe가 적용되고 난 후의 인수를 가지고 Route Handler가 수행됩니다.

## Built-in Pipes

ValidationPipe, ParseIntPipe 등 다양한 내장 파이프들이 있습니다. 이는 `@nestjs/common` 패키지에 포함되어 있습니다.

```ts
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

위와 같이 사용할 수 있습니다. 자세한 설명은 공식문서를 참고하시면 될 것 같습니다.

## Custom Pipes

```ts
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

- `PipeTransform<T, R>` 인터페이스는 모든 파이프가 필수적으로 구현해야 하는 인터페이스입니다.
    - `T`는 입력 값의 유형을 나타냅니다.
    - `R`은 `transform` 메서드의 반환 타입을 나타나는데 사용합니다.
- `transform` 메서드는 `value`와 `metadata`를 인수로 받습니다.
    - `value`: 현재 처리중인 메서드 인수
    - `metadata`: 현재 처리중인 메서드 인수에 대한 메타데이터
        - 크게 `type`, `metatype`, `data` 프로퍼티를 가집니다.
        - 자세한 내용은 공식문서를 참고하면 됩니다.