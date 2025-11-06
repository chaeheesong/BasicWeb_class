function displayCandy(){
    let candy = ['jellybeans'];
    function addCandy(candyType) {
        candy.push(candyType)
    }
    addCandy('gumdrops');
}
displayCandy();


function dragElement(terrariumElement) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    terrariumElement.onpointerdown = pointerDrag;

    function pointerDrag(e) {
        e.preventDefault();  // 이전 실행된 이벤트 종료
        console.log(e);
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        console.log(pos1, pos2, pos3, pos4);
        terrariumElement.style.top = terrariumElement.offsetTop - pos2 + 'px';
        terrariumElement.style.left = terrariumElement.offsetLeft - pos1 + 'px';
    }

    function stopElementDrag() {
        document.onpointerup = null;
        document.onpointermove = null;
    }
}

function doubleclick(plant_num) {
    const plant = document.getElementById(plant_num);
    const z = parseInt((window.getComputedStyle(plant)).zIndex);
    plant.style.zIndex = z + 1;
    console.log('더블클릭 감지됨',plant.style.zIndex);
}

const dropZone = document.querySelector('.jar-walls');

dropZone.addEventListener('dragstart', (event) => {
    event.target.classList.add("dragging");
});
dropZone.addEventListener('dragend', (event) => {
    event.target.classList.remove("dragging");
});

console.log(document.getElementById('plant1'));
dragElement(document.getElementById('plant1'));
dragElement(document.getElementById('plant2'));
dragElement(document.getElementById('plant3'));
dragElement(document.getElementById('plant4'));
dragElement(document.getElementById('plant5'));
dragElement(document.getElementById('plant6'));
dragElement(document.getElementById('plant7'));
dragElement(document.getElementById('plant8'));
dragElement(document.getElementById('plant9'));
dragElement(document.getElementById('plant10'));
dragElement(document.getElementById('plant11'));
dragElement(document.getElementById('plant12'));
dragElement(document.getElementById('plant13'));
dragElement(document.getElementById('plant14'));
(document.getElementById('plant1')).ondblclick = () => doubleclick('plant1');
(document.getElementById('plant2')).ondblclick = () => doubleclick('plant2');
(document.getElementById('plant3')).ondblclick = () => doubleclick('plant3');
(document.getElementById('plant4')).ondblclick = () => doubleclick('plant4');
(document.getElementById('plant5')).ondblclick = () => doubleclick('plant5');
(document.getElementById('plant6')).ondblclick = () => doubleclick('plant6');
(document.getElementById('plant7')).ondblclick = () => doubleclick('plant7');
(document.getElementById('plant8')).ondblclick = () => doubleclick('plant8');
(document.getElementById('plant9')).ondblclick = () => doubleclick('plant9');
(document.getElementById('plant10')).ondblclick = () => doubleclick('plant10');
(document.getElementById('plant11')).ondblclick = () => doubleclick('plant11');
(document.getElementById('plant12')).ondblclick = () => doubleclick('plant12');
(document.getElementById('plant13')).ondblclick = () => doubleclick('plant13');
(document.getElementById('plant14')).ondblclick = () => doubleclick('plant14');