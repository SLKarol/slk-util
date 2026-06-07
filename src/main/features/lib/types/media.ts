export interface RedGifsJson {
  video: {
    /**
     * URL видео
     */
    contentUrl: string;
    height: number;
    width: number;
    name: string;
    /**
     * Постер
     */
    thumbnailUrl: string;
  };
}

export interface GfycatResponse {
  gfyItem: {
    gfyId: string;
    title: string;
    nsfw: boolean;
    createDate: number;
    author: string;
    width: number;
    height: number;
    gifUrl?: string;
    mp4Url?: string;
    hasAudio: boolean;
    url?: string;
    posterUrl: string;
  };
}
