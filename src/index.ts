import { JSDOM } from 'jsdom';

export interface litlink_data {
  props: Props;
  page: string;
  query: Query;
  buildId: string;
  isFallback: boolean;
  isExperimentalCompile: boolean;
  gssp: boolean;
  locale: string;
  locales?: string[] | null;
  defaultLocale: string;
  scriptLoader?: null[] | null;
}
export interface Props {
  pageProps: PageProps;
  __N_SSP: boolean;
}
export interface PageProps {
  profile: Profile;
  ogpImageUrl: string;
  errorCode: string;
  metadata: Metadata;
}
export interface Profile {
  uid: string;
  userId: string;
  creatorId: string;
  name: string;
  catchphrase: string;
  sex: string;
  birthday: string;
  profileText: string;
  urlPath: string;
  pictureUrl: string;
  pictureType: string;
  snsIconLinks?: SnsIconLink[] | null;
  profileLinks?: ProfileLinksEntity[] | null;
  creatorDetailLayout: CreatorDetailLayout;
  creatorSnsActivityCategories?: CreatorSnsActivityCategoriesEntity[] | null;
}
export interface SnsIconLink {
    id: string;
    type: string;
    url: string;
    userId: string;
    creatorId: string;
}
export interface ProfileLinksEntity {
  id: string;
  userId: string;
  creatorId: string;
  publicationStartAt?: null;
  publicationEndAt?: null;
  profileLinkType: string;
  buttonLink?: ButtonLink | null;
  textLink?: TextLink | null;
  imageLink?: ImageLink | null;
  movieLink?: MovieLink | null;
  musicLink?: null;
  shopLink?: null;
  marginBlock?: null;
}
export interface ButtonLink {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
  url: string;
  email?: string | null;
  tel?: null;
  urlType: string;
  publicationStartAt?: null;
  publicationEndAt?: null;
  userId: string;
  creatorId: string;
}
export interface TextLink {
  id: string;
  title?: string | null;
  description: string;
  publicationStartAt?: null;
  publicationEndAt?: null;
  userId: string;
  creatorId: string;
}
export interface ImageLink {
  id: string;
  type: string;
  profileImages?: ProfileImagesEntity[] | null;
  publicationStartAt?: null;
  publicationEndAt?: null;
  userId: string;
  creatorId: string;
}
export interface ProfileImagesEntity {
  id: string;
  iconUrl?: string | null;
  imageUrl: string;
  title?: string | null;
  description?: null;
  url: string;
  email?: null;
  tel?: null;
  urlType: string;
  imageLinkId: string;
}
export interface MovieLink {
  id: string;
  title?: null;
  description?: null;
  url: string;
  movieType: string;
  publicationStartAt?: null;
  publicationEndAt?: null;
  userId: string;
  creatorId: string;
}
export interface CreatorDetailLayout {
  id: string;
  fontFamily: string;
  fontColor: string;
  fontSize: string;
  textAlign: string;
  backgroundImageUrl: string;
  backgroundColor: string;
  backgroundGradation: string;
  backgroundOverlayColor: string;
  linkShape: string;
  linkColor: string;
  template: string;
  userId: string;
  creatorId: string;
}
export interface CreatorSnsActivityCategoriesEntity {
  creatorSnsActivityCategory: CreatorSnsActivityCategory;
  snsActivityGenre: SnsActivityGenre;
  snsActivityCategory: SnsActivityCategory;
}
export interface CreatorSnsActivityCategory {
  id: string;
  userId: string;
  creatorId: string;
  snsActivityCategoryId: string;
}
export interface SnsActivityGenre {
  id: string;
  name: string;
  sortIndex: number;
}
export interface SnsActivityCategory {
  id: string;
  name: string;
  snsActivityGenreId: string;
}
export interface Metadata {
  title: string;
  description: string;
  openGraph: OpenGraph;
  twitter: Twitter;
}
export interface OpenGraph {
  title: string;
  description: string;
  siteName: string;
  type: string;
  url: string;
  images?: string[] | null;
}
export interface Twitter {
  site: string;
  cardType: string;
}
export interface Query {
  creatorUrl: string;
}

type user_link = {
    service_name: string,
    service_url: string,
};

type user_row_data = {
    title: string,
    message: string,
    url: string,
    img_url: string,
    type: string,
};

type LitlinkData = {
    user_profile_image_url: string,
    user_name: string,
    user_discription: string,
    user_field: string,
    background_image_url: string,
    user_links: user_link[],
    user_row_datas: user_row_data[],
}

export interface litlink_data_options {
    include_margin_block: boolean,
    concat_sns_links: boolean,
    delete_html_tags: boolean,
}

export class litlink {
    litlink_id: string;
    //litlink_html_main: HTMLElement | null;
    //litlink_html: Document | null;
    litlink_json_data: litlink_data;
    litlink_data_loaded: boolean = false;
    litlink_data: LitlinkData;
    litlink_data_options: litlink_data_options;
    /**
     * 
     * @param {string} litlink_url lit.link url or user id EX): https://lit.link/4kiiru or 4kiiru
     */
    constructor(litlink_url: string, options?: litlink_data_options) {
        if (options === undefined) {
            this.litlink_data_options = { include_margin_block: false, concat_sns_links: false , delete_html_tags: true};
        }
        else {
            this.litlink_data_options = options;
        }
        this.litlink_id = "";
        //this.litlink_html_main = null;
        //this.litlink_html = null;
        this.litlink_json_data = {} as litlink_data;
        this.litlink_data = {
            user_profile_image_url: "",
            user_name: "",
            user_discription: "",
            user_field: "",
            background_image_url: "",
            user_links: [],
            user_row_datas: []
        };
        if (/https?:\/\/lit\.link/.test(litlink_url)) {
            this.litlink_id = litlink_url.split('/').pop()!;
        }
        else {
            this.litlink_id = litlink_url;
        }
    }

    private async getLitlinkHtml() {
        if (this.litlink_data_loaded) {
            return;
        }
        if (this.litlink_id === "") {
            throw new Error("No Litlink ID provided");
        }
        const response = await fetch("https://lit.link/" + this.litlink_id);
        if (response.status !== 200) {
            throw new Error("Litlink data not found(can't access)");
        }
        const res = await response.text();
        const dom = new JSDOM(res);
        this.litlink_json_data = JSON.parse(dom.window.document.getElementById("__NEXT_DATA__")?.innerHTML!);
        if(this.litlink_json_data.props.pageProps.profile===null){
            throw new Error("Litlink data not found");
        }
        this.litlink_data_loaded = true;
        return;
    }

    private unescapeUnicode(string:string) {//http://perutago.seesaa.net/article/202801583.html
        return string.replace(/\\u([a-fA-F0-9]{4})/g, function(matchedString, group1) {
            return String.fromCharCode(parseInt(group1, 16));
        });
    }

    async get_full_data() {
        await this.getLitlinkHtml();
        this.litlink_data.background_image_url = this.litlink_json_data.props.pageProps.profile.creatorDetailLayout.backgroundImageUrl;
        this.litlink_data.user_profile_image_url = this.litlink_json_data.props.pageProps.profile.pictureUrl;
        this.litlink_data.user_name = this.litlink_json_data.props.pageProps.profile.name;
        this.litlink_data.user_discription = this.litlink_json_data.props.pageProps.profile.profileText;
        this.litlink_data.user_field = this.litlink_json_data.props.pageProps.profile.catchphrase;
        this.litlink_json_data.props.pageProps.profile.snsIconLinks?.forEach((snsIconLink) => {//sns name unified by litlink
            this.litlink_data.user_links.push({service_name: snsIconLink.type, service_url: snsIconLink.url});
        });
        for(let i=0;i<this.litlink_json_data.props.pageProps.profile.profileLinks?.length!;i++){
            const profileLink = this.litlink_json_data.props.pageProps.profile.profileLinks![i];
            switch(profileLink.profileLinkType){
                case "image":
                    if(Array.isArray(profileLink.imageLink?.profileImages)&&profileLink.imageLink.profileImages.length>0){
                        if(profileLink.imageLink.profileImages[0].imageUrl === ""){//not normal image Maybe SNS link
                            profileLink.imageLink.profileImages.forEach((profileImage) => {
                                if(profileImage.urlType!=="others"){//sns name unified by litlink
                                    this.litlink_data.user_links.push({service_name: profileImage.urlType, service_url: profileImage.url});
                                }
                                else{//sns name not unified
                                    if(typeof(profileImage.title)==="string"){
                                        this.litlink_data.user_links.push({service_name: profileImage.title, service_url: profileImage.url});
                                    }
                                    else{
                                        this.litlink_data.user_links.push({service_name: "others", service_url: profileImage.url});
                                    }
                                }
                            });
                        }
                        else{//normal image
                            profileLink.imageLink.profileImages.forEach((profileImage) => {
                                this.litlink_data.user_row_datas.push({title: profileImage.title!, message: profileImage.description!, url: profileImage.url, img_url: profileImage.imageUrl,type: "image"});
                            });
                        }
                    }
                    break;
                case "margin_block":
                    if(this.litlink_data_options.include_margin_block){
                        this.litlink_data.user_row_datas.push({title: "", message: "", url: "", img_url: "", type: "margin_block"});
                    }
                    break;
                case "text":
                    let description = profileLink.textLink?.description!;
                    if(typeof(description)==="string"&&description!==null){
                        description = this.unescapeUnicode(description);
                        if(this.litlink_data_options.delete_html_tags){
                            description = description.replace(/<br>/g,'\n');
                            description = description.replace(/&nbsp;/g,' ');
                            description = description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
                        }
                    }
                    this.litlink_data.user_row_datas.push({title: profileLink.textLink?.title!, message: description, url: "", img_url: "", type: "text"});
                    break;
                case "button":
                    this.litlink_data.user_row_datas.push({title: profileLink.buttonLink?.title!, message: profileLink.buttonLink?.description!, url: profileLink.buttonLink?.url!, img_url: profileLink.buttonLink?.iconUrl!, type: "button"});
                    break;
                case "movie":
                    this.litlink_data.user_row_datas.push({title: profileLink.movieLink?.title!, message: profileLink.movieLink?.description!, url: profileLink.movieLink?.url!, img_url: "", type: "movie"});
                    break;
                default:
                    console.log("Unknown profileLinkType: "+profileLink.profileLinkType);
                    break;
            }
        }
    }
}
