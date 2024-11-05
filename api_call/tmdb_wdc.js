(function() {
   var myConnector = tableau.makeConnector();

   myConnector.getSchema = function(schemaCallback) {
      // Define the schema (structure) of the data
      var cols = [
         { id: "title", dataType: tableau.dataTypeEnum.string },
         { id: "genre_ids", dataType: tableau.dataTypeEnum.string },
         { id: "vote_average", dataType: tableau.dataTypeEnum.float },
         { id: "release_date", dataType: tableau.dataTypeEnum.date }
      ];

      var tableSchema = {
         id: "tmdbMovieData",
         alias: "Popular Movies from TMDb",
         columns: cols,
      };

      schemaCallback([tableSchema]);
   };

   myConnector.getData = function(table, doneCallback) {
      // Define the TMDb API endpoint
      var apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=0ceda3df59bfbe633e321cef09a71e8d";

      // Make the API request
      $.getJSON(apiUrl, function(resp) {
         var tableData = [];

         // Loop through each movie in the response
         resp.results.forEach(function(movie) {
            tableData.push({
               "title": movie.title,
               "genre_ids": movie.genre_ids.join(", "),  // Joins genre IDs as a string
               "vote_average": movie.vote_average,
               "release_date": movie.release_date
            });
         });

         table.appendRows(tableData);
         doneCallback();
      });
   };

   tableau.registerConnector(myConnector);
})();
