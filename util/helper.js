function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const transToUIString = (target) => {
  let result = target;
  switch (target) {
    case "minimum_rating":
      result = "Minimum Rating";
      break;

    case "sort_by":
      result = "Sort";
      break;
    case "order_by":
      result = "Order";
      break;

    case "download_count":
      result = "Download Count";
      break;
    case "like_count":
      result = "Like Count";
      break;
    case "date_added":
      result = "Date Added";
      break;
    case "desc":
      result = "descending";
      break;
    case "asc":
      result = "ascending";
      break;

    default:
      break;
  }

  return capitalizeFirstLetter(result);
};

// limit		        Integer between 1 - 50 (inclusive)	20	The limit of results per page that has been set
// page	        	Integer (Unsigned)	1	Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
// quality		        String (720p, 1080p, 2160p, 3D)	All	Used to filter by a given quality
// minimum_rating		Integer between 0 - 9 (inclusive)	0	Used to filter movie by a given minimum IMDb rating
// query_term	    	String	0	Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
// genre		        String	All	Used to filter by a given genre (See http://www.imdb.com/genre/ for full list)
// sort_by		        String (title, year, rating, peers, seeds, download_count, like_count, date_added)	date_added	Sorts the results by choosen value
// order_by	    	String (desc, asc)	desc	Orders the results by either Ascending or Descending order
// with_rt_ratings		Boolean	false	Returns the list with the Rotten Tomatoes rating included

// "title",
//     "year",
//     "rating",
//     "peers",
//     "seeds",
//     "download_count",
//     "like_count",
//     "date_added",
