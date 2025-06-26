# OCP(Open-Closed Principle): 개방-폐쇄 원칙

## 목차

1. [확장에 열려있다 vs 변경에 닫혀있다](#확장에-열려있다-vs-변경에-닫혀있다)
    - [확장에 열려있다](#확장에-열려있다)
    - [변경에 닫혀있다](#변경에-닫혀있다)
2. [OCP 원칙 위반 예제](#ocp-원칙-위반-예제)
3. [이를 수정해보기](#이를-수정해보기)
4. [장점](#장점)
5. [References](#references)

> [!NOTE]
>
> -   개방-폐쇄 원칙은 기존의 코드를 변경하지 않으면서, 기능을 추가할 수 있도록 설계가 되어야 한다는 원칙을 의미합니다.
> -   확장(새로운 기능의 추가)에 대해서는 개방적이고 수정에 대해서는 폐쇄적이어야 합니다.

## 확장에 열려있다 vs 변경에 닫혀있다

### 확장에 열려있다

-   모듈의 확장성을 보장하는 것을 의미합니다.
-   새로운 변경 사항이 발생했을 때 유연하게 코드를 추가하면서 애플리케이션의 기능을 큰 힘을 들이지 않고 확장할 수 있습니다.

### 변경에 닫혀있다

-   객체를 직접적으로 수정하는건 제한해야 합니다.
-   새로운 변경사항이 발생했을 때 객체를 직접적으로 수정해야 한다면 유연하게 대응할 수 없는 애플리케이션입니다.
-   이는 유지보수의 비용 증가로 이어지게 됩니다.

**OCP는 다형성과 확장을 가능하게 하는 객체지향의 장점을 극대화하는 설계 원칙입니다.**

## OCP 원칙 위반 예제

```typescript
type NotificationType = 'email' | 'sms';

class Notifier {
    public send(type: NotificationType, message: string): void {
        if (type === 'email') {
            this.sendEmail(message);
        } else if (type === 'sms') {
            this.sendSms(message);
        }

        // 이후에 새로운 통지방식이 추가된다면? (ex. Slack 등)
        // send 메서드를 수정해야 한다 -> OCP 위반
    }

    private sendEmail(message: string): void {
        // 이메일 전송 로직
    }

    private sendSms(message: string): void {
        // SMS 전송 로직
    }
}

const notifier = new Notifier();
notifier.send('email', 'Hello, world!');
notifier.send('sms', 'Hello, world!');
```

기획팀으로부터 통지방식에 `Slack`, `Discord`와 같은 플랫폼을 추가해달라는 요청이 들어왔습니다. 그러면 우리는 소스코드를 수정해야 하는데 어쩔 수 없이 `send` 메서드를 수정해야 합니다. 이런 경우를 `OCP 위반` 이라고 합니다.

## 이를 수정해보기

개발자는 이러한 잘못된 설계를 고쳐나갈 수 있어야 한다고 생각합니다.

위에서 언급했다시피, 확장에는 열려있고 수정에는 닫혀있도록 설계해야 합니다.<br/>
이런 목표를 달성하기 위해서는 **추상화(인터페이스)와 다형성**을 활용할 수 있습니다.

```typescript
interface Notifier {
    send(message: string): void;
}

class EmailNotifier implements Notifier {
    send(message: string): void {
        // 이메일 전송 로직
    }
}

class SmsNotifier implements Notifier {
    send(message: string): void {
        // SMS 전송 로직
    }
}

class SlackNotifier implements Notifier {
    send(message: string): void {
        // Slack 전송 로직
    }
}

class NotificationService {
    private notifier: Notifier;

    constructor(notifier: Notifier) {
        this.notifier = notifier;
    }

    public notify(message: string): void {
        this.notifier.send(message);
    }
}

const emailService = new NotificationService(new EmailNotifier());
emailService.notify('이메일!!');

const smsService = new NotificationService(new SmsNotifier());
smsService.notify('SMS!!');

const slackService = new NotificationService(new SlackNotifier());
slackService.notify('Slack!!');
```

변경(확장)될 것과 변하지 않을 것을 엄격히 구분해서 `interface`를 생성했습니다.<br/>
**모든 통지방식은 "전달"이라는 공통의 동작방식이 있습니다.** <br/>
그래서 `Notifier` 라는 모든 통지방식이 준수해야하는 인터페이스를 정의했습니다.

그리고 각 통지방식은 이 Notifier를 구현(상속)하도록 하면 따로 `NotificationService`를 수정할 필요가 없어집니다.

## 장점

-   확장성
    -   새로운 통지방식을 추가하고 싶으면 단순히 `Notifier` 인터페이스를 구현하는 새로운 클래스를 만들고 `NotificationService`에 주입하면 됩니다.
    -   NotificationService를 수정할 필요가 없습니다.
-   유지보수성
    -   각 통지 방식이 해당 클래스 내부에 캡슐화되어 있습니다.
    -   특정 통지 방식의 로직이 변경되어도 다른 통지 방식이나 `NotificationService`에 영향을 주지 않습니다.
-   테스트 용이성
    -   각 `Notifier` 구현체를 개별적으로 테스트할 수 있습니다.
    -   `NotificationService`도 Mocking `Notifier`를 주입해서 쉽게 테스트할 수 있습니다.

---

## References

-   [완벽하게 이해하는 OCP (개방 폐쇄 원칙)](https://inpa.tistory.com/entry/OOP-%F0%9F%92%A0-%EC%95%84%EC%A3%BC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-OCP-%EA%B0%9C%EB%B0%A9-%ED%8F%90%EC%87%84-%EC%9B%90%EC%B9%99)
