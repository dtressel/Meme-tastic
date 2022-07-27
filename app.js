// Variable Declaration:
let topText;
let bottomText;
let memePreviewImageContainerWidth;
let memePreviewImageContainerHeight;
let draggableTextUpperBoundsX;
let draggableTextUpperBoundsY;
let newElementPositionX;
let newElementPositionY;
let currentMemeObject = {
    topTextTop: 0,
    topTextLeft: 0,
    bottomTextTop: 0,
    bottomTextLeft: 0,
    topTextPosition: 'center',
    bottomTextPosition: 'center',
    topTextJustification: 'center',
    bottomTextJustification: 'center'
}
const positionClasses = ['meme-text-center', 'meme-text-draggable'];
const justificationClasses = ['justification-left', 'justification-center', 'justification-right'];
const fontClasses = ['arial', 'acme', 'anton', 'pt-sans-narrow', 'signika-negative'];
const textColorClasses = ['text-color-white', 'text-color-black', 'text-color-white-outlined'];

// DOM Elements:
const imageInputField = document.getElementById('image-input-field');
const topTextInputField = document.getElementById('top-text-input-field');
const bottomTextInputField = document.getElementById('bottom-text-input-field');
const topTextWidthSlider = document.getElementById('top-text-width-slider');
const bottomTextWidthSlider = document.getElementById('bottom-text-width-slider');
const fontSelect = document.getElementById('font-select');
const fontSizeSlider = document.getElementById('font-size-slider');
const fontColorSelect = document.getElementById('font-color-select');

const topTextPositionRadioCenter = document.getElementById('top-text-position-radio-center');
const topTextPositionRadioDraggable = document.getElementById('top-text-position-radio-draggable');
const bottomTextPositionRadioCenter = document.getElementById('bottom-text-position-radio-center');
const bottomTextPositionRadioDraggable = document.getElementById('bottom-text-position-radio-draggable');

const topTextJustificationRadioLeft = document.getElementById('top-text-justification-radio-left');
const topTextJustificationRadioCenter = document.getElementById('top-text-justification-radio-center');
const topTextJustificationRadioRight = document.getElementById('top-text-justification-radio-right');
const bottomTextJustificationRadioLeft = document.getElementById('bottom-text-justification-radio-left');
const bottomTextJustificationRadioCenter = document.getElementById('bottom-text-justification-radio-center');
const bottomTextJustificationRadioRight = document.getElementById('bottom-text-justification-radio-right');

const memePreviewPin = document.getElementById('meme-preview-pin');
const memePreviewImageContainer = document.getElementById('meme-preview-image-container');
const memePreviewTextContainer = document.getElementById('meme-preview-text-container');
const memePreviewTop = document.getElementById('meme-preview-top');
const memePreviewBottom = document.getElementById('meme-preview-bottom');
const memeImg = document.getElementById('meme-img-preview');
const topTextP = document.getElementById('top-text-p');
const bottomTextP = document.getElementById('bottom-text-p');

const imageUploadButton = document.getElementById('image-upload-button');
const memePublishButton = document.getElementById('meme-publish-button');

//Event Listeners:
imageUploadButton.addEventListener('click', addImageToPreview);
topTextInputField.addEventListener('keyup', topTextLivePreview);
bottomTextInputField.addEventListener('keyup', bottomTextLivePreview);
topTextWidthSlider.addEventListener('input', () => topTextP.style.maxWidth = `${topTextWidthSlider.value}%`);
bottomTextWidthSlider.addEventListener('input', () => bottomTextP.style.maxWidth = `${bottomTextWidthSlider.value}%`);
fontSelect.addEventListener('change', changeFont);
fontSizeSlider.addEventListener('input', () => memePreviewTextContainer.style.fontSize = `${fontSizeSlider.value}rem`);
fontColorSelect.addEventListener('change', changeTextColor);
memePublishButton.addEventListener('click', saveMemeToDisplay);

topTextPositionRadioCenter.addEventListener('click', () => changeTopTextPosition('center'));
topTextPositionRadioDraggable.addEventListener('click', () => changeTopTextPosition('draggable'));
bottomTextPositionRadioCenter.addEventListener('click', () => changeBottomTextPosition('center'));
bottomTextPositionRadioDraggable.addEventListener('click', () => changeBottomTextPosition('draggable'));

topTextJustificationRadioLeft.addEventListener('click', () => changeTextJustification('top', 'left'));
topTextJustificationRadioCenter.addEventListener('click', () => changeTextJustification('top', 'center'));
topTextJustificationRadioRight.addEventListener('click', () => changeTextJustification('top', 'right'));
bottomTextJustificationRadioLeft.addEventListener('click', () => changeTextJustification('bottom', 'left'));
bottomTextJustificationRadioCenter.addEventListener('click', () => changeTextJustification('bottom', 'center'));
bottomTextJustificationRadioRight.addEventListener('click', () => changeTextJustification('bottom', 'right'));

// On Event Functions:
function addImageToPreview(event) {
    event.preventDefault();
    memeImg.setAttribute('src', imageInputField.value);
    currentMemeObject.url = imageInputField.value;
    memeImg.addEventListener('load', () => {
        memePreviewImageContainerHeight = memePreviewImageContainer.clientHeight;
        memePreviewImageContainerWidth = memePreviewImageContainer.clientWidth;
        memePreviewTextContainer.style.height = memePreviewImageContainerHeight + 'px';
        memePreviewTextContainer.style.width = memePreviewImageContainerWidth + 'px';
    })
}

function topTextLivePreview() {
    topTextP.textContent = topTextInputField.value;
}

function bottomTextLivePreview() {
    bottomTextP.textContent = bottomTextInputField.value;
}

function changeTopTextPosition(position) {
    topTextP.classList.remove('meme-text-p-draggable');
    for (const clas of positionClasses) {
        memePreviewTop.classList.remove(clas);
    }
    memePreviewTop.classList.add(`meme-text-${position}`);
    if (position === 'draggable') {
        topTextP.classList.add('meme-text-p-draggable');
        currentMemeObject.topTextPosition = 'draggable';
        topTextP.addEventListener('mousedown', draggableMouseDown, {once: true});
    } else {
        currentMemeObject.topTextPosition = 'center';
    }
}

function changeBottomTextPosition(position) {
    bottomTextP.classList.remove('meme-text-p-draggable');
    for (const clas of positionClasses) {
        memePreviewBottom.classList.remove(clas);
    }
    memePreviewBottom.classList.add(`meme-text-${position}`);
    if (position === 'draggable') {
        bottomTextP.classList.add('meme-text-p-draggable');
        currentMemeObject.bottomTextPosition = 'draggable';
        bottomTextP.addEventListener('mousedown', draggableMouseDown, {once: true});
    } else {
        currentMemeObject.bottomTextPosition = 'center';
    }
}

function changeTextJustification(topOrBottomText, justification) {
    let pElement;
    if (topOrBottomText === "top") {
        pElement = topTextP;
        currentMemeObject.topTextJustification = justification;
    } else {
        pElement = bottomTextP;
        currentMemeObject.bottomTextJustification = justification;
    }
    for (const clas of justificationClasses) {
        pElement.classList.remove(clas);
    }
    pElement.classList.add(`justification-${justification}`);
}

function changeFont() {
    for (let clas of fontClasses) {
        memePreviewTextContainer.classList.remove(clas);
    }
    memePreviewTextContainer.classList.add(fontSelect.value);
}

function changeTextColor() {
    for (let clas of textColorClasses) {
        memePreviewTextContainer.classList.remove(clas);
    }
    memePreviewTextContainer.classList.add(`text-color-${fontColorSelect.value}`);
}

// Draggable Text:
// On mouse down, it collects the pointer position and p Element position.
// On mouse move, it records the pointer position change and creates a parallel p Element position change.
// Even listener on mouse down is on the text, but the event listener on mouse move and on mouse up
    // is on the window to avoid a bug when you move the cursor too fast when dragging and the cursor
    // ends up moving off of the text.
function draggableMouseDown(event) {
    let currentP;
    let beforeMoveElementX;
    let beforeMoveElementY;
    console.log(event);
    if (event.target.id === 'top-text-p') {
        currentP = topTextP;
        beforeMoveElementX = currentMemeObject.topTextLeft;
        beforeMoveElementY = currentMemeObject.topTextTop;
    } else {
        currentP = bottomTextP;
        beforeMoveElementX = currentMemeObject.bottomTextLeft;
        beforeMoveElementY = currentMemeObject.bottomTextTop;
    }
    const beforeMovePointerX = event.x;
    const beforeMovePointerY = event.y;
    draggableTextUpperBoundsX = memePreviewImageContainerWidth - event.target.clientWidth;
    draggableTextUpperBoundsY = memePreviewImageContainerHeight / 2 - event.target.clientHeight;
    const mouseMoveEventListener = (event) => draggableMouseMove(event, currentP, beforeMoveElementX, beforeMoveElementY, beforeMovePointerX, beforeMovePointerY);
    window.addEventListener('mousemove', mouseMoveEventListener);
    window.addEventListener('mouseup', () => draggableMouseUp(currentP, mouseMoveEventListener), {once: true});
}

function draggableMouseMove(event, currentP, beforeMoveElementX, beforeMoveElementY, beforeMovePointerX, beforeMovePointerY) {
    const xMovementAmount = event.x - beforeMovePointerX;
    const yMovementAmount = event.y - beforeMovePointerY;
    unboundedNewElementPositionX = beforeMoveElementX + xMovementAmount;
    unboundedNewElementPositionY = beforeMoveElementY + yMovementAmount;
    newElementPositionX = Math.min(Math.max(unboundedNewElementPositionX, 0), draggableTextUpperBoundsX);
    newElementPositionY = Math.min(Math.max(unboundedNewElementPositionY, 0), draggableTextUpperBoundsY);
    currentP.style.left = `${newElementPositionX}px`;
    currentP.style.top = `${newElementPositionY}px`;
}

function draggableMouseUp(currentP, mouseMoveEventListener) {
    window.removeEventListener('mousemove', mouseMoveEventListener);
    if (currentP === topTextP) {
        currentMemeObject.topTextLeft = newElementPositionX;
        currentMemeObject.topTextTop = newElementPositionY;
    } else {
        currentMemeObject.bottomTextLeft = newElementPositionX;
        currentMemeObject.bottomTextTop = newElementPositionY;
    }
    currentP.addEventListener('mousedown', draggableMouseDown, {once: true});
}

// Big function which creates the saved meme that will appear in the saved meme area and deletes
    //the meme in the preview area.
function saveMemeToDisplay(event) {
    // for transition effect to saved area: 
    memePreviewPin.classList.add('meme-preview-transition');
    //Save Meme Information:
    event.preventDefault();
    currentMemeObject.topText = topTextInputField.value;
    currentMemeObject.topTextWidth = topTextWidthSlider.value;
    currentMemeObject.bottomText = bottomTextInputField.value;
    currentMemeObject.bottomTextWidth = bottomTextWidthSlider.value;
    currentMemeObject.fontFamily = fontSelect.value;
    currentMemeObject.fontSize = fontSizeSlider.value;
    currentMemeObject.fontColor = fontColorSelect.value;
    currentMemeObject.containerHeight = memePreviewTextContainer.clientHeight;
    currentMemeObject.containerWidth = memePreviewTextContainer.clientWidth;

    //create div skeleton:
    const stdMemePin = document.createElement('div');
    const stdMemeImageContainer = document.createElement('div');
    const stdMemeImage = document.createElement('img');
    const stdMemeTextContainer = document.createElement('div');
    const stdMemeTopTextDiv = document.createElement('div');
    const stdMemeTopTextP = document.createElement('p');
    const stdMemeBottomTextDiv = document.createElement('div');
    const stdMemeBottomTextP = document.createElement('p');

    stdMemePin.append(stdMemeImageContainer, stdMemeTextContainer);
    stdMemeImageContainer.append(stdMemeImage);
    stdMemeTextContainer.append(stdMemeTopTextDiv, stdMemeBottomTextDiv);
    stdMemeTopTextDiv.append(stdMemeTopTextP);
    stdMemeBottomTextDiv.append(stdMemeBottomTextP);

    //add meme elements
    stdMemePin.classList.add('meme-pin', 'saved-meme');
    stdMemeImageContainer.classList.add('meme-image-container');
    stdMemeImage.classList.add('meme-image');
    stdMemeTextContainer.classList.add('meme-text-container', currentMemeObject.fontFamily, `text-color-${currentMemeObject.fontColor}`);
    stdMemeTopTextDiv.classList.add('meme-text-div-top', `meme-text-${currentMemeObject.topTextPosition}`);
    if (currentMemeObject.topTextPosition === 'draggable') {
        stdMemeTopTextP.classList.add('meme-text-p-draggable');
    }
    stdMemeTopTextP.classList.add('meme-text-p', `justification-${currentMemeObject.topTextJustification}`);
    stdMemeBottomTextDiv.classList.add('meme-text-div-bottom', `meme-text-${currentMemeObject.bottomTextPosition}`);
    if (currentMemeObject.bottomTextPosition === 'draggable') {
        stdMemeBottomTextP.classList.add('meme-text-p-draggable');
    }
    stdMemeBottomTextP.classList.add('meme-text-p', `justification-${currentMemeObject.bottomTextJustification}`);

    stdMemeTopTextP.textContent = currentMemeObject.topText;
    stdMemeBottomTextP.textContent = currentMemeObject.bottomText;
    stdMemeImage.style.height = `${currentMemeObject.containerHeight}px`
    stdMemeImage.style.width = `${currentMemeObject.containerWidth}px`
    stdMemeImage.setAttribute('src', currentMemeObject.url);
    stdMemeTextContainer.style.height = `${currentMemeObject.containerHeight}px`
    stdMemeTextContainer.style.width = `${currentMemeObject.containerWidth}px`
    stdMemeTextContainer.style.fontSize = `${currentMemeObject.fontSize}rem`;
    stdMemeTopTextP.style.maxWidth = `${currentMemeObject.topTextWidth}%`;
    stdMemeBottomTextP.style.maxWidth = `${currentMemeObject.bottomTextWidth}%`;
    stdMemeTopTextP.style.left = `${currentMemeObject.topTextLeft}px`;
    stdMemeTopTextP.style.top = `${currentMemeObject.topTextTop}px`;
    stdMemeBottomTextP.style.left = `${currentMemeObject.bottomTextLeft}px`;
    stdMemeBottomTextP.style.top = `${currentMemeObject.bottomTextTop}px`;

    //create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteMeme, {once:true});
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add('delete-button');
    function deleteMeme(event) {
        event.target.parentElement.remove();
    }
    stdMemePin.append(deleteButton);

    //timeout to make sure visual transition is complete before removing preview meme
    setTimeout(finishTransition, 500);

    function finishTransition () {
        //prepend to Saved Memes
        document.getElementById('saved-meme-container').prepend(stdMemePin);

        //reset variables
        topText = undefined;
        bottomText = undefined;
        memePreviewImageContainerWidth = undefined;
        memePreviewImageContainerHeight = undefined;
        draggableTextUpperBoundsX = undefined;
        draggableTextUpperBoundsY = undefined;
        newElementPositionX = undefined;
        newElementPositionY = undefined;
        currentMemeObject = {
            topTextTop: 0,
            topTextLeft: 0,
            bottomTextTop: 0,
            bottomTextLeft: 0,
            topTextPosition: 'center',
            bottomTextPosition: 'center',
            topTextJustification: 'center',
            bottomTextJustification: 'center'
        }

        // clear input values:
        imageInputField.value = '';
        topTextInputField.value = '';
        bottomTextInputField.value = '';
        topTextPositionRadioCenter.checked = true;
        topTextJustificationRadioCenter.checked = true;
        bottomTextPositionRadioCenter.checked = true;
        bottomTextJustificationRadioCenter.checked = true;
        topTextWidthSlider.value = 60;
        bottomTextWidthSlider.value = 60;
        fontSelect.value = 'arial';
        fontSizeSlider.value = 2.2;
        fontColorSelect.value = 'black';

        //remove content and styling from preview window:
        memeImg.removeAttribute('src');
        for (const clas of fontClasses) {
            memePreviewTextContainer.classList.remove(clas);
        }
        for (const clas of textColorClasses) {
            memePreviewTextContainer.classList.remove(clas);
        }
        memePreviewTextContainer.classList.add('arial');
        memePreviewTextContainer.removeAttribute('style');
        for (const clas of positionClasses) {
            memePreviewTop.classList.remove(clas);
        }
        memePreviewTop.classList.add('meme-text-center');
        for (const clas of positionClasses) {
            memePreviewBottom.classList.remove(clas);
        }
        memePreviewBottom.classList.add('meme-text-center');
        topTextP.removeAttribute('style');
        bottomTextP.removeAttribute('style');
        for (const clas of justificationClasses) {
            topTextP.classList.remove(clas);
        }
        topTextP.classList.add('justification-center');
        for (const clas of justificationClasses) {
            bottomTextP.classList.remove(clas);
        }
        bottomTextP.classList.add('justification-center');
        topTextP.classList.remove('meme-text-p-draggable');
        bottomTextP.classList.remove('meme-text-p-draggable');
        topTextP.textContent = '';
        bottomTextP.textContent = '';
        memePreviewPin.classList.remove('meme-preview-transition');
    }
}