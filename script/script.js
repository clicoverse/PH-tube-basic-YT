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
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  videos.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl">
          <figure>
            <img class="w-full h-44" src=${video.thumbnail} alt="Shoes" />
          </figure>
          <div>
            <div class="card-body flex justify-between">
              <div class="flex space-x-5">
                <div class="avatar">
                  <div class="w-14 rounded-full">
                    <img
                      src=${video.authors[0].profile_picture} />
                  </div>
                </div>
                <h2 class="card-title">
                  ${video.title}</h2>
              </div>
              <div class="px-20">
                <div class="flex gap-2">
                  <h6>${video.authors[0].profile_name}</h6>
                  <img class="hidden" src="./img/fi_10629607.svg" alt="varified">
                </div>
                <small>${video.others.views}</small>
              </div>
            </div>
          </div>
        </div>
    
    `;
    cardContainer.appendChild(div);
  });
};

loadHandlerCategory();
