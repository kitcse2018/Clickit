# 창의융합종합설계1 프로젝트<br>
**생활관 시설물 예약 시스템**

README.md 개요  
1. commit 주의사항
2. branch 사용법
3. git clone 파일이 안 보일 경우 해결 방법
4. npm install 오류 해결 코드

<br>

---

## **1. commit 주의사항**
1. commit에 대하여 종류 명시<br>
  └ create : js, css등 파일을 생성의 경우<br>
  └ update : function이나 component 내부를 변경한 경우<br>
  └ delete : js, css등 파일을 삭제한 경우<br>
  └ edit : 오탈자나 update에 준하지 않는 소소한 변경의 경우<br>
  └ e.t.c : 기타의 경우
  
2. target file 명시<br>
```
  ex)
  create : example.js
```
3.  datail 명시<br>
```
  ex)
  update : example.js change exampleFunction logic
```
4. 변경 사항이 여러가지일 경우<br>
```
  ex)
  create
  - example1.js
  - example2.js
  
  update
  - example1.js : change exampleFunction logic
```
<br>

---

## **2. Branch 사용법**<br>
새로운 페이지 생성할 경우 Branch를 사용하여 따로 생성<br>
    └ 원격 origin/master에서 새로운 Branch 생성 

새로운 Branch의 경우 페이지 이름으로 네이밍

페이지 완성한 다음 origin/master에 merge
<br>

![image](https://user-images.githubusercontent.com/67218734/201326208-669aac73-00fd-4c7a-8ed2-666956972aa6.png)

![image](https://user-images.githubusercontent.com/67218734/201326308-0ccea3e1-e0cb-4c10-bc2b-a4e958ea340e.png)

<br>

**Branch merge 방법**
1. 원격 브랜치의 origin/master를 checkout
2. master에 example branch를 병합 선택
3. 브랜치가 서로 병합된 상태에서 push

![image](https://user-images.githubusercontent.com/67218734/202200670-7cda909d-f80a-41b4-8399-6a17ca4b4479.png)


![image](https://user-images.githubusercontent.com/67218734/202200543-2b1c0bd3-c3d6-4ec5-adb8-5da1fdad5bbf.png)


---

## **3. git clone 한 다음 프로젝트에서 파일이 안 보일 경우**
![image](https://user-images.githubusercontent.com/67218734/201525954-1d425e9e-8603-4508-b2f4-1694a1f5c027.png)

위 화면과 같이 보일 경우 해결 절차
1. 윈도우 탐색기에서 해당 프로젝트가 있는 폴더를 연다.
2. 프로젝트 내부의 .idea 폴더를 삭제한다.
3. IDE를 재시작한다.
4. 우측 하단 npm install 실행 또는 오류 해결 코드 실행

<br>

---

## **4. npm install 오류 해결 코드**
```
npm install react-paypal-express-checkout --save --legacy-peer-deps
```
<br>
