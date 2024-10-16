document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate");
    const eyesInput = document.getElementById("eyes");
    const noseInput = document.getElementById("nose");
    const mouthInput = document.getElementById("mouth");
    const accessoriesInput = document.getElementById("accessories");
    const backgroundInput = document.getElementById("background");
    const styleInput = document.getElementById("style");
    const imageContainer = document.getElementById("image-container");
    const loadingSpinner = document.getElementById("loading-spinner");
    const dlLink = document.getElementById("dlLink");
    const message = document.getElementById("message");
  
    dlLink.style.display = "none";
  
    generateButton.addEventListener("click", function () {
      const description = encodeURIComponent(createDescription());
      const imageUrl = `https://image.pollinations.ai/prompt/${description}?nologo=1&seed=${generateRandomSeed()}&height=512&width=512`;
      displayLoadingState(true);
  
      // Use a CORS proxy
      const proxyUrl = "https://corsproxy.io/?";
      const proxiedImageUrl = proxyUrl + encodeURIComponent(imageUrl);
  
      fetch(proxiedImageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const img = new Image();
          img.onload = function () {
            displayGeneratedImage(this);
            updateDownloadLink(imageUrl); // Use original URL for download
            message.textContent = "Your Jack o'Lantern has been generated!";
            displayLoadingState(false);
          };
          img.onerror = function () {
            throw new Error("Image failed to load");
          };
          img.src = URL.createObjectURL(blob);
        })
        .catch((error) => {
          displayLoadingState(false);
          message.textContent = "Failed to generate the image. Please try again.";
          console.error("Error:", error);
        });
    });
  
    function createDescription() {
      return `Detailed Halloween pumpkin Jack o'Lantern, ${getEyesDescription(
        eyesInput.value
      )}, ${getNoseDescription(noseInput.value)}, ${getMouthDescription(mouthInput.value)}, ${getAccessoriesDescription(accessoriesInput.value)} in a ${getBackgroundDescription(backgroundInput.value)}, ${getStyleDescription(styleInput.value)} style, spooky, highly detailed`;
    }
  
    function generateRandomSeed() {
      return Math.floor(Math.random() * 1e9);
    }
  
    function displayLoadingState(isLoading) {
      loadingSpinner.style.display = isLoading ? "block" : "none";
      generateButton.disabled = isLoading;
      if (isLoading) {
        imageContainer.innerHTML = "";
        dlLink.style.display = "none";
        message.textContent = "Conjuring your Jack o'Lantern...";
      }
    }
  
    function displayGeneratedImage(img) {
      imageContainer.innerHTML = "";
      imageContainer.appendChild(img);
    }
  
    function updateDownloadLink(imageUrl) {
      dlLink.style.display = "inline-block";
      dlLink.href = imageUrl;
    }
  
    function getEyesDescription(eyesType) {
      const descriptions = {
        triangle: "triangular-shaped glowing eyes",
        round: "round glowing eyes",
        slanted: "slanted menacing eyes",
        "star-shaped": "star-shaped glowing eyes",
        crescent: "crescent-shaped glowing eyes",
        "heart-shaped": "heart-shaped glowing eyes",
        diamond: "diamond-shaped glowing eyes",
        spiral: "spiral-shaped glowing eyes"
      };
      return descriptions[eyesType] || "glowing eyes";
    }
  
    function getNoseDescription(noseType) {
      const descriptions = {
        triangle: "triangular-shaped nose",
        round: "round nose",
        "heart-shaped": "heart-shaped nose",
        none: "no nose",
        square: "square-shaped nose",
        "star-shaped": "star-shaped nose",
        crescent: "crescent-shaped nose"
      };
      return descriptions[noseType] || "carved nose";
    }
  
    function getMouthDescription(mouthType) {
      const descriptions = {
        grin: "wide grinning mouth with teeth",
        frown: "frowning mouth",
        square: "square-shaped mouth",
        jagged: "jagged, zigzag mouth",
        curved: "curved smiling mouth",
        stitched: "stitched mouth",
        fanged: "fanged grinning mouth",
        surprised: "surprised O-shaped mouth",
        smirk: "a mischievous smirk or smile" // New Smirk option
      };
      return descriptions[mouthType] || "carved mouth";
    }
  
    function getAccessoriesDescription(accessoryType) {
      const descriptions = {
        none: "",
        "witch hat": "wearing a witch hat",
        scarf: "wearing a cozy scarf",
        glasses: "wearing glasses",
        sunglasses: "wearing cool sunglasses",
        beanie: "wearing a warm beanie",
        "bow tie": "wearing a dapper bow tie",
        earrings: "with dangling earrings",
        mustache: "with a curly mustache",
        pipe: "with a smoking pipe",
        monocle: "wearing a monocle",
        crown: "wearing a regal crown",
        "glasses and scarf": "wearing glasses and a cozy scarf",
        "beanie and scarf": "wearing a warm beanie and a cozy scarf",
        "witch hat and glasses": "wearing a witch hat and glasses",
        "sunglasses and bow tie": "wearing cool sunglasses and a dapper bow tie",
        "sunglasses and scarf": "wearing cool sunglasses and a cozy scarf",
        "sunglasses and beanie": "wearing cool sunglasses and a warm beanie"
      };
      return descriptions[accessoryType] || "";
    }
  
    function getBackgroundDescription(backgroundType) {
      const descriptions = {
        "spooky forest": "spooky forest with twisted trees and fog",
        "haunted house": "haunted house with eerie windows and a full moon",
        graveyard: "misty graveyard with crooked tombstones",
        "misty night": "misty night scene with a full moon",
        "full moon": "dramatic full moon night sky",
        "pumpkin patch": "pumpkin patch with various sized pumpkins",
        "witch's cauldron": "bubbling witch's cauldron with green smoke",
        "abandoned castle": "looming abandoned castle on a hilltop"
      };
      return descriptions[backgroundType] || "spooky Halloween scene";
    }
  
    function getStyleDescription(styleType) {
      const descriptions = {
        realistic: "realistic style",
        cartoon: "cartoon style",
        watercolor: "watercolor painting style",
        "oil painting": "oil painting style",
        "digital art": "digital art style",
        sketchy: "sketchy, hand-drawn style",
        "pixel art": "pixel art style",
        gothic: "dark, gothic style",
        "pop art": "bold, pop art style",
        abstract: "abstract art style", // New art styles
        "line drawing": "minimalist line drawing style",
        "comic book": "comic book style"
      };
      return descriptions[styleType] || "artistic style";
    }
  });
  