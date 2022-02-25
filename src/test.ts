import { article, mediaOutlet } from "../@types/media";


async function getArticles(outlet:mediaOutlet): Promise<article[]> {
    console.log(outlet);
    var articleList: article[] = [];
    return articleList
}

(async ()=>{
    var articleList = getArticles({name: "test", rssLink: "test", articleList: []});
})();