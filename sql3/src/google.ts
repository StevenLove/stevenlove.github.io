import { memoize } from "./lib";

export const load = memoize(async function load() {
  console.log("gapi", gapi);
  console.log("gapi2", gapi);
  return new Promise((res, rej) => {
    gapi.load("client", () => {
      gapi.client.setApiKey("YOUR_API_KEY");
      gapi.client
        .load(
          "https://kgsearch.googleapis.com/$discovery/rest?version=v1",
          "v1"
        )
        .then(
          function () {
            console.log("GAPI client loaded for API");
            res(true);
          },
          function (err) {
            console.error("Error loading GAPI client for API", err);
            rej(err);
          }
        );
    });
  });
});

interface GResult {
  result: {
    itemListElement: [
      {
        result: {
          "@id": string;
          "@type": string[];
          name: string;
          detailedDescription: {
            articleBody: string;
          };
          resultScore: number;
        };
      }
    ];
  };
}

export async function rawQuery(term: string): Promise<GResult> {
  await load();
  return gapi.client.kgsearch.entities
    .search({
      query: term,
    })
    .then(
      function (response: GResult) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        return response;
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

function parseQuery(query: GResult): string {
  return;
}

export const query = memoize(function (term: string): Promise<string> {
  return rawQuery(term).then((gResult) => {
    return (
      `${term}: ${
        gResult?.result?.itemListElement?.shift()?.result?.detailedDescription
          ?.articleBody
      }` || `No definition found for ${term}.`
    );
  });
});
