// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const searchForm = document.querySelector(`#giphy-form`);
const searchInput = document.querySelector(`#giphy-search-input`);
const gifContainer = document.querySelector(`#gif-container`);
const clearButton = document.querySelector(`#clear`);

/**
 * Sends request to giphy api and returns the response.
 */
async function giphyRequest(searchInput) {
  try {
    const response = await axios.get(
      `http://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${searchInput}&limit=20`
    );
    return await response;
  } catch (error) {
    console.error("Giphy API request failed:", error);
    return null; // Explicitly returns null to indicate failure
  }
}

/**
 * Extracts a random gif url from the response of the giphyRequest function
 */
async function extractRandomGifURL(response) {
  const gifs = response?.data?.data; // Retreives list of gifs from response if it exists.
  // Returns null if gifs is not an array.
  if (!Array.isArray(gifs) || gifs.length === 0) {
    return null; // Explicitly returns null to indicate failure
  }
  const searchIndex = Math.floor(Math.random() * gifs.length); // Generates random number
  return gifs[searchIndex]?.images?.original?.url || null; // Gets random gif from gifs array.
}

document.addEventListener("DOMContentLoaded", function () {
  /**
   *Appends new gif to the gif-container.
   */
  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevents the default event.

    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return; //Returns nothing if serachTerm is empty.

    const response = await giphyRequest(searchTerm);
    if (!response?.data?.data?.length) return; // Returns nothing is response gif data is empty.

    const contentURL = await extractRandomGifURL(response);
    if (!contentURL) return; // Returns nothing if contentURL is empty.

    const element = document.createElement("img"); // New img element.
    element.setAttribute(`src`, contentURL); // Makes the URL the src of image tag.
    gifContainer.appendChild(element); // Appends img to the gif-container
    searchInput.value = ""; // resets value of searchInput field.
  });

  /**
   * Iterates through all the image tags in the gif-container and deletes them.
   */
  clearButton.addEventListener("click", function (event) {
    for (const node of gifContainer.querySelectorAll(`img`)) {
      gifContainer.removeChild(node);
    }
  });
});
