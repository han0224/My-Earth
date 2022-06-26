# 🌏 My Earth 

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=Three.js&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> 

바로가기 [my earth](https://62b85ade3cacc200091dc7ef--dynamic-cannoli-c2d1ae.netlify.app/user)

## 소개
next.js 와 node.js 를 이용하여 내가 공부할 때 사용할려고 만들고 있는 사이트
- 공부시간을 측정할 수 있는 기능과 잔잔한 음악이 계속 재생
- TODO 리스트가 있어 오늘 공부할 것을 정리할 수 있음

## 시작화면
![기본](https://user-images.githubusercontent.com/70616579/175819405-d51ed84c-d896-48c3-a03b-367213786947.png)

### 현재 구현 완료
- 왼쪽의 TODO 리스트는 로그인 이후 사용이 가능
- TODO 리스트는 생성, 삭제, 완료 가능
- TODO 리스트 접기 가능
- 가운데의 지구모양은 Three.js 를 이용하여 구현
- 지구 아래 타이머는 지구모양 위에 있는 시작버튼을 누르면 시작
- 멈추고 싶으면 시작버튼이 있었던 위치를 누르면 됨
- 타이머 아래의 뮤직 플레이어는 볼륨 조절, 다음곡 이전곡으로 이동 가능
- 뮤직 플레이어는 기본적으로 다음곡 자동 재생

### 구현 예정
- 로그인 하기 이전에는 TODO 리스트위에 로그인을 부탁한다는 글귀 생성
- 글자 크기 조정
- 뮤직 플레이어 위치 조정 및 전체적인 디자인 조정
- 반응형으로

## 유저 창
![유저](https://user-images.githubusercontent.com/70616579/175819402-4ef5c2df-2aff-47b9-bf4b-b93409ce9859.png)

### 현재 구현 완료
- 1년 단위로 공부한 시간이 보임
- 자신이 총 공부한 시간, 이름, 이메일 보임
- 뮤직 플레이어 계속 유지
- 타이머시간 계속 유지
- 절반 정도의 화면일 경우 그래프 안보임

### 구현 예정
- 시간 별로 그래프 색상 변경
- 이미지 변경
- 중앙 구분선 디자인
- 일주일 단위로 공부 시간 표현(정말로 필요할지 좀 더 고민)
