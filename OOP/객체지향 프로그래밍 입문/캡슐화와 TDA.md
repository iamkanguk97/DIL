# 캡슐화와 TDA (Encapsulation and Tell, Don't Ask)

`TDA`는 **특정 객체에게 데이터를 요구하지 말고, 객체에게 일을 시키라는 의미**로 해석할 수 있습니다.<br/>
TDA 라는 용어가 탄생한 이유는 캡슐화가 잘 이루어진 설계를 하기 위해서입니다.

쉬운 이해를 위해 예시와 함께 이야기를 해보면 좋을 것 같습니다.

## 예시 1 (강의 외부 예시)

```ts
class User {
    public email: string;
    public age: number;
    public createdAt: Date;
}

doSomething(user: User) {
    if (user.age < 20) {
        throw new Error('Invalid User!');
    }

    // 다른 로직 수행
}
```

어떤 비즈니스 로직을 수행할 때 **사용자의 나이가 20살 아래면 오류가 발생해야 한다는 요구사항**이 있어서 위와 같이 구현했습니다.<br/>
그런데 요구사항이 바뀌어서 **20살 아래 + 이메일을 gmail을 사용해야 한다는 조건**이 추가되었습니다.<br/>
(20살 아래이고 gmail을 사용한다면 에러가 발생합니다)

```ts
doSomething(user: User) {
    if (user.age < 20 && !user.email.endsWith('gmail.com')) {
        throw new Error('Invalid User!');
    }

    // 다른 로직 수행
}
```

이런 성격의 소스코드는 분명 다른 서비스 코드에서 사용할 가능성이 매우 높습니다.<br/>
그렇게 되면 해당 부분들을 모두 찾아서 수정해야 합니다.

만약 매 주마다 조건이 변경된다면 어떻게 해야할까요?<br/>
해당 부분들을 항상 찾아서 수정해야 할겁니다.

**위와 같은 문제가 캡슐화가 되어있지 않으면 발생하는 문제입니다.**

> [!IMPORTANT]
>
> -   User 객체가 캡슐화가 되어있지 않기 때문에 User 데이터에 직접 접근하는 코드를 작성할 수 있습니다.
> -   요구사항의 변화가 User의 데이터/사용에 변화를 주게 되면 해당 데이터에 접근하는 모든 코드에 영향을 주게 됩니다.

### TDA 원칙 적용

지금 위의 소스코드에서 객체에게 데이터를 요구하는 부분은 age와 email에 직접 접근하는 부분입니다. 만약, TDA 원칙을 통해서 올바른 캡슐화가 이루어진 User 객체라면 자신의 데이터를 외부에 공개하지 않고 데이터를 이용해서 필요한 정보를 외부에 알려줄 수 있어야 합니다.

```ts
class User {
    private email: string;
    private age: number;
    private createdAt: Date;

    isValid() {
        return (
            this.age >= 20 &&
            this.email.endsWith('gmail.com')
        );
    }
}

doSomething(user: User) {
    if (!user.isValid()) {
        throw new Error('Invalid User!');
    }

    // 다른 로직 수행
}
```

`isValid` 라는 메서드를 적용하면서 User 객체는 해당 객체를 사용하는 부분에 필요한 기능(메세지)을 제공하고 상세 구현을 감추게 됩니다.<br/>
그리고, 사용자가 유효한지 검사하는 로직이 변경되더라도, isValid 메서드만 수정하면 적용이 가능하기 때문에 보다 효율적입니다.

## 예시2 (강의 내 예시)

```ts
enum AuthResult {
    NO_MATCH = 'NO_MATCH',
    NO_EMAIL_VERIFIED = 'NO_EMAIL_VERIFIED',
    SUCCESS = 'SUCCESS'
}

enum VerificationEmailStatus {
    NO = 1,
    YES = 2
}

class Member {
    private id!: string;
    private password!: string;
    private name!: string;
    private age!: number;
    private verificationEmailStatus!: VerificationEmailStatus;

    constructor(
        id: string,
        password: string,
        name: string,
        age: number,
        verificationEmailStatus: VerificationEmailStatus
    ) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.age = age;
        this.verificationEmailStatus = verificationEmailStatus;
    }

    static findOneMember(id: string): Member | null {
        const result = MEMBERS.find((member) => member.id === id);
        return result ?? null;
    }

    // getVerificationEmailStatus(): VerificationEmailStatus {
    //     return this.verificationEmailStatus;
    // }

    getPassword(): string {
        return this.password;
    }

    getId(): string {
        return this.id;
    }

    isEmailVerified(): boolean {
        return this.verificationEmailStatus === VerificationEmailStatus.YES;
    }
}

class Test {
    authenticate(id: string, pw: string): AuthResult {
        const member = Member.findOneMember(id);
        if (!member) {
            return AuthResult.NO_MATCH;
        }

        // Tell, Don't Ask -> 물어봐서 가져오는 중이기 때문에 변경
        // if (member.getVerificationEmailStatus() !== VerificationEmailStatus.YES) {
        //     return AuthResult.NO_MATCH;
        // }
        if (!member.isEmailVerified()) {
            return AuthResult.NO_EMAIL_VERIFIED;
        }

        if (PasswordEncoder.isPasswordValid(member.getPassword(), pw, member.getId())) {
            return AuthResult.SUCCESS;
        }

        return AuthResult.NO_MATCH;
    }
}

class PasswordEncoder {
    static isPasswordValid(memberPassword: string, password: string, id: string): boolean {
        // 로직 수행
        return true;
    }
}

/**
 * 멤버들 정보
 */
const MEMBERS: Member[] = [
    new Member('1', 'password1', '이강욱', 29, VerificationEmailStatus.NO),
    new Member('2', 'password2', '이상운', 31, VerificationEmailStatus.YES),
    new Member('3', 'password3', '백효석', 26, VerificationEmailStatus.NO)
];
```

`getVerificationEmailStatus` 메서드를 제거하고 이메일이 유효한지 검증하는 로직을 `Member` 클래스 내부로 캡슐화를 진행했습니다.

## 예시3 (강의 내 예시)

```ts
class Movie {
    static REGULAR: number = 0;
    static NEW_RELEASE: number = 1;

    private priceCode!: number;

    getPriceCode(): number {
        return this.priceCode;
    }

    getFrequentRenterPoints(daysRented: number): number {
        if (this.priceCode === Movie.NEW_RELEASE && daysRented > 1) {
            return 2;
        } else {
            return 1;
        }
    }
}

class Rental {
    private movie!: Movie;
    private daysRented!: number;

    getFrequentRenterPoints(): number {
        if (this.movie.getPriceCode() === Movie.NEW_RELEASE && this.daysRented > 1) {
            return 2;
        } else {
            return 1;
        }
    }

    _getFrequentRenterPoints(): number {
        return this.movie.getFrequentRenterPoints(this.daysRented);
    }
}
```

-   `Rental` 클래스의 `getFrequentRenterPoints` 메서드 내의 구현 전체를 캡슐화를 진행했습니다.
-   `Movie`의 `priceCode`는 Movie가 제일 잘 알고 있는 데이터이기 때문에 `Rental` 클래스에서 하는 것 보다 `Movie` 클래스에서 하는 것이 적합하다고 판단하기 때문입니다.

## 예시4 (강의 내 예시)

```ts
enum UnitType {
    MILLISECOND = 'MILLISECOND',
    NANO = 'NANO'
}

class Timer {
    private startTime!: number;
    private endTime!: number;

    start(): void {
        this.startTime = new Date().getTime();
    }

    stop(): void {
        this.endTime = new Date().getTime();
    }

    elapsedTime(unit: UnitType): number {
        switch (unit) {
            case UnitType.MILLISECOND:
                return this.endTime - this.startTime;
            case UnitType.NANO:
                return (this.endTime - this.startTime) / 1000;
        }
    }
}

const t = new Timer();

t.start();

// 로직 수행

t.stop();

const betweenTime = t.elapsedTime(UnitType.MILLISECOND);
```

-   `Timer` 클래스로 캡슐화를 진행했습니다.
-   위와 같은 코드는 만약에, UnitType에 다른 타입을 추가해서 그걸 사용한다고 하면 타입만 추가해주면 메인 코드에 변경 사항이 최소화됩니다.
