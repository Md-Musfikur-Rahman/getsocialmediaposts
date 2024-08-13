import puppeteer from "puppeteer";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const platform = searchParams.get("platform");

  if (!keyword || !platform) {
    return new Response(
      JSON.stringify({ error: "Keyword and platform are required" }),
      { status: 400 }
    );
  }

  try {
    const browser = await puppeteer.launch({
      headless: true, // Open a visible browser window
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    const searchQuery = `site:${platform}.com ${keyword}`;
    await page.goto(
      `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
    );

    // Wait for search results to load
    await page.waitForSelector("h3");

    // Extract search result titles, links, and full text from the specified div
    const results = await page.evaluate(() => {
      const links = [];
      const items = document.querySelectorAll("div.g"); // Select the whole search result block

      items.forEach((item) => {
        const titleElement = item.querySelector("h3");
        const anchor = titleElement.closest("a");
        const descriptionElement = item.querySelector(
          "div.VwiC3b.yXK7lf.lVm3ye.r025kc.hJNv6b.Hdw6tb"
        );

        const descriptionText = descriptionElement
          ? descriptionElement.innerText
          : ""; // Get full text from the div

        if (titleElement && anchor) {
          links.push({
            title: titleElement.innerText,
            link: anchor.href,
            description: descriptionText,
          });
        }
      });
      return links;
    });

    await browser.close();

    // Return the results
    return new Response(JSON.stringify({ results }), { status: 200 });
  } catch (error) {
    console.error("Error running Puppeteer:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
