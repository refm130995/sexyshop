export interface WpCategory {
    acf: {imagen: string};
    count: number;
    description: string;
    id: number;
    link: string;
    meta: string[];
    name: string;
    parent: number;
    slug: string;
    taxonomy: string;
    _links: WpCategoryLinks;
  };
  
  export interface WpCategoryLinks {
    about: WpHref[];
    collection: WpHref[];
    curies: WpCuries[];
    self: WpHref[];
    up: WpEmbeddable[];
    'wp:post_type': WpHref[];
  }
  
  export interface WpHref {
    href: string;
  }
  
  export interface WpEmbeddable extends WpHref {
    embeddable: boolean;
  }
  
  export interface WpCuries extends WpHref {
    name: String;
    templated: boolean;
  }
  

  

export interface WpData {
    acf: WpAcf;
    author: number;
    better_featured_image: any;
    categories: number[];
    comment_status: string;
    content: WpRendered;
    date: string;
    date_gmt: string;
    excerpt: WpRendered;
    featured_media: number;
    format: string;
    guid: Rendered;
    id: number;
    link: string;
    meta: any[];
    modified: string;
    modified_gmt: string;
    ping_status: string;
    slug: string;
    status: string;
    sticky: boolean;
    tags: string[];
    template: string;
    title: Rendered;
    type: string;
    _links: WpPostLinks;
  };
  
  export interface WpAcf {
    idioma: string;
    contenido_app: string;
    precio: string;
    video: String;
    videoThumb: String;
  }
  
  export interface Rendered {
    rendered: string;
  }
  
  export interface WpRendered extends Rendered {
    protected: boolean;
  }
  
  export interface WpPostLinks {
    about: WpHref[];
    author: WpEmbeddable[];
    collection: WpHref[];
    curies: WpCuries[];
    replies: WpEmbeddable[];
    self: WpHref[];
    'version-history': WpHref[];
    'wp:attachment': WpHref[];
    'wp:term': WpTaxonomy[];
  }
  
  export interface WpTaxonomy extends WpEmbeddable {
    taxonomy: string;
  }
  