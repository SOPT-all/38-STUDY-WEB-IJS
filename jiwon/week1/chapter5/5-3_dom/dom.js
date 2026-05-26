// innerText, textContent 차이
const divTestInnerContent = document.getElementById(
  "test-innerhtml-textcontent",
);
console.log(divTestInnerContent.innerText); // => 안숨겨진 글자 (css 포함 & 태그를 줄바꿈으로 인식하는 등 사람이 읽기 좋게 다듬어서 반환)
console.log(divTestInnerContent.textContent); // => 숨겨진 글자 안숨겨진 글자 (소스 코드에 적힌 그대로 연속된 공백이나 줄바꿈 문자를 모두 포함하여 반환)

// previous / previousElement / next / nextElement Sibling 차이
const divTestPrevNext = document.getElementById("test-check-prev-next-sibling");
const currNode = divTestPrevNext.querySelector(".curr");
console.log(`previousSibling: ${currNode.previousSibling.textContent}`); // => 공백(태그 간 줄바꿈)
console.log(
  `previousElemSibling: ${currNode.previousElementSibling.textContent}`,
); // => "prevSibling/prevElemSibling"
console.log(`previousSibling: ${currNode.nextSibling.textContent}`); // => 공백(태그 간 줄바꿈)
console.log(`previousElemSibling: ${currNode.nextElementSibling.textContent}`); // => "nextSibling/nextElemSibling"
