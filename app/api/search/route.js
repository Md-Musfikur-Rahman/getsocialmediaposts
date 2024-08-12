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
      headless: true, // This will open the browser window
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    const searchQuery = `site:${platform}.com ${keyword}`;
    await page.goto(
      `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
    );

    // Wait for search results to load
    await page.waitForSelector("h3");

    // Extract search result titles and links
    const results = await page.evaluate(() => {
      const links = [];
      const items = document.querySelectorAll("h3");
      items.forEach((item) => {
        const anchor = item.closest("a");
        if (anchor) {
          links.push({
            title: item.innerText,
            link: anchor.href,
          });
        }
      });
      return links;
    });

    await browser.close();

    return new Response(JSON.stringify({ results }), { status: 200 });
  } catch (error) {
    console.error("Error running Puppeteer:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
