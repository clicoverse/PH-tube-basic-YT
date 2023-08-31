const loadHandlerCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  const categories = data.data; //get catgories form API
  displayCategories(categories);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories-container");
  // console.log(categories);
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="categoryHandleClick('${category.category_id}')" class="tab bg-[#25252533] px-8 font-semibold text-black text-xl rounded-md">${category.category}</a>
    `;
    categoryContainer.appendChild(div);
  });
};

const categoryHandleClick = async (id) => {
  try {
    const videofatched = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const videoData = await videofatched.json();
    const videos = videoData.data;
    const status = videoData.status;
    if (status === true) {
      displayVideos(videos);
    } else {
      console.log("Status False");
    }
  } catch {}
};

const displayVideos = (videos) => {
  console.log(videos);
};

loadHandlerCategory();
