// $(".btn-search").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=4ccc10a2&s=" +
//       $("input[type=text][name=search]").val(),
//     success: (movies) => {
//       const getMovies = movies.Search;
//       let movie = "";

//       getMovies.forEach((data) => {
//         movie += `<div class="col-md-4 my-2">
//                     <div class="card">
//                       <img src="${data.Poster}" class="card-img-top img-fluid" alt="${data.Title}" style="max-height: 60vh;"/>
//                       <div class="card-body">
//                         <h6 class="card-title">${data.Title}</h6>
//                         <p class="card-text">
//                           ${data.Year}
//                         </p>
//                         <button class="btn btn-sm btn-primary btn-movie-search" data-bs-toggle="modal"
//                         data-bs-target="#detailMovie" data-movieid="${data.imdbID}">See detail..</button>
//                       </div>
//                     </div>
//                   </div>`;
//         $(".movies").html(movie);
//       });

//       $(".btn-movie-search").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=4ccc10a2&i=" +
//             $(this).data("movieid") +
//             "&plot=full",
//           success: (movie) => {
//             let detail = `
//                           <div class="modal-header">
//                             <h5 class="modal-title">${movie.Title}</h5>
//                             <button
//                               type="button"
//                               class="btn-close"
//                               data-bs-dismiss="modal"
//                               aria-label="Close"
//                             ></button>
//                           </div>
//                           <div class="modal-body">
//                             <div class="row">
//                               <div class="col-md-4">
//                                 <img src="${movie.Poster}" alt="${movie.Title}" class="img-fluid" />
//                               </div>
//                               <div class="col-md">
//                                 <ul class="list-group">
//                                   <li class="list-group-item"><strong>Released : </strong>${movie.Released}</li>
//                                   <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
//                                   <li class="list-group-item"><strong>Awards : </strong>${movie.Awards}</li>
//                                   <li class="list-group-item"><strong>Directors : </strong>${movie.Director}</li>
//                                   <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
//                                   <li class="list-group-item"><strong>Writers : </strong>${movie.Writer}</li>
//                                   <li class="list-group-item"><strong>Sinopsis </strong><br>${movie.Plot}</li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </div>`;
//             $(".detail-movie").html(detail);
//           },
//           error: () => {},
//         });
//       });
//     },
//     error: () => {},
//   });
// });

// fetch
const btnSearch = document.querySelector(".btn-search");

btnSearch.addEventListener("click", function () {
  const valSearch = document.querySelector(".search-movie");
  fetch(`http://www.omdbapi.com/?apikey=4ccc10a2&s=${valSearch.value}`)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let data = "";

      movies.forEach((movie) => {
        data += `<div class="col-md-4 my-2">
        <div class="card">
          <img src="${movie.Poster}" class="card-img-top img-fluid" alt="${movie.Title}" style="max-height: 60vh;"/>
          <div class="card-body">
            <h6 class="card-title">${movie.Title}</h6>
            <p class="card-text">
              ${movie.Year}
            </p>
            <button class="btn btn-sm btn-primary btn-movie-detail" data-bs-toggle="modal"
            data-bs-target="#detailMovie" data-movieid="${movie.imdbID}">See detail..</button>
          </div>
        </div>
      </div>`;
      });

      // Passing ke DOM
      document.querySelector(".movies").innerHTML = data;

      // ketika see detail di klik
      const btnDetail = Array.from(
        document.querySelectorAll(".btn-movie-detail")
      );
      btnDetail.forEach((detail) => {
        detail.addEventListener("click", async function () {
          await getDetailMovie(detail);
        });
      });
    });
});

// fetching function
function getDetailMovie(detail) {
  fetch(
    `http://www.omdbapi.com/?apikey=4ccc10a2&i=${detail.dataset.movieid}&plot=full`
  )
    .then((response) => response.json())
    .then((movie) => {
      let data = `
        <div class="modal-header">
          <h5 class="modal-title">${movie.Title}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" alt="${movie.Title}" class="img-fluid" />
            </div>
            <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item"><strong>Released : </strong>${movie.Released}</li>
                <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
                <li class="list-group-item"><strong>Awards : </strong>${movie.Awards}</li>
                <li class="list-group-item"><strong>Directors : </strong>${movie.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                <li class="list-group-item"><strong>Writers : </strong>${movie.Writer}</li>
                <li class="list-group-item"><strong>Sinopsis </strong><br>${movie.Plot}</li>
              </ul>
            </div>
          </div>
        </div>`;
      document.querySelector(".detail-movie").innerHTML = data;
    });
}
