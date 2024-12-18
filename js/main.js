(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector('#loader');
  const errortext = document.querySelector('#error');

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"


  //functions
  function loadInfoBoxes() {

    //make AJAX call here
    loader.classList.remove('hidden');
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes);
      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index + 1}`);
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;
  
        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;
  
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
      });

      loader.classList.toggle('hidden');
      error.innerHTML = '';
      error.appendChild(ul);
    })
    .catch(error => {
      console.log(error);
      const errorMessage = document.createElement('p');
      errortext.textContent = "oops, it looks like something went wrong. Please check your connection and try again later.";

      errortext.appendChild(errorMessage);
      errortext.classList.toggle('hidden');
  }) }

  loadInfoBoxes();

  function loadMaterialInfo() {

    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then( materials =>{
      console.log(materials);

      materials.forEach(material => {
      
        //clone the template
        const clone = materialTemplate.content.cloneNode(true);
      
        //populate the data
        const materialHeading = clone.querySelector('.material-heading');
        materialHeading.textContent = material.heading;
      
        const materialDescription = clone.querySelector('.material-description');
        materialDescription.textContent = material.description;
      
        //append the clone to the list
        materialList.appendChild(clone);  
      });
    } )
    .catch()
     

}

  loadMaterialInfo()

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

