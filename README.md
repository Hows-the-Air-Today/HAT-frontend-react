<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=react query&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/Recoil-007AF4?style=flat&logo=Recoil&logoColor=white"> <img src="https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white">

# HAT-frontend-react

대기 정보 조회 및 지역별 커뮤니티 웹 서비스 (`React Project)

## React Application Structure

![image](https://user-images.githubusercontent.com/70932170/230726903-a768389a-48a1-48a1-bfe7-41c046f52aeb.png)

```java
├──📂 public                    // 컴파일 시 필요하지 않은 요소 보관(정적 파일 보관)
│   ├──📂 font                  // 폰트 파일
│   └──📂 images                // 이미지 파일
└──📂 src                       // 컴파일 시 필요한 요소 보관
    ├──📂 api                   // API 관련 파일
    ├──📂 assets                // 컴포넌트 안에서 사용하는 정적 파일 보관(이미지, 비디오, Json 파일 등의 미디어 파일)
    │   └──📂 images            // 이미지 파일
    ├──📂 components            // 컴포넌트 관리(Atomic Design 기반)
    │   ├──📂 pages             // 페이지 단위의 컴포넌트(template의 인스턴스)
    │   ├──📂 templates         // 실제 콘텐츠가 없는 page 수준의 스켈레톤(와이어 프레임), 여러 개의 organism, molecule로 구성)
    │   └──📂 UI
    │       ├──📂 atoms         // 더 이상 분해할 수 없는 기본 컴포넌트(button, input, label 등)
    │       ├──📂 molecules     // 여러 개의 atom을 결합한 컴포넌트(단일 책임 원칙)
    │       └──📂 organisms     // 명확한 영역과 특정 컨텍스트를 가진 컴포넌트(header 등)
    ├──📂 config                // 환경설정 관련 파일
    ├──📂 hoc                   // 커스텀 훅 파일
    ├──📂 interface             // 컴포넌트 인터페이스 정의
    ├──📂 services              // JavaScript 모듈 관리
    ├──📂 stores                // 상태 관리 시 필요한 모듈 관리
    ├──📂 stories               // 스토리북 컴포넌트
    ├──📂 styles                // css 파일
    ├──📂 types                 // TypeScript 사용 시 필요한 타입 정의
    └──📂 utils                 // 상수, 공통 함수 등 유틸 관련 파일
```