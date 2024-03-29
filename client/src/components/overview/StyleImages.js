import React from 'react';
import { magnify, setModal, clickTracker } from './helpers.js';
import StyleSelect from './StyleSelect.js';

const StyleImages = ({store, setCurrent, reviews}) => {
  // console.log('inside StyleImages');
  // console.log(reviews);

  if (store.currentStyle) {
    let currentPic = 'https://s3.us-east-2.amazonaws.com/media.littleconquest.com/uploads/2017/06/404-Placeholder.png';
    if (store.currentStyle.photos[store.currentStyle['default?']]) {
      currentPic = store.currentStyle.photos[store.currentStyle['default?']].url;
    }
    let slideIndex = store.currentStyle['default?'];
    let tempPrevImg = null;

    const setMagClick = function() {
      let temp = document.getElementById("myimage");
      temp.removeEventListener("click", setModal);
      temp.addEventListener("click", onImgClick);
      clickTracker('Magnify', 'overview');
    }
    const setModClick = function() {
      if (document.getElementsByClassName("img-magnifier-glass")) {
        let toRemove = document.getElementsByClassName("img-magnifier-glass");
        while (toRemove.length > 0) {
          toRemove[0].parentNode.removeChild(toRemove[0]);
        }
      }
      let temp = document.getElementById("myimage");
      temp.removeEventListener("click", onImgClick);
      temp.addEventListener("click", setModal);
      clickTracker('Expand', 'overview');
    }

    const plusDivs = function() {
      slideIndex++;
      if (slideIndex > store.currentStyle.photos.length - 1) {
        slideIndex = 0;
      }
      let current = document.getElementById('myimage');
      current.src = store.currentStyle.photos[slideIndex].url;
      clickTracker('RightArrow', 'overview');
    }

    const minusDivs = function() {
      slideIndex--;
      if (slideIndex < 0) {
        slideIndex = store.currentStyle.photos.length - 1;
      }
      let current = document.getElementById('myimage');
      current.src = store.currentStyle.photos[slideIndex].url;
      clickTracker('LeftArrow', 'overview');
    }
  
    const onImgClick = (e) => {
      e.preventDefault();
      magnify("myimage", 2.5);
    }
  
    const setImage = (e) => {
      e.preventDefault();
      let current = document.getElementById('myimage');
      let newImg = e.target.getAttribute('key-i');
      if (tempPrevImg) {
        tempPrevImg.className = "slide";
      }
      e.target.className = "slide active";
      tempPrevImg = e.target;
      // console.log(store.currentStyle.photos[newImg]);
      current.src = store.currentStyle.photos[newImg].url;
      // magnify("myimage", 3);
      if (document.getElementsByClassName("img-magnifier-glass")) {
        let toRemove = document.getElementsByClassName("img-magnifier-glass");
        while (toRemove.length > 0) {
          toRemove[0].parentNode.removeChild(toRemove[0]);
        }
      }
      let temp = document.getElementById("myimage");
      temp.removeEventListener("click", setModal);
      temp.removeEventListener("click", onImgClick);
      clickTracker('Gallery', 'overview');
    }

    return (
      <div className="images">

        <div className="img-container img gallery">
          {store.currentStyle.photos.map((item, index) => {
            let picture = 'https://s3.us-east-2.amazonaws.com/media.littleconquest.com/uploads/2017/06/404-Placeholder.png';
            if (item) {
              picture = item.url;
            }
            let cName = '';
            if (index === slideIndex) {
              cName = "slide active";
            } else {
              cName = "slide";
            }
            return (
              <img 
                key={index}
                key-i={index}
                className={cName} 
                src={picture} 
                onClick={setImage}
                alt="Gallery Image" />
            );
          })}
        </div>

        <div className="img-zoom-container img">
          <img id="myimage" 
            src={currentPic}
            // onClick={onImgClick}
            width="100%"
            height="100%"
            alt="Main Product Image"/>
          <div id="myModal" className="modal">
            <span className="close">&times;</span>
            <img className="modal-content" id="img01" />
          </div>
          <button className="w3-button button-left" onClick={minusDivs}>&#10094;</button>
          <button className="w3-button w3-display-right" onClick={plusDivs}>&#10095;</button>
          <button className="w3-button mag-click" onClick={setMagClick}>Magnify</button>
          <button className="w3-button mod-click" onClick={setModClick}>Expand</button>
        </div>

        <StyleSelect 
          store={store.styles}
          setCurrent={setCurrent}
          current={store.currentStyle}
          details={store.details}
          reviews={reviews}/>

        {/* <button className="mode-buttons" onClick={setMagClick}>Set Mag</button>
        <button className="mode-buttons" onClick={setModClick}>Set Mod</button> */}
      </div>
    );
  } else {
    return (
        <div>
          <div className="img-zoom-container">
            <img className="mySlides" id="myimage" alt="nothing here"/>
            <div id="myresult" className="img-zoom-result"></div>
          </div>  
        </div>
      );
  }

}

export default StyleImages;