창의융합종합설계1 프로젝트<br>
생활관 시설물 예약 시스템


## **commit 주의사항**
1. commit에 대하여 종류 명시<br>
  └ create : js, css등 파일을 생성의 경우<br>
  └ update : function이나 component 내부를 변경한 경우<br>
  └ delete : js, css등 파일을 삭제한 경우<br>
  └ edit : 오탈자나 update에 준하지 않는 소소한 변경의 경우<br>
  └ e.t.c : 기타의 경우
  
2. target file 명시<br>
  ex) create : example.js

3.  datail 명시<br>
  ex) update : example.js change exampleFunction logic

4. 변경 사항이 여러가지일 경우<br>
```
  create
  - example1.js
  - example2.js
  
  update
  - example1.js : change exampleFunction logic
```
---

## **Branch 사용**<br>
새로운 페이지 생성할 경우 Branch를 사용하여 따로 생성<br>
    └ 원격 origin/master에서 새로운 Branch 생성 

새로운 Branch의 경우 페이지 이름으로 네이밍

페이지 완성한 다음 origin/master에 merge
