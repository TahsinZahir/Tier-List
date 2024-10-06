let currentDraggedItem;
const tierInput=document.getElementById('tier');

const itemContainers=document.getElementsByClassName('item-container');

const submitBtn=document.getElementById('submit');

const imageForm=document.getElementById('image-form');

for(const itemContainer of itemContainers){
setUpItemContainerForDrag(itemContainer);
}
imageForm.addEventListener('submit',(event)=>{
event.preventDefault();
const imageItemInput=document.getElementById('image-item');
if(imageItemInput.value==''){
    alert("Please enter a valid image url");
    return ;
}
const imageUrl=imageItemInput.value;
createTierListItem(imageUrl);
imageItemInput.value='';
});

submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    const target=event.target;
    if(tierInput.value==''){
        alert("Please enter a valid tier name");
        return ;
    }
    createTierList(tierInput.value);
    tierInput.value='';
});
function createTierList(tierListName){
const newTierList=document.createElement('div');
newTierList.classList.add('tier-list');
const heading=document.createElement('h1');
heading.textContent=tierListName;

const randomColor = getRandomColor();
heading.style.backgroundColor = randomColor;

const newTierListItems=document.createElement('div');
newTierListItems.classList.add('tier-list-items');

newTierList.appendChild(heading);
newTierList.appendChild(newTierListItems);
setUpDropZoneInTierListItem(newTierListItems);

const tierSection=document.getElementById('tier-list-section');
tierSection.appendChild(newTierList);
}

function createTierListItem(imageUrl){
const imageDiv=document.createElement('div');
imageDiv.setAttribute('draggable','true');
imageDiv.classList.add('item-container');
setUpItemContainerForDrag(imageDiv);
const img=document.createElement('img');
img.src=imageUrl;
imageDiv.appendChild(img);
const nonTierSection=document.getElementById('non-tier-section');
nonTierSection.appendChild(imageDiv);
}
function setUpItemContainerForDrag(itemContainer){
itemContainer.addEventListener('dragstart',(event)=>{
currentDraggedItem=event.target.parentNode;
});
itemContainer.addEventListener('dblclick',(event)=>{
    const parentNode=event.target.parentNode;
    const nonTierSection=document.getElementById('non-tier-section');
    nonTierSection.appendChild(parentNode);
    });
}

function setUpDropZoneInTierListItem(tierListItem){
    tierListItem.addEventListener('drop',(event)=>{
event.target.appendChild(currentDraggedItem);
event.preventDefault();
});
tierListItem.addEventListener('dragover',(event)=>{
event.target.appendChild(currentDraggedItem);
if(this!=currentDraggedItem.parentNode){
this.appendChild(currentDraggedItem);
}
});
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
