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

const defaultLoad = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );
  const defaultVideoData = await response.json();
  const defaultVideos = defaultVideoData.data;
  displayVideos(defaultVideos);
  // console.log(defaultVideos);
};
defaultLoad();

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
      window.location.href = "404.html";
    }
  } catch {
    console.error("Error fetching videos:", error);
  }
};

const displayVideos = (videos) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  // console.log("sorted ", sortedVideos);

  videos.forEach((video) => {
    const timeAgo = calculateTimeAgo(video.others?.posted_date);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl">
          <figure class="relative">
            <img class="w-full h-44" src=${video.thumbnail} alt="videos" />
            <div class="badge badge-neutral absolute font-semibold bottom-1 right-2">${timeAgo}</div>
  
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
              <div class="pl-20">
                <div class="flex justify-stretch gap-2">
                  <h6>${video.authors[0].profile_name}</h6>
                  ${
                    video.authors[0].verified
                      ? '<img class="badge" src="./img/fi_10629607.svg" alt="verified">'
                      : ""
                  }
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

function calculateTimeAgo(postDateInSecond) {
  // const currentDateTime = new Date().getTime() / 1000;
  const postTime = parseInt(postDateInSecond);
  const hoursAgo = Math.floor(postTime / (60 * 60));
  const minutesAgo = Math.floor((postTime % 3600) / 60);

  const hoursText =
    hoursAgo > 0 ? `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"}` : "";
  const minutesText =
    minutesAgo > 0
      ? `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"}`
      : "";

  if (hoursText && minutesText) {
    return `${hoursText} and ${minutesText} ago`;
  } else if (hoursText) {
    return `${hoursText} ago`;
  } else if (minutesText) {
    return `${minutesText} ago`;
  } else {
    return "";
  }
}

// const sortByView = () => {
//   displayVideos("uuuuuu");
// };

// console.log(calculateTimeAgo());
