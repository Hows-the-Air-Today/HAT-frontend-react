# Node.js 버전 18.12.1-alpine 이미지 사용
FROM node:18.12.1-alpine

# 컨테이너 내부의 /app 디렉토리 생성
WORKDIR /app

# 루트 디렉토리의 package.json을 컨테이너 내부 /app 디렉토리에 복사
COPY package.json .

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 Working 디렉토리에 복사
COPY . .

# 패키지 매니저(yarn)를 이용해 image layer에 의존성 설치
RUN yarn install

# serve 패키지 전역 설치
RUN yarn global add serve

# 3000번 포트 오픈
EXPOSE 3000

# 컨테이너 시작 시 서버 실행 명령
CMD ["serve", "-s", "build", "-l", "3000"]
