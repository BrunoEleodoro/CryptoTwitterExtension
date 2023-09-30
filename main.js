// add event handle onLoad for the body
// add event handle onUnload for the body
// add event handle onResize for the body
// add event handle onScroll for the body


document.body.onload = async function () {
  console.log("Page is loaded");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: async () => {
      // document.body.style.background = "linear-gradient(0deg, rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url('https://media.tenor.com/IvyuPtEfzhoAAAAM/matrix.gif')";
      // Injecting HTML

      // document.querySelectorAll('[data-testid="placementTracking"]')[0].parentElement.innerHTML= ``;
      // document.querySelector('body').appendChild(document.createElement('div')).innerHTML = ``;
      const name = document.querySelectorAll('[data-testid="UserName"]')[0].children[0].children[0].children[0].innerText;
      const img = document.querySelectorAll('[data-testid*="primaryColumn"]')[0].querySelectorAll('[data-testid*="UserAvatar-Container"]')[0].querySelectorAll('img')[0].src;
      const randomID= Math.random().toString(36).substring(7);
      const handle = document.querySelectorAll('[data-testid="UserName"]')[0].children[0].children[0].children[1].innerText.replace('@', '');
      const receiverAddress = await fetch('https://worker-super-haze-dfe9.brunoeleodoro-helloworld.workers.dev/?account='+handle).then(res => res.json()).then(res => res.res);

      const modalHTML = `<section class="modal hidden" id=${randomID}>
      <div class="flex">
        <button class="btn-close" >x</button>
      </div>
      <div>
      <iframe src="https://crypto-twitter-ecc23.web.app/?name=${name}&description=payment&imageURI=${img}&receiverAddress=${receiverAddress}"
            name="thumbnails"
            frameborder="0"
            style="width: 100%;
            height: 550px;"></iframe>
      </div>
    </section>`;
      // append child on this element document.querySelectorAll('main')[0]
      document.querySelectorAll('main')[0].appendChild(document.createElement('div')).innerHTML = modalHTML; 
      document.querySelectorAll('[data-testid="placementTracking"]')[0].parentElement.innerHTML = `
      <div class="overlay hidden"></div>
      <button class="btn btn-open">Superfluid</button>
      `

//  document.querySelectorAll('[data-testid="userActions"]')[0].parentElement.innerHTML= `
// document.querySelectorAll('[data-testid="placementTracking"]')[0].parentElement.innerHTML=`
//  <label for="modal" class="modal-background"></label>
//  <input type="checkbox" id="modal">
// <label for="modal" class="example-label">Open Modal</label>
// <div class="modal">

//     <div class="modal-header">
//         <h3>Modal Title</h3>
//         <label for="modal">
//             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAABNTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU0N3NIOAAAAJnRSTlMAAQIDBAUGBwgRFRYZGiEjQ3l7hYaqtLm8vsDFx87a4uvv8fP1+bbY9ZEAAAB8SURBVBhXXY5LFoJAAMOCIP4VBRXEv5j7H9HFDOizu2TRFljedgCQHeocWHVaAWStXnKyl2oVWI+kd1XLvFV1D7Ng3qrWKYMZ+MdEhk3gbhw59KvlH0eTnf2mgiRwvQ7NW6aqNmncukKhnvo/zzlQ2PR/HgsAJkncH6XwAcr0FUY5BVeFAAAAAElFTkSuQmCC" width="16" height="16" alt="">
//         </label>
//     </div>
//     <p>Content for the modal</p>
//     <iframe src="https://cryptotwitter.surge.sh/?name=teste&description=dfafsafdsa&imageURI=https://pbs.twimg.com/profile_images/1683249222534025216/-AksKsna_400x400.jpg"
//       name="thumbnails"
//       frameborder="0"
//       style="width: 100%;
//       height: 450px;"></iframe>
    
// </div>
// `;

// Injecting CSS
const style = document.createElement('style');
style.textContent = `

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  width: 650px;
  min-height: 250px;
  position: absolute;
  z-index: 2;
  top: 30px;
  left: 150px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 15px;
}

.modal .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal input {
  padding: 0.7rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9em;
}

.modal p {
  font-size: 0.9rem;
  color: #777;
  margin: 0.4rem 0 0.2rem;
}

button {
  cursor: pointer;
  border: none;
  font-weight: 600;
}

.btn-open {
  border-radius: 125px;
  padding: 0.8rem 1.4rem;
  border: 1px solid #ddd; 

}

.btn {
  display: inline-block;
  padding: 0.8rem 1.4rem;
  font-weight: 700;
  background-color: black;
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 1em;
}



.btn-close {
  transform: translate(10px, -20px);
  padding: 0.5rem 0.7rem;
  background: #eee;
  border-radius: 50%;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1;
}

.hidden {
  display: none;
}`;

document.head.appendChild(style);


      // do the same now to include javascript on the page
      const javascript = `
      
      `
      // Inject the javascript code into the page
      const script = document.createElement('script');
      script.textContent = javascript;
      document.head.appendChild(script);

      const modal = document.querySelector(".modal");
      const overlay = document.querySelector(".overlay");
      const openModalBtn = document.querySelector(".btn-open");
      const closeModalBtn = document.querySelector(".btn-close");
      
      // close modal function
      const closeModal = function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
      };
      
      // close the modal when the close button and overlay is clicked
      closeModalBtn.addEventListener("click", closeModal);
      overlay.addEventListener("click", closeModal);
      
      // close modal when the Esc key is pressed
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
          closeModal();
        }
      });
      
      // open modal function
      const openModal = function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      };
      // open modal event
      openModalBtn.addEventListener("click", openModal);


      // document.querySelectorAll('[data-testid="placementTracking"]')[0].parentElement.innerHTML= '<div class="css-1dbjc4n" data-testid="placementTracking"><div class="css-1dbjc4n r-6gpygo" style="min-width: 152px;"><div aria-describedby="id__mtuvfxw5kih" aria-label="Seguindo @StaniKulechov" role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1niwhzg r-sdzlij r-1phboty r-rs99b7 r-2yi16 r-1qi8awa r-1ny4l3l r-ymttw5 r-o7ynqc r-6416eg r-lrvibr" data-testid="952921795316912133-unfollow" style="border-color: rgb(83, 100, 113);"><div dir="ltr" class="css-901oao r-1awozwy r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0" style="color: rgb(239, 243, 244);"><span class="css-901oao css-16my406 css-1hf3ou5 r-poiln3 r-a023e6 r-rjixqe r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Superfluid</span></span></div></div></div><div dir="auto" class="css-901oao r-hvic4v" id="id__mtuvfxw5kih">Clique para Deixar de Seguir StaniKulechov</div></div>'
    }
  });

};

document.body.onunload = function () {
  console.log("Page is about to be unloaded");
};

window.onresize = function () {
  console.log("Window is resized");
};

window.onscroll = function () {
  console.log("Window is scrolled");
};


// // Initialize button with users' preferred color
// const changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener('click', async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: setPageBackgroundColor
//   });
// });

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get('color', ({ color }) => {
//     document.body.style.background = "linear-gradient(0deg, rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url('https://media.tenor.com/IvyuPtEfzhoAAAAM/matrix.gif')";
//   });
// }
